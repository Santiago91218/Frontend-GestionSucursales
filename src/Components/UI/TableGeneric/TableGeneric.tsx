import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../Hooks/redux";
import { ButtonsTable } from "../ButtonsTable/ButtonsTable";

interface ITableColumn<T> {
  label: string;
  key: string;
  render?: (item: T) => React.ReactNode;
}

export interface ITableProps<T> {
  columns: ITableColumn<T>[];
  handleDelete: (id: number) => void;
  setOpenModal: (state: boolean) => void;
}

export const TableGeneric = <T extends { id: any }>({
  columns,
  handleDelete,
  setOpenModal,
}: ITableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [rows, setRows] = useState<any[]>([]);

  const dataTable = useAppSelector(
    (state: any) => state.tablaReducer.dataTable
  );

  useEffect(() => {
    setRows(dataTable);
  }, [dataTable]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "90%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "80vh", overflow: "auto" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, i: number) => (
                  <TableCell key={i} align={"center"}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column, i: number) => {
                        return (
                          <TableCell key={i} align={"center"}>
                            {column.render ? (
                              column.render(row)
                            ) : column.label === "Acciones" ? (
                              <ButtonsTable
                                el={row}
                                handleDelete={handleDelete}
                                setOpenModal={setOpenModal}
                              />
                            ) : (
                              row[column.key]
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
