import {Metadata} from "next";
import ReserveForm from "./components/ReserveForm";
import ReserveHeader from "./components/ReserveHeader";

export const metadata: Metadata = {
  title: "Reserve | Milesstone Grill",
};

const Reservation = () => {
  return (
    <div className="h-screen border-t">
      <div className="m-auto w-3/5 py-9">
        <ReserveHeader />
        <ReserveForm />
      </div>
    </div>
  );
};

export default Reservation;
