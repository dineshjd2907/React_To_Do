import { useRef } from 'react'


const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef();  
  return (
   <form className= "addForm" onSubmit={handleSubmit}>  
   <label htmlFor="addItem">Add Item</label>
   <input 
   ref={inputRef}
   type='text'
   id="addItem"
   value={newItem}
   onChange={(e) => setNewItem(e.target.value)}
   required
   placeholder="Add a new item"
   />
   <button onClick={()=>inputRef.current.focus()}
   type="submit" aria-label="Add Item">Add</button>
    
   </form>

  )
}

export default AddItem
