import { Cuisine, PRICE, Location, Review } from "@prisma/client";
import { Metadata } from "next";
import prisma from "../../prisma/client";
import SearchHeader from "./components/SearchHeader";
import SearchRestaurantCard from "./components/SearchRestaurantCard";
import SearchSidebar from "./components/SearchSidebar";

export const metadata: Metadata = {
  title: "Search",
};

export interface IRestaurantCard {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
}

const fetchRestaurants = (params: ISearchParams) => {
  const where: {
    location?: {
      name: string;
    };
    cuisine?: {
      name: string;
    };
    price?: PRICE;
  } = {};

  if (params.city) {
    where.location = {
      name: params.city.toLowerCase(),
    };
  }
  if (params.cuisine) {
    where.cuisine = {
      name: params.cuisine.toLowerCase(),
    };
  }
  if (params.price) {
    where.price = params.price;
  }

  const prismaOptions: {
    select: {
      [key in keyof IRestaurantCard]: boolean;
    };
    where?: typeof where;
  } = {
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true,
    },
  };

  if (Object.keys(where).length) prismaOptions.where = where;

  return prisma.restaurant.findMany(prismaOptions);
};

export interface IRegion {
  id: number;
  name: string;
}

export interface ICuisine {
  id: number;
  name: string;
}

const fetchAllRegions = (): Promise<IRegion[]> =>
  prisma.location.findMany({
    select: {
      id: true,
      name: true,
    },
  });

const fetchAllCuisines = (): Promise<ICuisine[]> =>
  prisma.cuisine.findMany({
    select: {
      id: true,
      name: true,
    },
  });

export interface ISearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

interface Props {
  searchParams: ISearchParams;
}

export default async function Search({ searchParams }: Props) {
  const [restaurants, regions, cuisines] = await Promise.all([
    fetchRestaurants(searchParams),
    fetchAllRegions(),
    fetchAllCuisines(),
  ]).catch((err) => {
    console.error(err);
    return [[], [], []];
  });

  return (
    <>
      <SearchHeader />
      <div className="m-auto flex w-2/3 items-start justify-between py-4">
        <SearchSidebar
          cities={regions}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <SearchRestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))
          ) : (
            <p>No restaurants found</p>
          )}
        </div>
      </div>
    </>
  );
}
