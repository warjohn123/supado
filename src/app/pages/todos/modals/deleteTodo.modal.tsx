import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Todo } from "../../../models/Todo";
import { DELETE_TODO_MUTATION } from "../../../graphql/mutations";
import { LOAD_UNCOMPLETED_TODOS } from "../../../graphql/queries";
import { modalStyles } from "../../../constants/modalStyles";

interface DeleteTodoModalInterface {
  showDeleteTodo: boolean;
  setShowDeleteTodo: any;
  selectedTodo?: any;
}

Modal.setAppElement("#root");

export function DeleteTodoModal(props: DeleteTodoModalInterface) {
  const closeModal = () => {
    props.setShowDeleteTodo(false);
  };

  const [deleteTodo, { error }] = useMutation(DELETE_TODO_MUTATION, {
    refetchQueries: [
      {
        query: LOAD_UNCOMPLETED_TODOS,
      },
    ],
  });

  const deleteItem = () => {
    console.log("props.selectedTodo?.id", props.selectedTodo?.id);
    deleteTodo({
      variables: {
        id: props.selectedTodo?.id.toString(),
      },
    });

    props.setShowDeleteTodo();
  };

  return (
    <div>
      {props.showDeleteTodo && (
        <Modal
          isOpen={props.showDeleteTodo}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            Are you sure to delete this item?
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={deleteItem}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
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
