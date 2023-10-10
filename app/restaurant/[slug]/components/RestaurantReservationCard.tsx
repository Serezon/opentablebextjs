"use client";
import { useState, type ReactElement, useMemo } from "react";
import { partySizes, times } from "../../../../data";
import DatePicker from "react-datepicker";

type TRestaurantReservationCardProps = {
  openTime: string;
  closeTime: string;
};

export default function RestaurantReservationCard({
  closeTime,
  openTime,
}: TRestaurantReservationCardProps): ReactElement {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => setSelectedDate(date);

  const restaurantTimes = useMemo(() => {
    const timesInWindow: typeof times = [];

    let isTimeInWindow = false;

    times.forEach((time) => {
      if (!isTimeInWindow && time.time === openTime) {
        isTimeInWindow = true;
      }

      if (isTimeInWindow) {
        timesInWindow.push(time);
      }

      if (time.time === closeTime) {
        isTimeInWindow = false;
      }
    });

    return timesInWindow;
  }, [openTime, closeTime]);

  return (
    <div className="fixed w-[15%] rounded bg-white p-3 shadow">
      <div className="border-b pb-2 text-center font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="border-b bg-white py-3 px-1 font-light" id="">
          {partySizes.map((size) => (
            <option value={size.value} key={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex w-[48%] flex-col">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            className="h-[44px] w-24 border-b py-2 px-1 text-reg font-light"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex w-[48%] flex-col">
          <label htmlFor="">Time</label>
          <select name="" id="" className="border-b bg-white py-3 px-1 font-light">
            {restaurantTimes.map((time) => (
              <option value={time.time} key={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="h-16 w-full rounded bg-red-600 px-4 font-bold text-white">
          Find a Time
        </button>
      </div>
    </div>
  );
}
