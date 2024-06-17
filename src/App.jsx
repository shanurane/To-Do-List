import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLS();
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <div className="h-full mb-6 flex flex-col min-h-screen">
      <Navbar />
      <div className="w-full h-full flex justify-center">
        <div className="w-full h-full md:w-1/2 border m-3 p-5 border-zinc-700 rounded-xl bg-zinc-400">
          <div>
            <h1 className="font-bold text-2xl text-center">Productivity-App</h1>
            <h1 className="text-center">Makes your Task Memorable</h1>
            <h1 className="font-bold text-xl text-center">Add Task</h1>
            <div className="my-3 w-full flex gap-2">
              <input
                onChange={handleChange}
                type="text"
                value={todo}
                className="w-full border border-zinc-700 rounded-full px-3"
              />

              <button
                onClick={handleAdd}
                disabled={todo.length <= 2}
                className="px-3 py-1 bg-zinc-800 rounded-2xl text-white hover:bg-zinc-600 disabled:bg-zinc-600"
              >
                Add
              </button>
            </div>
          </div>
          <input
            onChange={handleFinished}
            type="checkbox"
            checked={showFinished}
            className="mx-2"
          />
          Show Completed Tasks
          <div className="YourTodos w-full ">
            <h1 className="w-full font-bold text-xl text-center">
              Your To Do's
            </h1>
            {todos.length === 0 && (
              <div className="my-3">Your List Is Empty</div>
            )}
            {todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div key={item.id} className="todos">
                    <div className="w-full border border-zinc-700 p-2 rounded-3xl flex justify-between my-1">
                      <div>
                        <input
                          name={item.id}
                          onChange={handleCheckbox}
                          type="checkbox"
                          checked={item.isCompleted}
                          className="m-2"
                        />
                        <span
                          className={
                            item.isCompleted ? "line-through mx-3" : "mx-3"
                          }
                        >
                          {item.todo}
                        </span>
                      </div>
                      <div className="buttons flex h-full">
                        <button
                          onClick={(e) => handleEdit(e, item.id)}
                          className="mx-1 px-2 py-2 bg-zinc-800 rounded-full text-white hover:invert"
                        >
                          <CiEdit />
                        </button>
                        <button
                          onClick={(e) => {
                            handleDelete(e, item.id);
                          }}
                          className="mx-1 px-2 py-2 bg-zinc-800 rounded-full text-white hover:invert"
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
