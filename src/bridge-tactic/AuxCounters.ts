import { CardType } from "@/bridge-game/CardDeck";
import CardSuit from "@/card-lib/types/CardSuit";
import CardValue from "@/card-lib/types/CardValue";

export function countHCP(hand: CardType[]): number {
  return hand.reduce((acc, card) => {
    switch (card.value) {
      case CardValue.ACE:
        return acc + 4;
      case CardValue.KING:
        return acc + 3;
      case CardValue.QUEEN:
        return acc + 2;
      case CardValue.JACK:
        return acc + 1;
      default:
        return acc;
    }
  }, 0);
}

export function countDP(hand: CardType[]): number {
  let count = 0;
  for (const suit in CardSuit) {
    if (countSuitLength(hand, suit as CardSuit) === 2) count += 1;
    if (countSuitLength(hand, suit as CardSuit) === 1) count += 2;
    if (countSuitLength(hand, suit as CardSuit) === 0) count += 3;
  }
  return count;
}

export function getHandDistribution(hand: CardType[]): number[] {
  return [
    countSuitLength(hand, CardSuit.CLUBS),
    countSuitLength(hand, CardSuit.DIAMONDS),
    countSuitLength(hand, CardSuit.HEARTS),
    countSuitLength(hand, CardSuit.SPADES),
  ];
}

export function countSuitLength(hand: CardType[], suit: CardSuit): number {
  return hand.filter((card) => card.suit === suit).length;
}

export function countTP(hand: CardType[]): number {
  return countDP(hand) + countHCP(hand);
}

export function isEvenDistributed(hand: CardType[]): boolean {
  return countDP(hand) <= 2;
}
