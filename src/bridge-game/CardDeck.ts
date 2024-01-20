import CardSuit, { suits } from "../card-lib/types/CardSuit";
import CardValue from "../card-lib/types/CardValue";

export type CardType = { value: CardValue; suit: CardSuit };

export function getCardValue(card: CardType): number {
  return (
    suits.indexOf(card.suit) * 13 +
    Object.values(CardValue).indexOf(card.value)
  );
}

export function createCardDeck(): Array<CardType> {
  const cardDeck: Array<CardType> = [];
  for (const suit of suits) {
    for (const value in CardValue) {
      cardDeck.push({
        value: CardValue[value as keyof typeof CardValue],
        suit: suit as CardSuit,
      });
    }
  }
  return cardDeck;
}

export function shuffleCardDeck(cards: Array<CardType>): Array<CardType> {
  const shuffledCards = [...cards];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  return shuffledCards;
}

export function distributeCardsIntoPlayers(
  cards: Array<CardType>
): Array<Array<CardType>> {
  const playersCards = [];
  for (let i = 0; i < cards.length; i += 13) {
    const part = cards.slice(i, i + 13);
    playersCards.push(orderCards(part));
  }
  return playersCards;
}

export function orderCards(cards: Array<CardType>): Array<CardType> {
  return cards.sort((a, b) => {
    return getCardValue(a) - getCardValue(b);
  });
}
