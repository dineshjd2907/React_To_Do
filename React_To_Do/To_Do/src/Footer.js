import React from 'react'
const year = new Date().getFullYear();

const Footer = ({length}) => {
  return (
    <footer>
      <p>Copyright &copy; {year} My Website</p>
      <p>Total Items: {length}</p>
    
    </footer>
  )
}

export default Footer
