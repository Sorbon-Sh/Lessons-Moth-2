import { useEffect, useState } from "react";
import Box from "../components/ui/Box";
import axios from "axios";
import url from "../lib/url";
import useAuth from "../lib/hooks/useAuth";
import { Task } from "../lib/types/TasksTypes";
import { FadeLoader } from "react-spinners";
import TaskItem from "../components/TaskItem";
import NewTask from "../components/NewTask";

const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = useAuth();

  const fetchUsers = async () => {
    const response = await axios.get(`${url}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="h-[calc(100vh-200px)] grid place-items-center">
      <Box>
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <NewTask refetch={fetchUsers} />
        <div className="flex flex-col gap-4 mt-8">
          {!tasks ? (
            <div className="p-12 flex items-center justify-center">
              <FadeLoader color="blue" />
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                refetch={fetchUsers}
                completed={task.completed}
                date={task.date}
                key={task.id}
                title={task.title}
                id={task.id}
              />
            ))
          )}
        </div>
      </Box>
    </div>
  );
};

export default HomePage;
