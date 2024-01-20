import { ExtendedSuit, NoContractBid } from "@/bridge-game/Biding";
import BidingTable from "@/components/game/biding-table";
import PlayerBids from "@/components/game/player-bids";

const Game = () => {
  return (
    <div className="w-[800px]">
      essa
      <BidingTable />
      <PlayerBids
        bidTable={[
            NoContractBid.PASS,
          { value: 1, suit: ExtendedSuit.DIAMONDS },
          { value: 1, suit: ExtendedSuit.CLUBS },
          { value: 1, suit: ExtendedSuit.CLUBS },
          NoContractBid.PASS,
          { value: 1, suit: ExtendedSuit.DIAMONDS },
          { value: 1, suit: ExtendedSuit.CLUBS },
          NoContractBid.PASS,
          { value: 1, suit: ExtendedSuit.DIAMONDS },
          { value: 1, suit: ExtendedSuit.CLUBS },
          NoContractBid.PASS,
          { value: 1, suit: ExtendedSuit.DIAMONDS },
          { value: 1, suit: ExtendedSuit.CLUBS },
          NoContractBid.PASS,
          { value: 1, suit: ExtendedSuit.DIAMONDS },
          { value: 1, suit: ExtendedSuit.CLUBS },       
        ]}
      />
    </div>
  );
};

export default Game;
