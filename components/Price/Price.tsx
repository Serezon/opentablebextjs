import { PRICE } from "@prisma/client";
import type { ReactElement } from "react";

export interface PriceProps {
  price: PRICE;
}

export default function Price({ price }: PriceProps): ReactElement {
  const renderPrice = () => {
    if (price === PRICE.CHEAP) {
      return (
        <>
          <span>$$</span> <span className="text-gray-400">$$</span>
        </>
      );
    } else if (price === PRICE.REGULAR) {
      return (
        <>
          <span>$$$</span> <span className="text-gray-400">$</span>
        </>
      );
    } else if (price === PRICE.EXPENSIVE) {
      return <span>$$$$</span>;
    }
  };

  return <p className="mr-3 flex">{renderPrice()}</p>;
}
