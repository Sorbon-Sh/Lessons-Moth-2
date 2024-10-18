import { useEffect, useState } from "react";
import Container from "../../ui/Container";
import { Product, Review } from "../../../lib/types/products.types";
import url from "../../../lib/url";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  //* Хук useParams возвращает объект пар ключ/значение динамических параметров из текущего URL-адреса
  //* Которые были сопоставлены с path: "/products/:id". Ключ уже связан в ProductCard
  //* useParams возврашает ключ/значение из текущего URL-адреса
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);

  //*======================================================
  //*Запрос на Конкретный продукт по id
  useEffect(() => {
    (async () => {
      //* Id из URL-адреса который привязын из ProductCard (из итрации products в ProductCard)
      //* Здесь мы передаём Id самомго /products из URL-адреса
      const res = await fetch(`${url}/products/${id}`);
      const data: Product = await res.json();
      setProduct(data);
    })();
    //* Данные получаем  при Прорисовке
  }, []);
  //*======================================================

  //*===========================================================================
  useEffect(() => {
    //* Если Продук есть в useState() то запускается
    //* Асинхронная функция запроса в базу данных для данных Категории
    if (product) {
      (async () => {
        //* Данные из Категории берутся по Id из product.categoryId
        const res = await fetch(`${url}/categories/${product.categoryId}`);
        const data = await res.json();

        setCategory(data.name);
      })();
    }
    //* Запускается когда получает  Продукт по id
  }, [product]);
  //*============================================================================

  //*=================================================================================
  useEffect(() => {
    //* Если Продук есть в useState() то запускается
    //* Асинхронная функция запроса в базу данных для данных (рейтинга, комминтариев)
    if (product) {
      (async () => {
        //* Данные из Reviews берутся по Id из product.id
        const res = await fetch(`${url}/reviews?productId=${product.id}`);
        const data = await res.json();

        setReviews(data);
      })();
    }
    //* Запускается когда получает Продукт по id
  }, [product]);
  //*==================================================================================

  return (
    <main>
      <Container>
        <h1 className="text-3xl text-center font-medium">
          Product-Details-Page:
        </h1>
        <h1 className="text-3xl font-bold">
          <p className="font-medium">
            {/* Название Продукта */}
            Name: {product?.name ? product.name : "Loading..."}
          </p>
        </h1>
        <div className="space-y-4 my-6">
          <p className="font-medium">
            {/* Описание Продукта */}
            Description:
            {product?.description ? product.description : "Loading..."}
          </p>
          <p className="font-medium">
            {/* Цена Продукта */}
            Price: {product?.price ? product.price : "Loading..."}
          </p>
        </div>
        <p>Category: {category ? category : "Loading..."}</p>
        <div>
          {!reviews ? (
            <>Loading</>
          ) : (
            reviews.map((review) => (
              <div key={review.id}>
                <p className="font-medium">With map():</p>
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
              </div>
            ))
          )}
        </div>
      </Container>
    </main>
  );
};

export default ProductDetailsPage;
