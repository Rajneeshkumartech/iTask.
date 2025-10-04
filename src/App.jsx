import "./App.css";
import Navbar from "./Components/Navbar";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CiEdit   } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const SaveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const togglefinished = () => {
    setshowfinished(!showfinished);
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleAdd = () => {
    // setshowTodo(true)
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]),
      settodo("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    SaveToLS();
  };

  const handleEdit = (id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);
    let newtodos = todos.filter((item) => {
      console.log(item.todo);
      return item.id !== id;
    });
    settodos(newtodos);
    SaveToLS();
  };

  const handleDelete = (id) => {
    const userconfirmed = confirm("Are you sure you want to delete this  Task");

    if (userconfirmed) {
      const pakka = confirm("pakka");
      if (pakka) {
        let newtodos = todos.filter((item) => {
          console.log(item.todo);
          return item.id !== id;
        });
        settodos(newtodos);
        SaveToLS();
      }
    }
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    settodos(newTodos);
    SaveToLS();
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto m-5 rounded-2xl p-5 bg-violet-100  space-y-4  min-h-[80vh]">
        <h1 className="font-bold text-2xl  text-center">
          iTask - Manage your todos at one place
        </h1>
        <div>
          <h2 className="font-bold">Add a Todo</h2>
          <div className="flex gap-4 my-5">
            <span className="flex-1 rounded-2xl bg-white ">
              <input
                ref={inputRef}
                onChange={handleChange}
                value={todo}
                type="text"
                className="w-full h-10 px-4 py-2 focus:outline-none"
              />
            </span>
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="rounded-3xl bg-violet-800 text-white px-4 py-2 cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={togglefinished}
              checked={showfinished}
            />
            <span> Show Finished</span>
          </div>
        </div>
        <hr />
        <div>
          <h2 className="font-bold">Your Todos</h2>
          <div className="Todos ">
            {todos.length === 0 && (
              <h1 className="font-bold text-2xl  text-center">No Task </h1>
            )}
            {todos.map((item) => {
              return (showfinished||!item.iscompleted) &&(
                <div key={item.id} className="Todo flex justify-between my-3">
                  <div className="flex items-center gap-2">
                    <input
                      name={item.id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.iscompleted}
                    />
                    <div className={item.iscompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-violet-800 p-2 rounded-2xl text-white font-bold text-sm mx-1 cursor-pointer hover:bg-violet-950"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-violet-800 p-2 rounded-2xl text-white font-bold text-sm mx-1 cursor-pointer hover:bg-violet-950"
                    >
                      <AiOutlineDelete /> 
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
