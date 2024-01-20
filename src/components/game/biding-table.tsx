import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ExtendedSuit, createBidArray } from "@/bridge-game/Biding";
import { Button } from "../ui/button";
import Bid from "./bid";

interface BidingTableProps {}

const BidingTable: FC<BidingTableProps> = () => {
  const bids = createBidArray();
  const suits = Object.values(ExtendedSuit);
  const numbersArray: number[] = Array.from(
    { length: 7 },
    (_, index) => index + 1
  );
  return (
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
                  <Button variant={"ghost"}>
                    <Bid bid={bid} />
                  </Button>
                </TableCell>
              ) : null
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BidingTable;
