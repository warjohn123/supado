import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Todo } from "../../../models/Todo";
import {
  COMPLETE_TODO_MUTATION,
  DELETE_TODO_MUTATION,
} from "../../../graphql/mutations";
import { LOAD_UNCOMPLETED_TODOS } from "../../../graphql/queries";
import { modalStyles } from "../../../constants/modalStyles";

interface CompleteTodoModalInterface {
  showCompleteTodo: boolean;
  setShowCompleteTodo: any;
  selectedTodo?: any;
}

Modal.setAppElement("#root");

export function CompleteTodoModal(props: CompleteTodoModalInterface) {
  const closeModal = () => {
    props.setShowCompleteTodo(false);
  };

  const [completeTodo, { error }] = useMutation(COMPLETE_TODO_MUTATION, {
    refetchQueries: [
      {
        query: LOAD_UNCOMPLETED_TODOS,
      },
    ],
  });

  const completeItem = () => {
    completeTodo({
      variables: {
        id: props.selectedTodo?.id.toString(),
        completedDate: `${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}`,
      },
    });

    props.setShowCompleteTodo();
  };

  return (
    <div>
      {props.showCompleteTodo && (
        <Modal
          isOpen={props.showCompleteTodo}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            Are you sure to complete this todo?
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={completeItem}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Complete
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
