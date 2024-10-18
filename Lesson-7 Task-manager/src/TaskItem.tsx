import junt from "./assets/icon-recycle-bin.png";
import save from "./assets/icon-save.png";

const TaskItem = ({ name }) => {
  return (
    <section className=" ">
      <div className="w-vw-76 border-2  p-3 bg-slate-100 text-2xl flex justify-between">
        <p className=" flex">
          <input
            type="checkbox"
            className="w-4
          h-5 mx-3"
          />
          {name}
        </p>
        <div className="space-x-3 flex">
          <img src={save} className="  h-8 cursor-pointer  " />

          <img src={junt} className=" h-8 cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default TaskItem;
