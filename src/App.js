import { useState, useReducer, useRef } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Task from "./components/Task";
import EditTask from "./components/EditTask";

const ACTION = {
  ADD: "ADD",
  DELETE: "DELETE",
  EDIT: "EDIT",
  COMPLETE: "COMPLETE",
  EDIT_SAVE_ITEM: "EDIT_SAVE_ITEM",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const tempList = [...state.taskList, action.paylod];
      return { ...state, taskList: tempList };
    }
    case "DELETE": {
      const tempList = state.taskList.filter(
        (task, idx) => task.id !== action.paylod.id
      );
      return { ...state, taskList: tempList };
    }
    case "COMPLETE": {
      const tempList = state.taskList.map((task, idx) => {
        if (task.id == action.paylod.id) {
          task.isCompleted = action.paylod.isCompleted;
        }
        return task;
      });
      return { ...state, taskList: [...tempList] };
    }
    case "EDIT_SAVE_ITEM": {
      const tempList = state.taskList.map((task, idx) => {
        if (task.id == action.paylod.id) {
          task.text = action.paylod.task;
        }
        return task;
      });
      return { ...state, taskList: [...tempList] };
    }
    default:
      return state;
  }
};

function App() {
  const [inputText, setInputText] = useState("");
  const initialState = {
    taskList: [{ id: Date.now(), text: "my new task", isCompleted: false }],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get input task
  const inputTextHandler = (e) => {
    let tempText = e.target.value;
    setInputText(tempText);
  };
  // Add new task handler
  const taskSubmitHandler = (e) => {
    e.preventDefault();
    if (inputText === "") return;
    dispatch({
      type: ACTION.ADD,
      paylod: {
        id: Date.now(),
        text: inputText,
        isCompleted: false,
      },
    });
    setInputText("");
  };
  // Mark task complete state
  const markCompletHandler = (itemId, itemStatus) => {
    dispatch({
      type: ACTION.COMPLETE,
      paylod: {
        id: itemId,
        isCompleted: itemStatus,
      },
    });
  };
  // Delete / Remove task from list
  const deleteHandler = (itemId) => {
    // console.log("Delete Handler", itemId);
    dispatch({
      type: ACTION.DELETE,
      paylod: {
        id: itemId,
      },
    });
  };
  // Util function to get list of un completed task
  const getCompletedTaskCount = () => {
    const getCount = state.taskList.reduce((acc, curElement) => {
      console.log(curElement);
      if (!curElement.isCompleted) {
        acc++;
      }
      return acc;
    }, 0);

    // console.log("getCount", getCount);
    return getCount;
  };

  const editHandler = (id, task) => {
    dispatch({ type: ACTION.EDIT_SAVE_ITEM, paylod: { id: id, task: task } });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row appContainer">
          <h2 className="m-2">To Do List</h2>
          <div className="w-50 appRight shadow-lg">
            <form onSubmit={(e) => taskSubmitHandler(e)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add new task"
                  aria-label="Add task to list"
                  value={inputText}
                  onChange={(e) => {
                    inputTextHandler(e);
                  }}
                />
                <button className="btn btn-primary">+</button>
              </div>
            </form>
            <div className="listContainer">
              <p>You have {getCompletedTaskCount()} task(s) to complete</p>
              {state.taskList.map((taskItem, idx) => {
                return (
                  <Task
                    key={taskItem.id}
                    taskItem={taskItem}
                    editHandler={editHandler}
                    deleteTask={deleteHandler}
                    completeTask={markCompletHandler}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
