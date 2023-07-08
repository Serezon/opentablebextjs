import Link from "next/link";

const RestaurantNavbar = () => {
  return (
    <nav className="flex border-b pb-2 text-reg">
      <Link href="/restaurant/milestone-grill" className="mr-7">
        Overview
      </Link>
      <Link href="/restaurant/milestone-grill/menu" className="mr-7">
        Menu
      </Link>
    </nav>
  );
};

export default RestaurantNavbar;
