import CardSuit from "@/card-lib/types/CardSuit";
import { suits } from "@/card-lib/types/CardSuit";
export enum NoContractBid {
  PASS = "PASS",
  DOUBLE = "DOUBLE",
  REDOUBLE = "REDOUBLE",
}
export type ExtendedSuit = CardSuit | "NOTRUMP";
export const extendedSuit = [...suits, "NOTRUMP"] as const;

export type ContractBid = { value: number; suit: ExtendedSuit };
export type BidType = ContractBid | NoContractBid;
export type BidTable = Array<BidType>;

export function getBidValue(bid: ContractBid): number {
  return (bid.value - 1) * 5 + extendedSuit.indexOf(bid.suit);
}
export function createBidArray(): Array<ContractBid> {
  const bidDeck: Array<ContractBid> = [];
  for (let value = 1; value <= 7; value++) {
    for (const suit of extendedSuit) {
      bidDeck.push({
        value: value,
        suit: suit as ExtendedSuit,
      });
    }
  }
  console.log(bidDeck.map((bid) => getBidValue(bid)));
  return bidDeck;
}
export function isContractBidLegal(
  bidTable: BidType[],
  next: ContractBid
): boolean {
  const previous = getLastContractBid(bidTable);
  return previous === null || getBidValue(previous) < getBidValue(next);
}

export function areBidsFromSameTeam(
  bidIndex1: number,
  bidIndex1Index2: number
) {
  return bidIndex1 % 2 === bidIndex1Index2 % 2;
}

export function isNoContractBidLegal(bidTable: BidType[], next: NoContractBid) {
  const lastContractBid = getLastContractBid(bidTable);

  if (lastContractBid === null) {
    return next === NoContractBid.PASS;
  }

  const bidsAfterLastContract = bidTable.slice(
    bidTable.indexOf(lastContractBid)
  );

  if (next === NoContractBid.DOUBLE) {
    return !(
      bidsAfterLastContract.includes(NoContractBid.DOUBLE) ||
      areBidsFromSameTeam(bidTable.indexOf(lastContractBid), bidTable.length)
    );
  }

  if (next === NoContractBid.REDOUBLE) {
    return !(
      bidsAfterLastContract.includes(NoContractBid.REDOUBLE) ||
      !bidsAfterLastContract.includes(NoContractBid.DOUBLE) ||
      !areBidsFromSameTeam(bidTable.indexOf(lastContractBid), bidTable.length)
    );
  }

  return true;
}

export function isContractBid(bid: BidType): boolean {
  if (
    typeof bid === "object" &&
    Object.prototype.hasOwnProperty.call(bid, "value")
  )
    return true;

  return false;
}
export function getContractBid(bid: BidType): ContractBid | null {
  if (isContractBid(bid)) return bid as ContractBid;
  return null;
}
export function getNoContractBid(bid: BidType): NoContractBid | null {
  if (isContractBid(bid)) return null;
  return bid as NoContractBid;
}

export function getLastContractBid(bidTable: BidTable): ContractBid | null {
  for (let i = bidTable.length - 1; i >= 0; i--)
    if (isContractBid(bidTable[i])) return bidTable[i] as ContractBid;

  return null;
}

export function isBiddingComplete(bidTable: BidTable): boolean {
  if (bidTable.length < 4) return false;
  if (bidTable.length === 4 && bidTable[0] === NoContractBid.PASS) {
    for (const bid of bidTable) if (bid != NoContractBid.PASS) return false;
    return true;
  }
  for (let i = 1; i < 4; i++) {
    if (bidTable[bidTable.length - i] != NoContractBid.PASS) return false;
  }
  return true;
}

export function handleBid(bid: BidType, allBids: BidTable): BidTable {
  if (isBiddingComplete(allBids)) return allBids;
  if (
    !isContractBid(bid) &&
    isNoContractBidLegal(allBids, bid as NoContractBid)
  )
    return [...allBids, bid];
  if (isContractBidLegal(allBids, bid as ContractBid)) {
    return [...allBids, bid];
  }
  return [...allBids];
}
