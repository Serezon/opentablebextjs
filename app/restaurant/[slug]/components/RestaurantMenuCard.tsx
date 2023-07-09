import { Item } from "@prisma/client";
import type { ReactElement } from "react";

interface Props {
  item: Item;
}

export default function RestaurantMenuCard({ item }: Props): ReactElement {
  return (
    <div className=" mb-3 w-[49%] rounded border p-3">
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="mt-1 text-sm font-light">{item.description}</p>
      <p className="mt-7">{item.price}</p>
    </div>
  );
}
