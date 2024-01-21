import { CardType } from "@/bridge-game/CardDeck";
import { FC } from "react";
import Card from "./card";

interface CardHandProps {
  cards: CardType[];
}

const CardHand: FC<CardHandProps> = ({ cards }) => {
  return (
    <div className="flex gap-2 justify-center w-full">
      {cards.map((card, index) => (
        <Card card={card} key={index} />
      ))}
    </div>
  );
};

export default CardHand;
