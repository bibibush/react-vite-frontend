import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function CustomDataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Trends</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody></TableBody>
    </Table>
  );
}

export default CustomDataTable;
