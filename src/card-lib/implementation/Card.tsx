import { FC } from "react";
import { CardType } from "@/bridge-game/CardDeck";

interface CardProps {
  card: CardType;
}

const Card: FC<CardProps> = ({ card }) => {
  return (
    <div
      className={`flex flex-col text-[2rem] items-center ${card.suit === "HEARTS"  || card.suit === "DIAMONDS" ? "text-red-600" : ""}`}
    >
      <div className="font-extrabold">{card.value}</div>

      <img className=" w-[2rem] fill-red-200     "   src={`/src/assets/${card.suit}.svg`} alt="" />
    </div>
  );
};

export default Card;
