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
import { Player, players } from "@/bridge-game/Players";
import { isSuitStrong } from "@/bridge-tactic/AuxCounters";
import CardHand from "@/card-lib/implementation/card-hand";
import { suits } from "@/card-lib/types/CardSuit";
import BiddingTable from "@/components/game/bidding-table";
import PlayerBids from "@/components/game/player-bids";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Game = () => {
  const playerCard = distributeCardsIntoPlayers(
    shuffleCardDeck(createCardDeck())
  ).map((cards, index) => new Player(cards, players[index]));
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
    <div className="w-3/4 mx-auto">
      <Button onClick={clearBidTable}>clear</Button>
      <BiddingTable handleBid={addBid} isConBidLegal={isBidLegal} />
      <PlayerBids bidTable={bidTable} />
      {playerCard.map((cards) => (
        <>
          {suits.map((suit) =>
            isSuitStrong(cards.hand, suit) ? <span>{suit}</span> : null
          )}{" "}
          {cards.hcp}
          {cards.handDistribution}
          <CardHand cards={cards.hand} />{" "}
        </>
      ))}
    </div>
  );
};

export default Game;
