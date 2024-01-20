import {
  BidType,
  getContractBid,
  getNoContractBid,
  isContractBid,
} from "@/bridge-game/Bidding";
import { FC } from "react";

interface BidProps {
  bid: BidType;
}

const Biding: FC<BidProps> = ({ bid }) => {
  return (
    <div className="flex h-5 gap-2 justify-center">
      {isContractBid(bid) ? (
        <>
          <img
            className=""
            src={`/src/assets/${getContractBid(bid)!.suit}.svg`}
            alt=""
          />
          <div>{getContractBid(bid)!.value}</div>
        </>
      ) : (
        <div>{getNoContractBid(bid)}</div>
      )}
    </div>
  );
};

export default Biding;
