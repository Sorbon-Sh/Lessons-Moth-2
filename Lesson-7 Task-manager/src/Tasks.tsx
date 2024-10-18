import { url } from "./url";
import TaskItem from "./TaskItem";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ITasks } from "./types";

const Tasks = ({ darkMode }: boolean) => {
  interface Task {
    task: string;
  }
  const { register, handleSubmit } = useForm<Task>({});

  const [tasks, setTaks] = useState();

  console.log("Component");

  useEffect(() => {
    (async () => {
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setTaks(data));
    })();
  }, []);

  const submit: SubmitHandler<Task> = (data) => {
    console.log(data);
  };

  return (
    <>
      <section className="grid justify-center">
        <div className="bg-slate-50  grid justify-center border rounded-lg">
          <div className="font-bold text-2xl  w-fit mx-5">Your Todos</div>
          <form className="grid p-5 w-vw-76" onSubmit={handleSubmit(submit)}>
            <input
              type="text"
              placeholder="Your Todo"
              className=" py-3 border rounded-lg"
              {...register("task")}
            />
            <button
              className={`${
                darkMode ? "bg-white text-black" : "bg-black text-white"
              }
            "border rounded-lg py-4  px-8   font-bold"`}
            >
              Add
            </button>
          </form>
          {!tasks && "Loading..."}
          {tasks &&
            tasks.map((data: ITasks) => (
              <TaskItem key={data.id} name={data.name} />
            ))}
        </div>
      </section>
    </>
  );
};

export default Tasks;
