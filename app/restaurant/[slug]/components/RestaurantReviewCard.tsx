import { Review } from "@prisma/client";
import type { ReactElement } from "react";
import Stars from "../../../../components/Stars/Stars";

interface Props {
  review: Review;
}

export default function RestaurantReviewCard({ review }: Props): ReactElement {
  return (
    <div className="mb-7 border-b pb-7">
      <div className="flex">
        <div className="flex w-1/6 flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-400">
            <h2 className="text-2xl uppercase text-white">
              {review.first_name[0]}
              {review.last_name[0]}
            </h2>
          </div>
          <p className="text-center">
            {review.first_name} {review.last_name}
          </p>
        </div>
        <div className="ml-10 w-5/6">
          <div className="flex items-center">
            <Stars rating={review.rating} />
          </div>
          <div className="mt-5">
            <p className="text-lg font-light">{review.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
