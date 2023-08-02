import {Review} from "@prisma/client";
import { Metadata } from "next";
import {notFound} from "next/navigation";
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
  reviews: Review[];
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
      reviews: true,
    },
  });
  
  // await 500ms
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!restaurant) {
    notFound();
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
        <RestaurantRating reviews={restaurant.reviews} />
        <RestaurantDescription description={restaurant.description} />
        <RestaurantImages images={restaurant.images} />
        <RestaurantReviews reviews={restaurant.reviews} />
      </div>
      <div className="relative w-[27%] text-reg">
        <RestaurantReservationCard />
      </div>
    </>
  );
}
