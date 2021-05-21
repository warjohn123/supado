import { useQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOAD_UNCOMPLETED_TODOS } from "../../graphql/queries";
import { Todo } from "../../models/Todo";
import { CompleteTodoModal } from "./modals/completeTodo.modal";
import { DeleteTodoModal } from "./modals/deleteTodo.modal";
import { SaveTodoModal } from "./modals/saveTodo.modal";

export function TodosPage() {
  const [showSaveTodo, setShowSaveTodo] = useState<boolean>(false);
  const [showDeleteTodo, setShowDeleteTodo] = useState<boolean>(false);
  const [showCompleteTodo, setShowCompleteTodo] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const { error, loading, data } = useQuery(LOAD_UNCOMPLETED_TODOS);

  const [selectedTodo, setSelectedTodo] = useState<any>();

  const editTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowSaveTodo(true);
  };

  const closeSaveTodo = () => {
    setShowSaveTodo(false);
    setSelectedTodo(null);
  };

  const closeDeleteTodo = () => {
    setShowDeleteTodo(false);
    setSelectedTodo(null);
  };

  const closeCompleteTodo = () => {
    setShowCompleteTodo(false);
    setSelectedTodo(null);
  };

  const deleteTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowDeleteTodo(true);
  };

  const completeTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowCompleteTodo(true);
  };

  useEffect(() => {
    console.log("data", data);

    if (data) {
      setTodos(data.todos);
    }
  }, [data]);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
            }
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full justify-between flex-grow flex flex-1">
                  <h3 className={"font-semibold text-lg text-blueGray-700"}>
                    Todos
                  </h3>

                  <button
                    onClick={() => setShowSaveTodo(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-100 bg-blue-500 rounded-md shadow-sm disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    Add Todo
                  </button>
                </div>

                <SaveTodoModal
                  setShowSaveTodo={closeSaveTodo}
                  showSaveTodo={showSaveTodo}
                ></SaveTodoModal>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      ID
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      Title
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      Due Date
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo, index) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left flex items-center">
                        {todo.id}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {todo.title}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {todo.dueDate}
                      </td>
                      <td className="border-t-0 px-6 flex justify-around align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i
                          className="fa fa-edit text-blue-400 cursor-pointer text-base"
                          onClick={() => editTodo(todo)}
                        ></i>
                        <i
                          className="fa fa-trash text-red-400 cursor-pointer text-base"
                          onClick={() => deleteTodo(todo)}
                        ></i>
                        <i
                          className="fa fa-check text-green-400 cursor-pointer text-base"
                          onClick={() => completeTodo(todo)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <SaveTodoModal
                setShowSaveTodo={closeSaveTodo}
                showSaveTodo={showSaveTodo}
                selectedTodo={selectedTodo}
              ></SaveTodoModal>

              <DeleteTodoModal
                setShowDeleteTodo={closeDeleteTodo}
                showDeleteTodo={showDeleteTodo}
                selectedTodo={selectedTodo}
              ></DeleteTodoModal>
              <CompleteTodoModal
                setShowCompleteTodo={closeCompleteTodo}
                showCompleteTodo={showCompleteTodo}
                selectedTodo={selectedTodo}
              ></CompleteTodoModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
