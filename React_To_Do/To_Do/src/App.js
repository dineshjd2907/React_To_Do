import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import apiRequest from "./apiRequest";
import SearchItem from "./SearchItem";


function App() {
    const API_URL = "http://localhost:3500/todoItems";
     const[items,setItems] = useState([]);
     const [fetchError, setFetchError] = useState(null);

      useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await fetch(API_URL);
            if (!response.ok) throw Error('Did not receive expected data');
           console.log(response);
            const listItems = await response.json();
            console.log(listItems);
            setItems(listItems);
            setFetchError(null);
          } catch (err) {
            console.log(err.message);
            setFetchError(err.message);
          }finally {
            // Any cleanup or final actions can go here
          }
        }
       
        fetchItems();
      }, []);

      const handleCheck = async (id) =>{
        const newItems = items.map(item => item.id === id ? {...item, checked: !item.checked} : item);
        setItems(newItems);
        console.log(id);
        
        const myItems = newItems.filter(item => item.id === id);
        const updateOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ checked: myItems[0].checked })
        }
        const result = await apiRequest(`${API_URL}/${id}`, updateOptions, 'Failed to update item');
        if (result) setFetchError(result);
      }

      // Handle deleting an item from the list
      const handleDelete = async (id) =>{
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
        const deleteOptions = {
          method: 'DELETE'
        }
        const result = await apiRequest(`${API_URL}/${id}`, deleteOptions, 'Failed to delete item');
        if (result) setFetchError(result);
      }
      const [newItem, setNewItem]=useState('')

      const addItem = async (work) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const newItem = { id, checked: false, work };
        const newItems = [...items, newItem];
        setItems(newItems);

        const postOptions ={ 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newItem)
        }
        const result = await apiRequest(API_URL, postOptions, 'Failed to add new item');
       if (result)setFetchError(result);
      }
      
      const handleSubmit =(event)=>{
        event.preventDefault();
        console.log(newItem);
        addItem(newItem);
        setNewItem('');
      }
      const [search, setSearch] = useState('');
     
     
      

  return (
    <div className="App">
     
      <Header title="My Todo App" />
      <AddItem
         newItem={newItem} 
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}/>
        <SearchItem search={search} setSearch={setSearch} />
      <Content 
      items={items.filter(item => item.work.toLowerCase().includes(search.toLowerCase()))}
      setItems={setItems}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      fetchError={fetchError}
      />
      <Footer
      length={items.length}/>

      
    </div>
  );
}

export default App;
