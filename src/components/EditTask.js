import { useState } from "react";

const EditTask = ({ value, closeModel, saveChanges, taskId }) => {
  const [inputText, setInputText] = useState("");
  const inputTextHandler = (e) => {
    if (e.target.value === "") return;
    setInputText(e.target.value);
  };

  const saveChangesHadnler = () => {
    saveChanges(inputText);
  };

  return (
    <div className="modelContainer modal-md">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header justify-content-between p-2">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => closeModel()}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder={value}
              aria-label="Edit task"
              onChange={(e) => {
                inputTextHandler(e);
              }}
            />
          </div>
          <div className="modal-footer justify-content-center m-3">
            <button
              type="button"
              className="btn btn-secondary m-3"
              data-bs-dismiss="modal"
              onClick={() => closeModel()}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => saveChangesHadnler()}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
