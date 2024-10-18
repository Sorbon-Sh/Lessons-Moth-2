import { useEffect, useState } from "react";
import AddNewModal from "./components/AddNewModal";
// импорт компонета Todo и в нем есть export переменной url
import Todo, { url } from "./components/Todo";
import { TodoResponse } from "./lib/types/TodoTypes";

const App = () => {
  const [show, setShow] = useState(false);
  //* В типитизации получение данных с сервера "TodoRespone" если данные есть, если нет "null"
  //? В самом стейте можно сделать что-то подное с данными, если данные есть то установить, если нет то null
  //? useStaet(fetchData || null)
  const [todos, setTodos] = useState<TodoResponse | null>(null);

  //? Асинхронная функция запроса в сервер базу данных
  const fetchTodos = async () => {
    const response = await fetch(url);

    const data: TodoResponse = await response.json();

    setTodos(data);
  };

  //? Функция запроса запускается один раз при прорисовке с помащию хука useEffect с массивом зависимости "пустой одни раз"
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="h-screen grid place-items-center mx-64">
      <Todo
        showModal={() => setShow(true)}
        todos={todos}
        refetch={fetchTodos}
      />
      {show && (
        <AddNewModal refetch={fetchTodos} onClose={() => setShow(false)} />
      )}
    </main>
  );
};

export default App;
