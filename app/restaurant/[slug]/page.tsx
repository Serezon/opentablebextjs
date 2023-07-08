import { Metadata } from "next";
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

const RestaurantDetails = () => {
  return (
    <>
      <div className="w-[70%] rounded bg-white p-3 shadow">
        <RestaurantNavbar />
        <RestaurantTitle />
        <RestaurantRating />
        <RestaurantDescription />
        <RestaurantImages />
        <RestaurantReviews />
      </div>
      <div className="relative w-[27%] text-reg">
        <RestaurantReservationCard />
      </div>
    </>
  );
};

export default RestaurantDetails;
