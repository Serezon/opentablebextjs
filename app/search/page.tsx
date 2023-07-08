import { Metadata } from "next";
import SearchHeader from "./components/SearchHeader";
import SearchRestaurantCard from "./components/SearchRestaurantCard";
import SearchSidebar from "./components/SearchSidebar";

export const metadata: Metadata = {
  title: "Search",
};

const Search = () => {
  return (
    <>
      <SearchHeader />
      <div className="m-auto flex w-2/3 items-start justify-between py-4">
        <SearchSidebar />
        <div className="w-5/6">
          <SearchRestaurantCard />
        </div>
      </div>
    </>
  );
};

export default Search;
