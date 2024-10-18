import logoutIcon from "./assets/icon-logout.png";
import darkModeIcon from "./assets/icon-night-mode.png";

const Header = ({ setDarkMode, darkMode }) => {
  return (
    <>
      <header className="flex justify-around my-5">
        <div className=" font-bold text-2xl">Todo App</div>

        <div className="flex  w-32 justify-between">
          <img
            onClick={() => setDarkMode(!darkMode)}
            src={darkModeIcon}
            className=" border rounded-md py-2 px-2 h-12 cursor-pointer bg-white"
          />

          <img
            src={logoutIcon}
            className={` ${darkMode ? "bg-white" : "bg-black"}
            border h-12 rounded-md py-3 px-5 cursor-pointer text-white bg-black $`}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
