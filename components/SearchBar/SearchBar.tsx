"use client";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";

export default function SearchBar(): ReactElement {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.SyntheticEvent) => {
    router.push(`/search?city=${search}`);
    setSearch("");
  };

  return (
    <div className="m-auto flex justify-center py-3 text-left text-lg">
      <input
        className="mr-3 w-[450px] rounded p-2"
        type="text"
        placeholder="State, city or town"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e);
          }
        }}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={handleSearch}
      >
        Let&apos;s go
      </button>
    </div>
  );
}
