import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCookies } from "react-cookie";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { useEffect, useState } from "react";

import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";
import { Calendar } from "./components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";

export const columns = [
  {
    accessorKey: "properties.email",
    header: "Email",
  },
  {
    accessorKey: "properties.firstname",
    header: "First Name",
  },
  {
    accessorKey: "properties.lastname",
    header: "Last Name",
  },
  {
    accessorKey: "properties.closedate",
    header: "Customer Date",
  },
  {
    accessorKey: "properties.createdate",
    header: "Lead Date",
  },
];

// Thi will get all the contacts data from our HS account using our PHP contacts endpoint
async function getData(token) {
  try {
    const response = await fetch("http://localhost:3001/contacts.php", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data,
      };
    } else {
      return {
        success: false,
        data: data,
      };
    }
  } catch (error) {
    console.log(error, "error");
  }
}

export function DataTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="rounded-md border mb-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-[#F9FAFB]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4 w-full">
        {table.getCanPreviousPage() ? (
          <button
            href={`https://app.hubspot.com`}
            className="bg-white hover:bg-[#f2f2f2] text-black  border font-bold py-2 px-4 rounded flex items-center gap-x-2"
            onClick={() => table.previousPage()}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8333 7.00002H1.16666M1.16666 7.00002L6.99999 12.8334M1.16666 7.00002L6.99999 1.16669"
                stroke="#0A1734"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Previous
          </button>
        ) : (
          <button
            href={`https://app.hubspot.com`}
            className="bg-slate-50  text-[#d5d5d5] border font-bold py-2 px-4 rounded flex items-center gap-x-2"
            disabled
          >
            {" "}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8333 7.00002H1.16666M1.16666 7.00002L6.99999 12.8334M1.16666 7.00002L6.99999 1.16669"
                stroke="#d5d5d5"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Previous
          </button>
        )}

        {table.getCanNextPage() ? (
          <button
            href={`https://app.hubspot.com`}
            className="bg-white hover:bg-[#f2f2f2] text-black  border font-bold py-2 px-4 rounded flex items-center gap-x-1"
            onClick={() => table.nextPage()}
          >
            Next
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                stroke="#0A1734"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        ) : (
          <button
            href={`https://app.hubspot.com`}
            className="bg-slate-50  text-[#d5d5d5] border font-bold py-2 px-4 rounded flex items-center gap-x-1"
            disabled
          >
            Next
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                stroke="#d5d5d5"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}

function App() {
  const [cookies, setCookie] = useCookies(["hubspot-ui"]);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  const [date, setDate] = useState({
    from: null,
    to: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getData(cookies.accessToken);
        if (response.success) {
          setContacts(response?.data?.results);
        } else {
          setFailure(true);
          setFailureMessage(
            response?.data?.message || "Something went wrong, please try again."
          );
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = contacts.filter((contact) => {
      let contactDate = new Date(contact.properties.closedate);
      return contactDate >= date?.from && contactDate <= date?.to;
    });

    setFilteredContacts(filteredData);
  }, [date]);

  return (
    <div className="px-20 py-10">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <>
          {failure && (
            <div className="text-center">
              <div className="text-red-500 font-bold mb-10">
                {failureMessage}
              </div>
              <div>
                <a href="/">Go back to login</a>
              </div>
            </div>
          )}
          {!failure && (
            <div>
              <div className="mb-5 flex justify-between">
                <div className="font-bold text-xl">Data</div>
                <div className="">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {date?.from ? (
                          date?.to ? (
                            <>
                              {format(date?.from, "LLL dd, y")} -{" "}
                              {format(date?.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date?.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        s
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DataTable
                columns={columns}
                data={date?.from && date?.to ? filteredContacts : contacts}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
