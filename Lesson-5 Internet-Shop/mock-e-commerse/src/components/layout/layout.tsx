import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div>
      {/* Остаётся на странице даже при переходе на другую страниницу */}
      <Toaster />
      {/* Остаётся на странице даже при переходе на другую страниницу */}
      <Header />
      {/* Отоброжение дочерных страниц Layout 
      Сам Layout никуда не пропадает при переходе страницы */}
      <Outlet />
    </div>
  );
};

export default Layout;
