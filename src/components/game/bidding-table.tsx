import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  BidType,
  ExtendedSuit,
  NoContractBid,
  createBidArray,
} from "@/bridge-game/Bidding";
import { Button } from "../ui/button";
import Bid from "./bid";

interface BidingTableProps {
  handleBid: (bid: BidType) => void;
  isConBidLegal(bid: BidType): boolean;
}

const BiddingTable: FC<BidingTableProps> = ({
  handleBid,
  isConBidLegal: isBidLegal,
}) => {
  const bids = createBidArray();
  const suits = Object.values(ExtendedSuit);
  const noContractBids = Object.values(NoContractBid);
  const numbersArray: number[] = Array.from(
    { length: 7 },
    (_, index) => index + 1
  );
  return (
    <>
      {" "}
      <Table className="text-center ">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {suits.map((suit) => (
              <TableHead>
                <img
                  className="h-full mx-auto p-2 text-4"
                  src={`/src/assets/${suit}.svg`}
                  alt=""
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {numbersArray.map((number) => (
            <TableRow>
              {bids.map((bid) =>
                bid.value == number ? (
                  <TableCell>
                    <Button
                      variant={"ghost"}
                      onClick={() => handleBid(bid)}
                      disabled={!isBidLegal(bid)}
                    >
                      <Bid bid={bid} />
                    </Button>
                  </TableCell>
                ) : null
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mx-auto flex w-full justify-around">
        {noContractBids.map((bid) => (
          <Button
            variant={"outline"}
            onClick={() => handleBid(bid)}
            disabled={!isBidLegal(bid)}
          >
            <Bid bid={bid} />
          </Button>
        ))}
      </div>
    </>
  );
};

export default BiddingTable;
