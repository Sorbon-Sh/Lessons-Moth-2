import { useEffect, useState } from "react";
import Container from "../../ui/Container";
import url from "../../../lib/url";
import { Product } from "../../../lib/types/products.types";
import ProductCard from "../../ui/ProductCard";

//* Страница Продуктов тавара
const ProductsPage = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  //* Данные с базы данных (/products)
  //*======================================================
  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/products`);
      const data: Product[] = await res.json();

      setProducts(data);
    })();
  }, []);
  //*====================================================

  return (
    <main>
      <Container>
        <h1 className="text-3xl font-bold">Products-Page:</h1>
        <div className="grid lg:grid-cols-3 gap-4">
          {!products ? (
            <>Loading</>
          ) : (
            //* Итерация данных
            products.map((product) => (
              //* Данные как Карточки в ProductCard
              <ProductCard
                id={product.id}
                key={product.id}
                name={product.name}
                price={product.price}
              />
            ))
          )}
        </div>
      </Container>
    </main>
  );
};

export default ProductsPage;
