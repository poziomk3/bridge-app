import { CardType } from "@/bridge-game/CardDeck";
import CardSuit, { suits } from "@/card-lib/types/CardSuit";
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
export function isSuitStrong(hand: CardType[], suit: CardSuit): boolean {
  const points = hand.reduce((acc, card) => {
    switch (card.suit) {
      case suit:
        switch (card.value) {
          case CardValue.ACE:
            return acc + 4;
          case CardValue.KING:
            return acc + 3;
          case CardValue.QUEEN:
            return acc + 2;
          default:
            return acc;
        }
      default:
        return acc;
    }
  }, 0);
  return points >= 5;
}

export function countDP(hand: CardType[]): number {
  let count = 0;
  for (const suit in suits) {
    if (countSuitLength(hand, suit as CardSuit) === 2) count += 1;
    if (countSuitLength(hand, suit as CardSuit) === 1) count += 2;
    if (countSuitLength(hand, suit as CardSuit) === 0) count += 3;
  }
  return count;
}

export function getHandDistribution(hand: CardType[]): number[] {
  return [
    countSuitLength(hand, "CLUBS" as CardSuit),
    countSuitLength(hand, "DIAMONDS" as CardSuit),
    countSuitLength(hand, "HEARTS" as CardSuit),
    countSuitLength(hand, "SPADES" as CardSuit),
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
