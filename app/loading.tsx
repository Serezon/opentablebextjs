import type { ReactElement } from "react";
import Header from "../components/Header/Header";

export default function Loading(): ReactElement {
  return (
    <main>
      <Header />
      <div className="mt-10 flex flex-wrap justify-center py-3 px-36">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="m-3 h-72 w-64 animate-pulse cursor-pointer overflow-hidden rounded border bg-slate-200"
            ></div>
          ))}
      </div>
    </main>
  );
}
