"use client";

import { useMemo } from "react";
import { useTable, usePagination } from "react-table";

import { usePaginationStore } from "@/store";
import { Loading } from "@/components";

type TableProps = {
  data: any[];
  columns: any[];
  actions?: ((row: any) => any)[];
  loading?: boolean;
};

const Table = ({ data, columns, actions, loading = false }: TableProps) => {
  const { pagination, setPagination } = usePaginationStore();
  const memoData = useMemo(() => data, [data]);
  const memoColumns = useMemo(() => columns, [columns]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: memoColumns,
        data: memoData,
        initialState: {
          pageSize: pagination.pageSize,
          pageIndex: pagination.page - 1,
        },
        manualPagination: true,
      },
      usePagination
    );

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className={`w-full overflow-hidden border border-collapse shadow-md ${
          memoData.length ? "rounded-lg" : "rounded-t-lg"
        }  table-auto`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.id}
              className="bg-primary"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="px-8 py-4 text-center border-b text-secondary border-primary"
                >
                  {column.render("Header")}
                </th>
              ))}
              {actions && (
                <th className="w-1/4 px-4 py-2 text-center border-b border-primary"></th>
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className="px-8 py-4 text-center border-r border-primary"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                {actions && (
                  <td className="flex items-center justify-center gap-4 px-4 py-4">
                    {actions.map((action) => action(row))}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {memoData.length && !loading ? (
        <div className="flex items-center justify-between space-x-4 overflow-hidden border-none ">
          <div className="flex gap-4 ">
            <button
              className={`px-4 py-2 font-medium text-primary bg-transparent rounded-md ${
                pagination.page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() =>
                setPagination({ ...pagination, page: pagination.page - 1 })
              }
              disabled={pagination.page === 1}
            >
              Anterior
            </button>
            <button
              className={`px-4 py-2 font-medium text-primary bg-transparent rounded-md ${
                pagination.page === pagination.pageCount
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() =>
                setPagination({ ...pagination, page: pagination.page + 1 })
              }
              disabled={pagination.page === pagination.pageCount}
            >
              Próxima
            </button>
          </div>
          <span className="font-medium text-primary">
            Página{" "}
            <strong>
              {pagination.page} de {pagination.pageCount}
            </strong>
          </span>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center w-full m-0 font-mono text-2xl font-bold text-center bg-white border-gray-300 rounded-b-lg h-36 text-secondary">
          <Loading />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full m-0 font-mono text-2xl font-bold text-center bg-white border-gray-300 rounded-b-lg h-36 text-secondary">
          Ainda não há dados, adicione um novo!
        </div>
      )}
    </div>
  );
};

export default Table;
