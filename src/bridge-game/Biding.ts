export enum NoContractBid {
  PASS = "PASS",
  DOUBLE = "DOUBLE",
  REDOUBLE = "REDOUBLE",
}
export enum ExtendedSuit {
  CLUBS = "CLUBS",
  DIAMONDS = "DIAMONDS",
  HEARTS = "HEARTS",
  SPADES = "SPADES",
  NOTRUMP = "NOTRUMP",
}

export type ContractBid = { value: number; suit: ExtendedSuit };
export type BidType = ContractBid | NoContractBid;
export type BidTable = Array<BidType>;

export function getBidValue(bid: ContractBid): number {
  return Object.values(ExtendedSuit).indexOf(bid.suit) + (bid.value - 1) * 5;
}
export function createBidArray(): Array<ContractBid> {
  const bidDeck: Array<ContractBid> = [];
  for (let value = 1; value <= 7; value++) {
    for (const suit in ExtendedSuit) {
      bidDeck.push({ value: value, suit: suit as ExtendedSuit });
    }
  }
  return bidDeck;
}
export function isContractBidLegal(
  previous: ContractBid | null,
  next: ContractBid
): boolean {
  return previous === null || getBidValue(previous) < getBidValue(next);
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
  if (!isContractBid(bid)) return [...allBids, bid];
  if (isContractBidLegal(getLastContractBid(allBids), bid as ContractBid)) {
    return [...allBids, bid];
  }
  return [...allBids];
}
