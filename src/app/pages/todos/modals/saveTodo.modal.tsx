import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import { Todo } from "../../../models/Todo";
import {
  CREATE_TODO_MUTATION,
  UPDATE_TODO_MUTATION,
} from "../../../graphql/mutations";
import { LOAD_UNCOMPLETED_TODOS } from "../../../graphql/queries";
import { modalStyles } from "../../../constants/modalStyles";

interface SaveTodoModalInterface {
  showSaveTodo: boolean;
  setShowSaveTodo: any;
  selectedTodo?: any;
}

Modal.setAppElement("#root");

export function SaveTodoModal(props: SaveTodoModalInterface) {
  const [dueDate, setDueDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const closeModal = () => {
    props.setShowSaveTodo();
  };

  const [createTodo] = useMutation(CREATE_TODO_MUTATION, {
    refetchQueries: [
      {
        query: LOAD_UNCOMPLETED_TODOS,
      },
    ],
  });

  const [updateTodo] = useMutation(UPDATE_TODO_MUTATION, {
    refetchQueries: [
      {
        query: LOAD_UNCOMPLETED_TODOS,
      },
    ],
  });

  const saveTodo = () => {
    console.log("due date", dueDate);
    if (!props.selectedTodo) {
      createTodo({
        variables: {
          title,
          dueDate: `${dueDate.getFullYear()}/${
            dueDate.getMonth() + 1
          }/${dueDate.getDate()}`,
        },
      });

      props.setShowSaveTodo();
    } else {
      updateTodo({
        variables: {
          title,
          id: props.selectedTodo?.id.toString(),
          dueDate: `${dueDate.getFullYear()}/${
            dueDate.getMonth() + 1
          }/${dueDate.getDate()}`,
        },
      });

      props.setShowSaveTodo();
    }
  };

  useEffect(() => {
    if (props.selectedTodo) {
      setDueDate(new Date(props.selectedTodo.dueDate));
      setTitle(props.selectedTodo.title);
    }
  }, [props]);

  return (
    <div>
      {props.showSaveTodo && (
        <Modal
          isOpen={props.showSaveTodo}
          onRequestClose={closeModal}
          style={modalStyles}
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
                Title
              </label>
              <textarea
                name="project_name"
                id="project_name"
                value={title}
                rows={7}
                onChange={(e: any) => setTitle(e.target.value)}
                className="appearance-none resize-none block w-full px-3 py-2 border-2 border-gray-300 focus:border-indigo-500 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              ></textarea>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={saveTodo}
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
