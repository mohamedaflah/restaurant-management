// import { HeaderTopCards } from "@/components/app/landingpagetop-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllrestaurantUser } from "@/redux/actions/getRestaurantuser";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { MapPin, SlidersHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Check if `pageSize` or `page` is missing, and set default values
    if (!params.has("pageSize") || !params.has("page")) {
      params.set("pageSize", "10");
      params.set("page", "1");

      // Update the URL with the new parameters
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }
  }, []);
  const { loading, restaurants, filters } = useAppSelector(
    (state) => state.retaurant
  );
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParam] = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    dispatch(
      getAllrestaurantUser({
        page: params.get("page") as unknown as number,
        pageSize: params.get("pageSize") as unknown as number,
        location: params.get("location") as string,
        pincode: params.get("pincode") as string,
        search: params.get("search") as string,
        reset: true,
      })
    );
  }, [dispatch, searchParams]);
  loading;
  return (
    <main className="mt-5 w-full ">
      {/* <HeaderTopCards /> */}
      <section className="w-full mt-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl">Restaurants</h1>
          <div className="hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-2 items-center bg-slate-100 p-2 rounded-md shadow-md">
                <span>Filter</span>
                <SlidersHorizontal className="w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <section className="grid grid-cols-2 md:grid-cols-3 mt-2 gap-2 lg:grid-cols-5">
          {restaurants?.map((res) => (
            <div
              key={res._id}
              style={{
                background: `url(${res?.images?.[0]})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className={`w-full h-64 rounded-md shadow-sm cursor-pointer flex items-end p-2  bg-cover bg-center`}
            >
              <div className="w-full min-h-16 shadow-md bg-black/65 rounded-md flex flex-col p-2 gap-2 ">
                <h1 className="text-white font-semibold text-lg tracking-wide">
                  {res?.name}{" "}
                </h1>
                <div className="flex text-white gap-2">
                  <MapPin className="w-5 text-white" />
                  <h3>{res?.location}</h3>
                </div>
              </div>
            </div>
          ))}
        </section>
        {/* <div className="w-full flex items-center justify-center mt-4">
          <button
            className={cn(
              "h-10 px-4 border rounded-md flex items-center justify-center bg-green-500 text-white gap-2",
              { "pointer-events-none bg-green-300": loading },
              {
                "pointer-events-none bg-green-300":
                  filters?.currentPage == filters.totalPages,
              }
            )}
          >
            Load more{" "}
            {loading && (
              <>
                <LoaderCircleIcon className="w-5 animate-spin" />
              </>
            )}
          </button>
        </div> */}
        <div className="flex items-center space-x-6 lg:space-x-8 w-full mt-3 justify-between py-2 border-y shadow-sm">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${
                searchParams.get("pageSize") ? searchParams.get("pageSize") : 10
              }`}
              onValueChange={(value) => {
                const param = new URLSearchParams(window.location.search);
                param.set("pageSize", value);
                setSearchParam(param);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={searchParams.get("pageSize")} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {filters.currentPage} of {filters?.totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled={Number(filters?.currentPage) <= 1}
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set("page", String(1));
                setSearchParam(params);
              }}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              disabled={Number(filters?.currentPage) <= 1}
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set("page", String(Number(filters?.currentPage) - 1));
                setSearchParam(params);
              }}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set("page", String(Number(filters?.currentPage) + 1));
                setSearchParam(params);
              }}
              disabled={
                Number(filters?.currentPage) >= Number(filters.totalPages)
              }
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set("page", String(filters?.totalPages));
                setSearchParam(params);
              }}
              disabled={
                Number(filters?.currentPage) >= Number(filters.totalPages)
              }
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
