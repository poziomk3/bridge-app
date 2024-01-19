import { FC } from "react";
import Suit from "../types/CardSuit";
import Value from "../types/CardValue";

interface CardProps {
  suit: Suit;
  value: Value;

}

const Card: FC<CardProps> = ({suit,value}) => {
  return <div>
      {suit}
      {value}

    
  </div>;
};

export default Card;
