import { BidType } from "@/bridge-game/Bidding";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Bid from "./bid";
import { players } from "@/bridge-game/Players";

interface PlayerBidsProps {
  bidTable: BidType[];
}
const chunkedArrays = (originalArray: BidType[]) => {
  console.log(originalArray);
  const chunkedArrays: BidType[][] = [];
  for (let i = 0; i < originalArray.length; i += 4) {
    chunkedArrays.push(originalArray.slice(i, i + 4));
  }
  return chunkedArrays;
};
const PlayerBids: FC<PlayerBidsProps> = ({ bidTable }) => {
  const bids = chunkedArrays(bidTable);
  return (
    <Table className="text-center ">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          {players.map((player) => (
            <TableHead key={player}>{player}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bids.map((bidRow,index1) => (
          <TableRow key={index1}>
            {bidRow.map((bid,index2) => (
              <TableCell key={index2}>
                <Bid bid={bid} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayerBids;
