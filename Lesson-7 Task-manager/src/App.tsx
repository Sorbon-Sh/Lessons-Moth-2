import { useState } from "react";
import Header from "./Header";
import Login from "./Login";
import LoginPage from "./Login2";

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <main>
      {/* <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <Login darkMode={darkMode} /> */}

      <LoginPage />
    </main>
  );
};

export default App;
