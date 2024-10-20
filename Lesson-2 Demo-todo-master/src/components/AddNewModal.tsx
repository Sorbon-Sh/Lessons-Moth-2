import { useForm } from "react-hook-form";
import { url } from "./Todo";

//* Типитизация пропсов
type Props = {
  onClose: () => void;
  refetch: () => void;
};

//* Типитизация для useForm
type Fields = {
  title: string;
};

const AddNewModal = ({ onClose, refetch }: Props) => {
  //* Хук useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>();

  //? Функция доваление данных на сервер с повторным запросом и функцием закритии поле доваление
  const onSubmit = async (data: Fields) => {
    const currentDate = new Date();

    const body = {
      title: data.title,
      completed: false,
      date: `${currentDate.getDay()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`,
      time: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
    };

    //? Отправка данных на базу данных
    await fetch(url, { body: JSON.stringify(body), method: "POST" });

    refetch();

    onClose();
  };
  return (
    <div
      onClick={onClose}
      className="fixed top-0 start-0 h-screen w-full bg-black bg-opacity-30 grid place-items-center"
    >
      <div
        //! Узнать что-это
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-12 rounded-xl space-y-4"
      >
        <h1 className="text-3xl font-bold">Add new Task</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            type="text"
            className="py-2 px-4 border border-indigo-500 outline-none focus:border-indigo-800 rounded-lg"
            {...register("title", {
              required: "Введите это поле",
              minLength: { value: 3, message: "Минимум 3 символа" },
            })}
          />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
          <button className="py-2 bg-indigo-200 rounded-xl hover:bg-indigo-300">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewModal;
