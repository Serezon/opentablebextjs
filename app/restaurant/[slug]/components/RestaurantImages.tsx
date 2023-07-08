import type { ReactElement } from "react";

export default function RestaurantImages(): ReactElement {
  return (
    <div>
      <h1 className="mt-10 mb-7 border-b pb-5 text-3xl font-bold">5 photos</h1>
      <div className="flex flex-wrap">
        <img
          className="mr-1 mb-1 h-44 w-56"
          src="https://resizer.otstatic.com/v2/photos/xlarge/3/41701449.jpg"
          alt=""
        />
        <img
          className="mr-1 mb-1 h-44 w-56"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701450.jpg"
          alt=""
        />
        <img
          className="mr-1 mb-1 h-44 w-56"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701452.jpg"
          alt=""
        />
        <img
          className="mr-1 mb-1 h-44 w-56"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701453.jpg"
          alt=""
        />
        <img
          className="mr-1 mb-1 h-44 w-56"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701454.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
