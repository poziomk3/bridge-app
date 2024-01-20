
export const suits =["CLUBS", "DIAMONDS" , "HEARTS", "SPADES"] as const;

type CardSuit = typeof suits[number];
export default CardSuit;
