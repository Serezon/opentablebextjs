import type { ReactElement } from "react";

interface Props {
  name: string;
}

export default function RestaurantTitle({ name }: Props): ReactElement {
  return (
    <div className="mt-4 border-b pb-6">
      <h1 className="text-6xl font-bold">{name}</h1>
    </div>
  );
}
