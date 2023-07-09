import { Item } from "@prisma/client";
import type { ReactElement } from "react";
import RestaurantMenuCard from "./RestaurantMenuCard";

interface Props {
  menu: Item[];
}

export default function RestaurantMenu({ menu }: Props): ReactElement {
  return (
    <main className="mt-5 bg-white">
      <div>
        <div className="mt-4 mb-1 pb-1">
          <h1 className="text-4xl font-bold">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menu.length ? (
            menu.map((item) => <RestaurantMenuCard key={item.id} item={item} />)
          ) : (
            <p>This restaurant has no menu yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
