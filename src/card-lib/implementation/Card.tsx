import { FC } from "react";
import { CardType } from "@/bridge-game/CardDeck";
import CardSuit from "../types/CardSuit";

interface CardProps {
  card: CardType;
}

const Card: FC<CardProps> = ({ card }) => {
  return (
    <div
      className={`flex flex-col text-[2rem] items-center ${card.suit === CardSuit.HEARTS || card.suit === CardSuit.DIAMONDS ? "text-red-600" : ""}`}
    >
      <div className="font-extrabold">{card.value}</div>

      <img className=" w-[2rem] fill-red-200     "   src={`/src/assets/${card.suit}.svg`} alt="" />
    </div>
  );
};

export default Card;
