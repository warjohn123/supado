import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";

interface SaveToModalInterface {
  showSaveTodo: boolean;
  setShowSaveTodo: any;
}

Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "700px",
  },
  overlay: { zIndex: 1000 },
};

export function SaveTodoModal(props: SaveToModalInterface) {
  const [dueDate, setDueDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const closeModal = () => {
    props.setShowSaveTodo(false);
  };

  return (
    <div>
      {props.showSaveTodo && (
        <Modal
          isOpen={props.showSaveTodo}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Add Todo
            </h3>
            <div className="space-y-1 sm:space-y-0 sm:py-2">
              <label className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2 sm:pb-2">
                Due Date
              </label>
              <DatePicker
                selected={dueDate}
                className="border border-gray-300 focus:border-indigo-500 rounded-md block w-full px-3 py-2"
                onChange={(date: any) => setDueDate(date)}
              />
            </div>
            <div className="space-y-1 sm:space-y-0 sm:py-2">
              <label className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2 sm:pb-2">
                Description
              </label>
              <textarea
                name="project_name"
                id="project_name"
                value={description}
                rows={7}
                onChange={(e: any) => setDescription(e.target.value)}
                className="appearance-none resize-none block w-full px-3 py-2 border-2 border-gray-300 focus:border-indigo-500 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              ></textarea>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => closeModal()}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
