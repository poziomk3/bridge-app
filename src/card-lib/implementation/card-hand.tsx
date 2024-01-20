import { CardType } from "@/bridge-game/CardDeck";
import { FC } from "react";
import Card from "./card";

interface CardHandProps {
  cards: CardType[];
}

const CardHand: FC<CardHandProps> = ({ cards }) => {
  return (
    <div className="flex gap-2 justify-center w-full">
      {cards.map((card) => (
        <Card card={card} />
      ))}
    </div>
  );
};

export default CardHand;
