import Link from "next/link";
import LoginModal from "../AuthModal/AuthModal";

const NavBar = () => {
  return (
    <nav className="flex justify-between bg-white p-2">
      <Link href="/" className="text-2xl font-bold text-gray-700">
        OpenTable
      </Link>
      <div>
        <div className="flex">
          <LoginModal isSignIn />
          <LoginModal isSignIn={false} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
