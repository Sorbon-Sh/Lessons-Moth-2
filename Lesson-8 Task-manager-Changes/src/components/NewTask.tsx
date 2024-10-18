import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from "../lib/hooks/useAuth";
import url from "../lib/url";

type FormFields = {
  title: string;
};

type Props = {
  refetch: () => void;
};

const user = localStorage.getItem("user");

const NewTask = ({ refetch }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>();

  const token = useAuth();

  const submitHandler = async (data: FormFields) => {
    const body = {
      title: data.title,
      completed: false,
      date: new Date().toISOString(),
      userId: JSON.parse(user!).id,
    };

    try {
      const response = await axios.post(`${url}/tasks`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        refetch();
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex gap-4 mt-4">
      <input
        {...register("title", { required: "Введите это поле" })}
        type="text"
        className="grow"
      />
      <button className="px-8">+</button>
    </form>
  );
};

export default NewTask;
