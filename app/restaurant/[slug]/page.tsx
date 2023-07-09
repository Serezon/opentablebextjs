import { Metadata } from "next";
import prisma from "../../../prisma/client";
import RestaurantDescription from "./components/RestaurantDescription";
import RestaurantImages from "./components/RestaurantImages";
import RestaurantNavbar from "./components/RestaurantNavbar";
import RestaurantRating from "./components/RestaurantRating";
import RestaurantReservationCard from "./components/RestaurantReservationCard";
import RestaurantReviews from "./components/RestaurantReviews";
import RestaurantTitle from "./components/RestaurantTitle";

export const metadata: Metadata = {
  title: "Milesstone Grill",
};

interface IRestaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<IRestaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant;
};

interface Props {
  params: {
    slug: string;
  };
}

export default async function RestaurantDetails({ params: { slug } }: Props) {
  const restaurant = await fetchRestaurantBySlug(slug);

  return (
    <>
      <div className="w-[70%] rounded bg-white p-3 shadow">
        <RestaurantNavbar slug={restaurant.slug} />
        <RestaurantTitle name={restaurant.name} />
        <RestaurantRating />
        <RestaurantDescription description={restaurant.description} />
        <RestaurantImages images={restaurant.images} />
        <RestaurantReviews />
      </div>
      <div className="relative w-[27%] text-reg">
        <RestaurantReservationCard />
      </div>
    </>
  );
}
