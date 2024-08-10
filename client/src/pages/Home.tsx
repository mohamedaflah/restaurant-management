// import { HeaderTopCards } from "@/components/app/landingpagetop-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPin, SlidersHorizontal } from "lucide-react";

export default function Home() {
  return (
    <main className="mt-5 w-full ">
      {/* <HeaderTopCards /> */}
      <section className="w-full mt-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl">Restaurants</h1>
          <div>
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
          <div className="w-full h-64 rounded-md shadow-sm cursor-pointer flex items-end p-2 bg-[url(/images/restaurant-939434_1280.jpg)] bg-cover bg-center">
            <div className="w-full min-h-16 shadow-md bg-black/65 rounded-md flex flex-col p-2 gap-2 ">
              <h1 className="text-white font-semibold text-lg tracking-wide">
                Paragon restaurant{" "}
              </h1>
              <div className="flex text-white gap-2">
                <MapPin className="w-5 text-white" />
                <h3>Kochi,Kerala</h3>
              </div>
            </div>
          </div>
          <div className="w-full h-64 rounded-md border"></div>
        </section>
        <div className="w-full flex items-center justify-center mt-4">
          <button className="h-10 px-4 border rounded-md flex items-center justify-center bg-green-500 text-white">
            Load more
          </button>
        </div>
      </section>
    </main>
  );
}
