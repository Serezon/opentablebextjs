import type { ReactElement } from "react";
import RestaurantMenuCard from "./RestaurantMenuCard";

export default function RestaurantMenu(): ReactElement {
  return (
    <main className="mt-5 bg-white">
      <div>
        <div className="mt-4 mb-1 pb-1">
          <h1 className="text-4xl font-bold">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          <RestaurantMenuCard />
        </div>
      </div>
    </main>
  );
}
