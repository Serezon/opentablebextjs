import Header from "../components/Header/Header";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="mt-10 flex flex-wrap justify-center py-3 px-36">
        <RestaurantCard />
      </div>
    </main>
  );
}
