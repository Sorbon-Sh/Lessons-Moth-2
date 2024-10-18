import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/pages/HomePage.tsx";
import ProductsPage from "./components/pages/products/ProductsPage.tsx";
import ProductDetailsPage from "./components/pages/products/ProductDetails.tsx";
import Layout from "./components/layout/layout.tsx";
import CategoriesPage from "./components/pages/categories/CategoriesPage.tsx";
import LoginPage from "./components/pages/login/LoginPage.tsx";
import NewProduct from "./components/pages/newProduct/NewProduct.tsx";

//* Созданице путей страниц React
const router = createBrowserRouter([
  {
    //* Главная страница (путь)
    path: "/",
    //* Главная страница это Компонент <Layout />
    element: <Layout />,
    //* Дочерные страны компонента <Layout />
    //* Чтобы они отображались в Layout нужно написать <Outlet />
    children: [
      //* Главная дочерная строница (Отображается при прорисовке)
      { path: "/", element: <HomePage /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/products", element: <ProductsPage /> },
      //* Если что-то будет написона в адрес :id (id, или ключ или текст)
      //* То отоброзится Компонент <ProductDetailsPage />
      //* Нужно его привязать к (id или ключу) чтобы небыло неожиденных переходов страницы
      { path: "/products/:id", element: <ProductDetailsPage /> },
      //* Страница login (путь)
      {
        path: "/login",
        //* Страница login это Компонент <LoginPage />
        element: <LoginPage />,
      },
      //* Страница new (путь)
      {
        path: "/new",
        //* Страница new это Компонент <NewProduct />
        element: <NewProduct />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
