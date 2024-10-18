import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Tasks from "./Tasks";
import { IUser } from "./types";

const Login = ({ darkMode }: boolean) => {
  const [correct, setCorrect] = useState<boolean>(false);

  const user: IUser = {
    //* Пробелы тоже учитуваются!
    email: "user",
    password: "123",
  };
  const { register, handleSubmit } = useForm<IUser>({});

  const submit: SubmitHandler<IUser> = (data) => {
    if (data.email !== user.email) return;
    if (data.password !== user.password) return;

    setCorrect(true);
  };

  return (
    <>
      {correct ? (
        <Tasks darkMode={darkMode} />
      ) : (
        <section className=" grid justify-center">
          <div className=" grid justify-center py-4 rounded-lg  w-vw-80 bg-slate-200">
            <div className="text-2xl my-4">Login</div>
            <form
              onSubmit={handleSubmit(submit)}
              className=" grid grid-cols-1 w-vw-76  gap-y-2"
            >
              <input
                type="text"
                {...register("email")}
                placeholder="Login"
                className="py-3 rounded-lg"
              />
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="py-3 rounded-lg"
              />
              <button
                className={`${
                  darkMode ? "bg-slate-100 text-black" : "bg-black text-white"
                }
              border py-3 rounded-lg   `}
              >
                Login
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
