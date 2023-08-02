import { Review } from "@prisma/client";
import type { ReactElement } from "react";
import Stars from "../../../../components/Stars/Stars";
import { calculateReviewRatingAverage } from "../../../../utils/calculateReviewRatingAverage";

interface Props {
  reviews: Review[];
}

export default function RestaurantRating({ reviews }: Props): ReactElement {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="ml-3 text-reg">
          {calculateReviewRatingAverage(reviews).toFixed(1)}
        </p>
      </div>
      <div>
        <p className="ml-4 text-reg">
          {reviews.length} review{reviews.length > 1 && "s"}
        </p>
      </div>
    </div>
  );
}
