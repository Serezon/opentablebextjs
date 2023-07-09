import { PRICE } from "@prisma/client";
import Link from "next/link";
import { ReactElement } from "react";
import { ICuisine, IRegion, ISearchParams } from "../page";

interface Props {
  cuisines: ICuisine[];
  cities: IRegion[];
  searchParams: ISearchParams;
}

export default function SearchSidebar({
  cuisines,
  cities,
  searchParams,
}: Props): ReactElement {
  const prepareHrefWithExtendedSearchParams = (
    params: Partial<ISearchParams>
  ) => ({
    pathname: "/search",
    query: { ...searchParams, ...params },
  });

  return (
    <div className="mr-2 w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {cities.map((city) => (
          <Link
            href={prepareHrefWithExtendedSearchParams({ city: city.name })}
            key={city.id}
            className="block text-reg font-light capitalize"
          >
            {city.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 border-b pb-4">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={prepareHrefWithExtendedSearchParams({
              cuisine: cuisine.name,
            })}
            key={cuisine.id}
            className="block text-reg font-light capitalize"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={prepareHrefWithExtendedSearchParams({ price: PRICE.CHEAP })}
            className="w-full rounded-l border p-2 text-center text-reg font-light"
          >
            $
          </Link>
          <Link
            href={prepareHrefWithExtendedSearchParams({ price: PRICE.REGULAR })}
            className="w-full border-r border-t border-b p-2 text-center text-reg font-light"
          >
            $$
          </Link>
          <Link
            href={prepareHrefWithExtendedSearchParams({
              price: PRICE.EXPENSIVE,
            })}
            className="w-full rounded-r border-r border-t border-b p-2 text-center text-reg font-light"
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
}
