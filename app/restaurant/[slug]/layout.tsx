import type { ReactElement } from "react";
import RestaurantHeader from "./components/RestaurantHeader";

interface RestaurantLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export default function RestaurantLayout({
  children,
  params: { slug },
}: RestaurantLayoutProps): ReactElement {
  return (
    <>
      <RestaurantHeader slug={slug} />
      <div className="0 m-auto -mt-11 flex w-2/3 items-start justify-between">
        {children}
      </div>
    </>
  );
}
