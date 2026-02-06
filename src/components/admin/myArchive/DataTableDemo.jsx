"use client";
import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function DataTableDemo() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0); // ⭐ total records
  const [pageSize, setPageSize] = useState(20); // ⭐ page size dropdown
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // ---------------------------
  // API CALL FUNCTION
  // ---------------------------
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://qa.api.rozgardwar.cloud/api/excel/list", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await response.json();
      console.log("API Response:", json);

      setTotal(json.total || 0); // ⭐ store total count

      const list = json.uploads || json.data || [];

      const formatted = list.map((item) => ({
        id: item.id,
        created_at: item.created_at,
        ...item.data_json,
      }));

      setData(formatted);
      setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------------------
  // TABLE COLUMNS
  // ---------------------------
  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "full name", header: "Full Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "course", header: "Course" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "grade", header: "Grade" },
    { accessorKey: "attendance (%)", header: "Attendance (%)" },
  ];

  // ---------------------------
  // INIT TABLE
  // ---------------------------
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // ⭐ FIX infinite re-render: update page size safely
  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 h-[calc(100vh-80px)] flex flex-col">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border px-3 py-2 mb-4 w-60 rounded"
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
  
      {/* ================= TABLE WRAPPER ================= */}
      <div className="flex-1 overflow-hidden border rounded">
        {/* Scrollable Table */}
        <div className="h-full overflow-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border p-3 text-left bg-gray-200"
                    >
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className="font-medium"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ↑",
                          desc: " ↓",
                        }[header.column.getIsSorted()] ?? ""}
                      </button>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
  
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="even:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="border p-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="p-4 text-center">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* ================= STICKY BOTTOM BAR ================= */}
      <div className="sticky bottom-0 bg-white border-t mt-4 p-3">
        <div className="flex items-center justify-between">
          {/* Total */}
          <p className="text-sm font-medium">
            Total Records: {total}
          </p>
  
          {/* Page Size */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Rows per page:</label>
            <select
              className="border px-2 py-1 rounded"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
  
          {/* Pagination Buttons */}
          <div className="flex gap-2">
            <button
              className="border px-4 py-1 rounded disabled:opacity-50"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Prev
            </button>
  
            <button
              className="border px-4 py-1 rounded disabled:opacity-50"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}
