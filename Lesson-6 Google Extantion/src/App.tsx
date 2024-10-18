import Games from "./components/Games";

const App = () => {
  return (
    <>
      <div className="container">
        <nav className="nav">
          <ul className="nav-nav">
            <li>Игры</li>

            <li>Учеба</li>

            <li>ИИ</li>

            <li>Книги</li>
          </ul>
        </nav>

        <Games />
      </div>
    </>
  );
};

export default App;
