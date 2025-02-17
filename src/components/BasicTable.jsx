import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

export default function BasicTable({ data, columns }) {
  const [sorting, setSorting] = React.useState([]);
  const [filtering, setFiltering] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting,
      globalFiltering: filtering,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <div>
        <label htmlFor="input" className="pr-3 text-md">
          Search
        </label>
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md"
          placeholder="Search..."
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span className="ml-2">
                      {
                        {
                          asc: "🔼",
                          desc: "🔽",
                        }[header.column.getIsSorted() ?? null]
                      }
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <button
          className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          disabled={table.getState().pagination.pageIndex === 0}
          onClick={() => table.setPageIndex(0)}
        >
          First Page
        </button>
        <button
          className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          👈
        </button>
        <button
          className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          👉
        </button>
        <button
          className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          disabled={
            table.getState().pagination.pageIndex === table.getPageCount() - 1
          }
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </button>
      </div>
    </div>
  );
}
