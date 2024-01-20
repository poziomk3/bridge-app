import {
  BidType,
  ContractBid,
  ExtendedSuit,
  NoContractBid,
  getLastContractBid,
  handleBid,
  isContractBid,
  isContractBidLegal,
  isNoContractBidLegal,
} from "@/bridge-game/Bidding";
import {
  createCardDeck,
  distributeCardsIntoPlayers,
  shuffleCardDeck,
} from "@/bridge-game/CardDeck";
import { Card } from "@/card-lib/Card";
import CardHand from "@/card-lib/implementation/card-hand";
import CardSuit from "@/card-lib/types/CardSuit";
import CardValue from "@/card-lib/types/CardValue";
import BiddingTable from "@/components/game/bidding-table";
import PlayerBids from "@/components/game/player-bids";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Game = () => {
  const playerCard = distributeCardsIntoPlayers(
    shuffleCardDeck(createCardDeck())
  );
  const [bidTable, setBidTable] = useState<BidType[]>([]);
  const clearBidTable = () => {
    setBidTable([]);
  };
  const addBid = (bid: BidType) => {
    setBidTable(handleBid(bid, bidTable));
  };
  const isBidLegal = (bid: BidType) =>
    isContractBid(bid)
      ? isContractBidLegal(bidTable, bid as ContractBid)
      : isNoContractBidLegal(bidTable, bid as NoContractBid);

  return (
    <div className="w-[]">
      {playerCard.map((cards) => (<CardHand cards={cards} />))}
      <Button onClick={clearBidTable}>clear</Button>
      <BiddingTable handleBid={addBid} isConBidLegal={isBidLegal} />
      <PlayerBids bidTable={bidTable} />
    </div>
  );
};

export default Game;
