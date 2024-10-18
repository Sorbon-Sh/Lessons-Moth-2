import { SubmitHandler, useForm } from "react-hook-form";
import useEditTasks from "./useEditTasks";

// ТИпитизация данных хука useForm
interface MyForm {
  title: string;
}

// Типитизация данных для пропсов
type Props = {
  id: string;
  refetch: () => void;
  close: () => void;
};

// EditModal получает id, функцию refetch(), функцию close()
export default function EditTaskModal({ id, refetch, close }: Props) {
  const { editTask } = useEditTasks();
  const { register, handleSubmit } = useForm<MyForm>({});

  //   Это функция click useForm для формы,
  // (Создавя свою функцию клика, можно задать ему несколько операций, и в кликах итерации и там где надо)
  const submit: SubmitHandler<MyForm> = (data) => {
    console.log(JSON.stringify(data));

    editTask(id, refetch, JSON.stringify(data));

    close();
  };

  return (
    <div onClick={close} className="bg-slate-200 h-screen w-full">
      <div>
        <form
          // Задаем эту функцию в форму
          onSubmit={handleSubmit(submit)}
          className="form-edit grid grid-rows-5 gap-y-11 text-2xl"
        >
          <label className="text-center  my-5 font-bold">Изменить задачу</label>
          <input
            type="text"
            {...register("title")}
            className="border-2 rounded-lg"
          />
          <button className=" border-2 bg-green-400 rounded-lg">
            Изменить
          </button>
        </form>
      </div>
    </div>
  );
}
