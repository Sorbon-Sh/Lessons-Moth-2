import { useLocation, useNavigate } from "react-router-dom";
import Container from "./ui/Container";

const Header = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <header>
      <Container>
        <div className="flex justify-between py-4">
          <h1 className="text-3xl font-bold">Todo</h1>
          <div className="space-x-4">
            <button className="bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-sm transition-all duration-150 text-black">
              Theme
            </button>

            {pathname === "/" && (
              <button
                onClick={logout}
                className="bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-sm transition-all duration-150 text-black"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
