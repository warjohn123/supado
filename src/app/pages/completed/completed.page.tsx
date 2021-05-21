import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOAD_COMPLETED_TODOS } from "../../graphql/queries";
import { Todo } from "../../models/Todo";
import { DeleteTodoModal } from "../todos/modals/deleteTodo.modal";

export function CompletedPage() {
  const [showDeleteTodo, setShowDeleteTodo] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const { error, loading, data } = useQuery(LOAD_COMPLETED_TODOS);

  const [selectedTodo, setSelectedTodo] = useState<any>();

  const closeDeleteTodo = () => {
    setShowDeleteTodo(false);
    setSelectedTodo(null);
  };

  const deleteTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowDeleteTodo(true);
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
                    Completed
                  </h3>
                </div>
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
                          className="fa fa-trash text-red-400 cursor-pointer text-base"
                          onClick={() => deleteTodo(todo)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <DeleteTodoModal
                setShowDeleteTodo={closeDeleteTodo}
                showDeleteTodo={showDeleteTodo}
                selectedTodo={selectedTodo}
              ></DeleteTodoModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
