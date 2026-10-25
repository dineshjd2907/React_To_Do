import React from 'react'

const ItemList = ({items, handleCheck, handleDelete}) => {
  return (
    <div>
      <ul>
        {items.map((Todo) => (

          <li className='Todo' key={Todo.id}> 
            <input type='checkbox' checked = {Todo.checked} onChange={() => handleCheck(Todo.id)}>
            </input>
            <label style={(Todo.checked)?{textDecoration: "line-through"}:{}}>{Todo.work}</label>
            <button onClick={() => handleDelete(Todo.id)}>Delete</button>
          </li>

        ))}
      </ul>
    </div>
  )
}

export default ItemList
