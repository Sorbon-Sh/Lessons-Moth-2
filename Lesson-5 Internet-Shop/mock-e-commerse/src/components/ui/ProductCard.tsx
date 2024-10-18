import { Link } from "react-router-dom";

type Props = {
  id: number;
  name: string;
  price: number;
};

const ProductCard = ({ id, name, price }: Props) => {
  return (
    //* Привязываем id Продуктов к ( path: /products/Привязываем id: ${id} )
    //* Это сами карточки в Products-Page
    //* При переходу запускается Компонент <ProductDetailsPage />
    <Link
      to={`/products/${id}`}
      className="p-4 bg-gray-200 rounded-lg font-medium"
    >
      <h1 className=" text-center">Product Card:</h1>
      <h1>{name}</h1>
      <p>{price} USD</p>
    </Link>
  );
};

export default ProductCard;
