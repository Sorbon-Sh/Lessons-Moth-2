import { TodoResponse } from "../lib/types/TodoTypes";
import { useState } from "react";
import SearchBar from "./SearchBar";
import useDeleteTask from "./useDeleteTask";
import EditTaskModal from "./EditTaskModal";
import useDoneTask from "./useDoneTask";

export const url = "http://localhost:3000/todos";

// Типитизируем данные пропсов
type Props = {
  showModal: () => void;
  todos: TodoResponse | null;
  refetch: () => void;
};

const Todo = ({ showModal, todos, refetch }: Props) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [taskID, setTaskID] = useState<string>("");
  const { deleteTask } = useDeleteTask();
  const { taskDone } = useDoneTask();
  //* Здесь не используется useForm Hook
  const [isDoneTask, setIsDoneTask] = useState({
    completed: false,
  });

  //? Это функция получает id и также показывает EditModal
  const modalShow = (id: string) => {
    setTaskID(id);

    setShowEditModal(true);

    console.log(id);
  };

  const closeModal = () => {
    setShowEditModal(false);
  };

  //? Функция получает id из итеации и может делать дриге действия
  const handleDoneTask = (id: string) => {
    taskDone(id, refetch, JSON.stringify(isDoneTask));

    console.log(isDoneTask);
    // ! Доработать функцию handleDoneTask
    setIsDoneTask({ completed: !isDoneTask.completed });
  };

  return (
    <div className="space-y-4 w-full">
      <h1 className="text-4xl font-bold">Todo App</h1>

      <div className="bg-indigo-50 p-12 rounded-xl">
        <div className="flex gap-4">
          <SearchBar />
          <button
            onClick={showModal}
            className="px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            Add new
          </button>
        </div>
        <div className="space-y-4 mt-4">
          {todos ? (
            todos.map((task) => (
              <div className="flex justify-between items-center" key={task.id}>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    onClick={() => handleDoneTask(task.id)}
                  />
                  <p className="text-xl">{task.title}</p>
                  <p className="self-end">{task.date}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="px-3 text-white py-2 bg-blue-500 rounded-lg"
                    onClick={() => modalShow(task.id)}
                  >
                    EDIT
                  </button>
                  <button
                    className="px-3 text-white py-2 bg-red-500 rounded-lg"
                    onClick={() => {
                      deleteTask(task.id, refetch);
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      {showEditModal && (
        <EditTaskModal id={taskID} refetch={refetch} close={closeModal} />
      )}
    </div>
  );
};

export default Todo;

// TODO: Модалка с полями Название и кнопкой "Добавить"
// TODO: Сделать добавление задачи на сервер
