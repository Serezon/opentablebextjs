import { Metadata } from "next";
import RestaurantMenu from "../components/RestaurantMenu";
import RestaurantNavbar from "../components/RestaurantNavbar";

export const metadata: Metadata = {
  title: "Menu | Milesstone Grill",
};

const RestaurantMenuPage = () => {
  return (
    <>
      <div className="w-[100%] rounded bg-white p-3 shadow">
        <RestaurantNavbar />
        <RestaurantMenu />
      </div>
    </>
  );
};

export default RestaurantMenuPage;
