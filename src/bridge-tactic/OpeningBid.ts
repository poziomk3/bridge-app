import { BidType, NoContractBid } from "@/bridge-game/Bidding";
import { Player } from "@/bridge-game/Players";
import CardSuit, { suits } from "@/card-lib/types/CardSuit";
import { isSuitStrong } from "./AuxCounters";
import { CardType } from "@/bridge-game/CardDeck";


export function findUniqueMaxSuit(
  handDistribution: number[]
): [CardSuit[], number] {
  const max = Math.max(...handDistribution);
  const occurrences = handDistribution
    .map((value, index) => (value === max ? index : -1))
    .filter((value) => value !== -1);
  return [occurrences.map((index) => suits[index]), max];
}


export function getOpeningBid(player: Player): BidType {
  return (
    getEvenDistributedOpening(player.hcp, player.dp) ||
    getPreemptiveOpening(player.hcp, player.handDistribution, player.hand) ||
    getCasualOpening(player.tp, player.handDistribution) ||
    getConvetionalClubOpening(player.tp) ||
    NoContractBid.PASS
  );
}

export function getEvenDistributedOpening(
  hcp: number,
  dp: number
): BidType | null {
  if (dp > 1) return null;
  if (hcp >= 15 && hcp <= 17) return { value: 1, suit: "NOTRUMP" };
  else if (hcp >= 20 && hcp <= 21) return { value: 2, suit: "NOTRUMP" };
  else if (hcp >= 25 && hcp <= 27) return { value: 3, suit: "NOTRUMP" };
  return null;
}

export function getPreemptiveOpening(
  hcp: number,
  handDistribution: number[],
  hand: CardType[]
): BidType | null {
  if (hcp < 6 && hcp > 11) return null;
  for (const suit of suits)
    if (handDistribution[suits.indexOf(suit)] >= 6 && isSuitStrong(hand, suit))
      return { value: 2, suit: suit };

  return null;
}
export function getCasualOpening(
  tp: number,
  handDistribution: number[],
): BidType | null {
  if (tp >= 13 && tp <= 21) {
    const [workingSuits, max] = findUniqueMaxSuit(handDistribution);
    if (max >= 5)
      return { value: 1, suit: workingSuits[workingSuits?.length - 1] };
    else if (max === 4 && workingSuits.includes("DIAMONDS" as CardSuit))
      return { value: 1, suit: "DIAMONDS" };
    else if (handDistribution[suits.indexOf("CLUBS" as CardSuit)] >= 3)
      return { value: 1, suit: "CLUBS" };
    else return { value: 1, suit: "DIAMONDS" };
  }

  return null;
}

export function getConvetionalClubOpening(tp: number): BidType | null {
  if (tp >= 22) return { value: 2, suit: "CLUBS" };
  return null;
}

