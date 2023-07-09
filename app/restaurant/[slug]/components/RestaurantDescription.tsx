import type { ReactElement } from "react";

interface Props {
  description: string;
}

export default function RestaurantDescription({
  description,
}: Props): ReactElement {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{description}</p>
    </div>
  );
}
