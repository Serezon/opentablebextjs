import { Review } from "@prisma/client";
import type { ReactElement } from "react";
import RestaurantReviewCard from "./RestaurantReviewCard";

interface Props {
  reviews: Review[];
}

export default function RestaurantReviews({ reviews }: Props): ReactElement {
  return (
    <div>
      <h1 className="borber-b mt-10 mb-7 pb-5 text-3xl font-bold">
        What {reviews.length} {reviews.length > 1 ? "people" : "person"} are
        saying
      </h1>
      <div>
        {reviews.map((review) => (
          <RestaurantReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
