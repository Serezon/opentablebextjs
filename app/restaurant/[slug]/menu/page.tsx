import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
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
    notFound();
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
