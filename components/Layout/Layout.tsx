import type { ReactElement } from "react";
import NavBar from "../NavBar/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <div className="m-auto max-w-screen-2xl bg-white">
        <NavBar />
        {children}
      </div>
    </div>
  );
}
