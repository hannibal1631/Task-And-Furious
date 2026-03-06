import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";

function TaskCardMin() {
  return (
    <div className="bg-green-700 w-fit px-5 py-3 flex flex-col gap-5 rounded-2xl transition-all hover:scale-105">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-semibold">Task Title</h3>
        <FontAwesomeIcon icon={faMaximize} className="text-2xl hover:text-white cursor-pointer" />
      </div>
      <div className="flex gap-7 items-center">
        <span className="text-xl bg-red-500 py-1 px-2">High Priority</span>
        <span className="text-xl bg-red-500 py-1 px-2">Active</span>
      </div>
      <div className="bg-red-300 line-clamp-3 py-1 px-2">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deserunt? Nostrum omnis quasi ipsum explicabo ut, earum nesciunt provident modi fuga dignissimos sunt fugit, iure eligendi! Eaque mollitia distinctio molestias.</p>
      </div>
    </div>
  );
}

export default TaskCardMin