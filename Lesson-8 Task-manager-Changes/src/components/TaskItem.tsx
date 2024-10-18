import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import useTruncate from "../lib/hooks/useTruncate";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import url from "../lib/url";
import useAuth from "../lib/hooks/useAuth";
import { useForm } from "react-hook-form";

type Props = {
  title: string;
  id: number;
  date: string;
  completed: boolean;
  refetch: () => void;
};

type FormFields = {
  title: string;
};

const TaskItem = ({ title, id, completed, date, refetch }: Props) => {
  const [checked, setChecked] = useState(completed);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const formattedDate = new Date(date);
  const truncate = useTruncate();
  const token = useAuth();

  const { register, handleSubmit } = useForm<FormFields>();

  const changeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    const body = {
      completed: event.target.checked,
    };

    try {
      const response = await axios.patch(`${url}/tasks/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await axios.delete(`${url}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = async (data: FormFields) => {
    const body = {
      title: data.title,
    };

    try {
      const response = await axios.patch(`${url}/tasks/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error(error);
    }

    setEditing(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={`py-4 px-8 flex justify-between gap-12 ${
        completed ? "line-through bg-gray-500" : "bg-gray-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          onChange={changeHandler}
          checked={checked}
          id=""
        />
        {editing ? (
          <input
            type="text"
            {...register("title")}
            className="!p-0"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          />
        ) : (
          <p>{title}</p>
        )}
        <p>{formattedDate.toDateString()}</p>
      </div>
      <div className="flex gap-2">
        {editing ? (
          <button>
            <CheckIcon className="w-4 h-4" />
          </button>
        ) : (
          <div
            className="bg-gray-800 text-white px-4 py-2 rounded-lg disabled:opacity-70 cursor-pointer"
            onClick={() => setEditing(true)}
          >
            <PencilSquareIcon className="w-4 h-4" />
          </div>
        )}
        <button type="button" onClick={deleteTask}>
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default TaskItem;
