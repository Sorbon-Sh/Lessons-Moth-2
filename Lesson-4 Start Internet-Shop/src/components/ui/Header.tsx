import { Link } from "react-router-dom";
import Container from "./Container";

const Header = () => {
  return (
    <header>
      <Container>
        <div className="py-4 flex justify-between">
          <h1 className="text-3xl">Shop</h1>
          <div className="space-x-4">
            <Link to={"/products"}>Products</Link>
            <Link to={"/categories"}>Categories</Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
