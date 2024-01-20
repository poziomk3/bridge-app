import { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ExtendedSuit,
  createBidArray,
  getBidValue,
} from "@/bridge-game/Biding";
import { Button } from "../ui/button";

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
                    <div className="flex  h-full gap-2">
                      <img
                        className=""
                        src={`/src/assets/${bid.suit}.svg`}
                        alt=""
                      />
                      <div>{bid.value}</div>
                    </div>
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
