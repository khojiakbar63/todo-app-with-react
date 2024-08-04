import React, { useState } from 'react';

const App = () => {


const [title, setTitle] = useState("")
const [todo, setTodo] = useState([])
const [showModal, setShowModal] = useState(false)
const [currentTitle, setCurrentTitle] = useState('')


// Add task
function addTask () {
  const newTask = {
    title: title,
    created_at: Date.now(),
    isDone: false,
    id: Date.now()
  }

  if(newTask.title.length){
    setTodo([...todo, newTask])
    setTitle("")
  } else{
    alert("Please enter task title!")
  }
}
// Delete task
const deleteTask = (id)=>{
  const leftTasks = todo.filter((task)=> task.id != id)
  setTodo(leftTasks);
}
// Edit task
const editTask = (id, val)=>{
  setShowModal(true)
  setCurrentTitle(val)

  localStorage.setItem("todoId", id)
}
// Save editted task
const saveEditedTask = ()=>{
  const id = localStorage.getItem("todoId")
  todo.forEach((item)=>{
    if(item.id == id){
      item.title = currentTitle
      setShowModal(false)
    }
  })
}
// Show modal window
const modalStyle={
  display: showModal ? "flex" : "none"
}



  return (
    <main>
      <section id='main'>

        <div style={modalStyle} className="modal-wrapper">
          <div className="modal-content">
            <div onClick={()=> setShowModal(false)} id='close-icon'>
              <i className="bi bi-x-lg"></i>
            </div>
            <form action="#">
              <input value={currentTitle} onChange={(e)=> setCurrentTitle(e.target.value)} type="text" placeholder='Enter a new title..'/>
            </form>
            <div className="btn-group">
              <button onClick={saveEditedTask} className='save'>Save</button>
              <button onClick={()=> setShowModal(false)} className='cancel'>Cancel</button>
            </div>
          </div>
        </div>

        <div className="container mx-auto flex justify-center pt-8">
          <div className="todo-card p-4 bg-slate-100 rounded-sm w-full">
            <h1>{title}</h1>
            {/*------------------- Form --------------*/}
           
            <form onSubmit={addTask} action="#" className='border-2 border-grey-800 flex justify-between gap-x-6 p-4 mb-8'>
              <input value={title} onChange={(e)=> setTitle(e.target.value)} className='flex grow p-4 outline-indigo-500 outline-8s' type="search" placeholder='Enter todo title'/>
              <button type="submit" className='duration-100 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white px-6 rounded-sm text-2xl font-bold'>Add task</button>
            </form>

            {/*------------------- Table --------------*/}
            <table className='w-full text-center'>
              <thead className='bg-white text-indigo-500 text-[20px] h-12'>
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Created At</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {
                  todo.map((item, index)=>{
                  return (<tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td>{item.created_at}</td>
                    <td><button onClick={()=> editTask(item.id, item.title)} className='duration-100 bg-green-500 hover:bg-green-600 active:bg-green-500 text-white px-6 rounded-sm text-xl font-bold inline-block'><i className="bi bi-pencil-square mr-3"></i></button></td>
                    <td><button onClick={()=> deleteTask(item.id)} className='duration-100 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white px-6 rounded-sm text-xl font-bold inline-block'><i className="bi bi-trash3-fill mr-3"></i></button></td>
                  </tr>)

                  })

                }
                

              </tbody>
            </table>

          </div>
        </div>

      </section>
    </main>
  );
};

export default App;