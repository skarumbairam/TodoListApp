import { useState, useRef } from "react";
import EditTask from "./EditTask";

const Task = ({ completeTask, taskItem, editHandler, deleteTask }) => {
  const [taskState, setTaskState] = useState(true);
  const [editItem, setEditItem] = useState(false);
  const modelRef = useRef(null);
  // Set Delete
  const onDeleteHandler = () => {
    deleteTask(taskItem.id);
  };
  // Set complete
  const onCompleteHandler = (e) => {
    //const tempState = !e.target.checked;
    setTaskState((tempState) => !tempState);
    completeTask(taskItem.id, taskState);
  };

  //Set edit
  const onEditHandler = () => {
    setEditItem(!editItem);
    console.log(modelRef);
    modelRef.current?.scrollIntoView();
  };

  //Set Save
  const saveChanges = (editText) => {
    // editText will go to parent Component as task
    setEditItem(!editItem);
    if (editText === "") return;
    editHandler(taskItem.id, editText);
  };
  //Set Close
  const closeModel = () => {
    setEditItem(!editItem);
  };

  return (
    <>
      {}
      <div className="editTask" ref={modelRef}>
        {editItem && (
          <EditTask
            value={taskItem.text}
            closeModel={closeModel}
            saveChanges={saveChanges}
          />
        )}
      </div>
      <div className="auto task d-flex p-2 bd-highlight justify-content-between align-items-center bg-white m-1 shadow">
        <div className="d-flex">
          <input
            className="form-check-input"
            type="checkbox"
            id="taskItemCheck"
            onChange={(e) => onCompleteHandler(e)}
          />
          <p
            className={
              taskItem.isCompleted
                ? "m-0 p-0 px-2 lineThrough roboto-black-italic"
                : "m-0 p-0 px-2"
            }
          >
            {taskItem.text}
          </p>
        </div>
        <div className="">
          <button
            className="btn btn-secondary mx-1"
            onClick={() => onEditHandler()}
          >
            Edit
          </button>
          <button
            className="btn btn-secondary mx-1"
            onClick={() => onDeleteHandler()}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Task;
