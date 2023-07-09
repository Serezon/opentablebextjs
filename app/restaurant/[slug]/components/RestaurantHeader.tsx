import prisma from "../../../../prisma/client";

const fetchRestaurantNameBySlug = async (slug: string): Promise<string> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant.name;
};

interface Props {
  slug: string;
}

export default async function RestaurantHeader({ slug }: Props) {
  const name = await fetchRestaurantNameBySlug(slug);

  return (
    <div className="h-96 overflow-hidden">
      <div className="flex h-full items-center justify-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] bg-center">
        <h1 className="captitalize text-shadow text-center text-7xl text-white">
          {name}
        </h1>
      </div>
    </div>
  );
}
