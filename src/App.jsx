
import './App.css'
import Navbar from './Components/Navbar'
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
 
  const [todo, settodo] = useState('')
const [todos, settodos] = useState([])

const handleChange = (e)=>{
  settodo(e.target.value)
}

const handleAdd = ()=>{
  // setshowTodo(true)
  settodos([...todos,{id : uuidv4() ,todo, iscompleted : false}]),
  settodo('')
}

const handleEdit = ()=>{

}

const handleDelete = (id)=>{
  let newtodos = todos.filter((item)=>{
return item.id !== id
})
settodos(newtodos);
}

const handleCheckBox = (e) => {
  let id = e.target.name
  let index = todos.findIndex(item=>{
    return item.id === id;
  })
  let newTodos = [...todos] ;
  newTodos[index].iscompleted = !newTodos[index].iscompleted;
  settodos(newTodos) 
}
  return (
    <>
   <Navbar/>
    <div className="container mx-auto m-5 rounded-2xl p-5 bg-violet-100  space-y-4  min-h-[80vh]">
        <h1 className="font-bold text-2xl  text-center">
          iTask - Manage your todos at one place
        </h1>
        <div>
          <h2 className="font-bold">Add a Todo</h2>
          <div className="flex gap-4 my-5">
            <span className="flex-1 rounded-2xl bg-white ">
              <input onChange={handleChange} value={todo}
                type="text" 
                className="w-full h-10 px-4 py-2 focus:outline-none"
              />
            </span>
            <button onClick={handleAdd}
              className="rounded-3xl bg-violet-800 text-white px-4 py-2 cursor-pointer"
              type="submit">
              Save
            </button>
          </div>
          <div>
            <input type="checkbox" />
            <span> Show Finished</span>
          </div>
        </div>
        <hr />
<div>
    <h2 className="font-bold">Your Todos</h2>
  <div className="Todos ">
{todos.map(item=>{
return <div key={item.id} className="Todo flex justify-between my-3">
    <div className="flex items-center gap-2">
       <input name={item.id} onChange={handleCheckBox} type="checkbox" value={item.iscompleted}/>
      <div className={item.iscompleted?"line-through":""} >{item.todo}</div>
    </div>
    <div>
      <button  onClick={handleEdit} className="bg-violet-800 p-2 rounded-2xl text-white font-bold text-sm mx-1 cursor-pointer hover:bg-violet-950">Edit</button>
      <button  onClick={() => handleDelete(item.id)} className="bg-violet-800 p-2 rounded-2xl text-white font-bold text-sm mx-1 cursor-pointer hover:bg-violet-950">Delete</button>
    </div>
  </div>
})}
    
  </div>

</div>

      </div>
     </>
  )
}

export default App
