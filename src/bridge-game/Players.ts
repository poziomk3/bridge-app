import {
  countDP,
  countHCP,
  getHandDistribution,
} from "@/bridge-tactic/AuxCounters";
import { CardType } from "./CardDeck";

export const players = ["NORTH", "EAST", "SOUTH", "WEST"] as const;
export type PlayerType = (typeof players)[number];
export class Player {
  name: PlayerType;
  hand: CardType[];
  handDistribution: number[];
  hcp: number;
  dp: number;
  tp: number;
  constructor(hand: CardType[], name: PlayerType) {
    this.hand = hand;
    this.name = name;
    this.hcp = countHCP(hand);
    this.dp = countDP(hand);
    this.tp = this.hcp + this.dp;
    this.handDistribution = getHandDistribution(hand);
  }
}
