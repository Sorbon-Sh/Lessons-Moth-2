import { useEffect, useState } from "react";
import { Category } from "../../../lib/types/products.types";
import url from "../../../lib/url";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/categories`);
      const data: Category[] = await res.json();

      setCategories(data);
    })();
  }, []);

  return (
    <div>
      <h1>Category</h1>
      <div>
        {!categories ? (
          <>Loading...</>
        ) : (
          categories.map((category) => (
            <div key={category.id}>
              <h1>{category.name}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
