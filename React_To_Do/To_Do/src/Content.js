import React from 'react'
import ItemList from './ItemList'
//import { useState } from 'react';

const Content = ({items, handleCheck, handleDelete}) => {
   

  return (
    <div>
      {(items.length ) ?(
      <ItemList
      items={items}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      />
      ):
      (
        <p style={{textAlign: "center", fontStyle: "italic"}}>No items to display</p>
      )}
    
    
     
    </div>
  )
}

export default Content
 