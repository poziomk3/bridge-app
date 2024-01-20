import {
  countDP,
  countHCP,
  getHandDistribution,
} from "@/bridge-tactic/AuxCounters";
import { CardType } from "./CardDeck";

export enum PlayerEnum {
  North = "North",
  East = "East",
  South = "South",
  West = "West",
}

export class Player {
  name: PlayerEnum;
  hand: CardType[];
  handDistribution: number[];
  hcp: number;
  dp: number;
  tp: number;
  constructor(hand: CardType[], name: PlayerEnum) {
    this.hand = hand;
    this.name = name;
    this.hcp = countHCP(hand);
    this.dp = countDP(hand);
    this.tp = this.hcp + this.dp;
    this.handDistribution = getHandDistribution(hand);
  }
}
