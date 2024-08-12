import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
export const Header = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <header
      className="wrapper h-20 flex justify-between items-center"
      draggable={false}
    >
      <h1 className="font-bold tracking-wider text-4xl text-red-300 select-none ">
        F<span className="text-[16px] font-semibold text-black">OODIE</span>D
        <span className="text-[16px]  font-semibold text-black">ELIGHT</span>
      </h1>
      <div className="flex gap-5 h-full items-center">
        <div className="h-10 px-3 flex items-center rounded-md shadow-inner bg-slate-50">
          <input
            type="search"
            value={searchParam.get("search") as string}
            onChange={(e) => {
              const param = new URLSearchParams(window.location.search);
              param.set("search", e.target.value);
              setSearchParam(param);
            }}
            className="h-full w-full outline-none bg-transparent"
            placeholder="Search Restaurant"
          />
          <Search className="w-5 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};
