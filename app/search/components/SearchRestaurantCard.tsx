import Link from "next/link";
import Price from "../../../components/Price/Price";
import { IRestaurantCard } from "../page";

interface Props {
  restaurant: IRestaurantCard;
}

export default function SearchRestaurantCard({ restaurant }: Props) {
  return (
    <div className="flex border-b pb-5">
      <img src={restaurant.main_image} alt="" className="h-36 w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="mb-2 flex">*****</div>
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="flex text-reg font-light">
            <p className="mr-4">
              <Price price={restaurant.price} />
            </p>
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
