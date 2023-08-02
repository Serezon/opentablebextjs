import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Header from "../components/Header/Header";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import prisma from "../prisma/client";

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

const fetchRestaurants = async (): Promise<IRestaurantCard[]> => {
  const restaurants = await prisma.restaurant.findMany({
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
  });

  // await 500ms
  await new Promise((resolve) => setTimeout(resolve, 500));

  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <div>
      <Header />
      <div className="mt-10 flex flex-wrap justify-center py-3 px-36">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
