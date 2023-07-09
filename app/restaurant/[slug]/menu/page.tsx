import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";
import RestaurantMenu from "../components/RestaurantMenu";
import RestaurantNavbar from "../components/RestaurantNavbar";

export const metadata: Metadata = {
  title: "Menu | Milesstone Grill",
};

interface Props {
  params: {
    slug: string;
  };
}

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant.items;
};

export default async function RestaurantMenuPage({ params: { slug } }: Props) {
  const menu = await fetchRestaurantMenu(slug);

  return (
    <>
      <div className="w-[100%] rounded bg-white p-3 shadow">
        <RestaurantNavbar slug={slug} />
        <RestaurantMenu menu={menu} />
      </div>
    </>
  );
}
