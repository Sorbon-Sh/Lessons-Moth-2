import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="h-[calc(100vh-200px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
