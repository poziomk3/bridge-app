import {  BidType } from "@/bridge-game/Biding";
import { Player } from "@/bridge-game/Players";
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

interface PlayerBidsProps {
  bidTable: BidType[];
}
const chunkedArrays = (originalArray: BidType[]) => {
    console.log(originalArray)
  const chunkedArrays: BidType[][] = [];
  for (let i = 0; i < originalArray.length; i += 4) {
    chunkedArrays.push(originalArray.slice(i, i + 4));
  }
  return chunkedArrays;
};
const PlayerBids: FC<PlayerBidsProps> = ({ bidTable }) => {
  const bids = chunkedArrays(bidTable);
  const players = Object.values(Player);
  return (
    <Table className="text-center ">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          {players.map((player) => (
            <TableHead>{player}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bids.map((bidRow) => (
          <TableRow>
            {bidRow.map((bid) =>
                <TableCell>
                    <Bid bid={bid} />
                </TableCell>
              
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayerBids;
