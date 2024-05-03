import React, { useState, useEffect } from 'react';
import {db} from './db';
import './form.css';

function AddBookForm() {
    const [id, setId] = useState(0);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('')
  const [favorite, setFavorite] = useState(false);
  const [books, setBooks] = useState([]);
  
  const [message, setMessage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleFavoriteChange = (event) => {
    setFavorite(event.target.checked);
  };
  const handleDeleteBook = (id) => {
    db.book.delete(id);
    db.book.toArray().then(items => setBooks(items));
    setMessage('Book deleted successfully');
}
   


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !author) {
      setMessage('Please fill out all fields');
      return;
    }

    const newBook = {
      id,
      title,
      author,
      favorite,
      year
    };

    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
    setFavorite(false);
    setMessage('Book saved successfully');

    setId(id + 1);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('books.json');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
    
        <div className="search-box" style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}} >
            <input type="search-box" style={{  width:'80vw', borderRadius: '5px'}}></input>
        </div>
    <div className="container">
            <h2>List of Books</h2>
        <div className="display">
            <ul>
            {books.map((book) => (
  <li key={book.id}>
    <p>
      {book.title} <span>{book.author}</span> (year: {book.year})
      <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
    </p>
  </li>
))}
            </ul>
        </div>

    </div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-book-form" >
        
         <h3>Title</h3> 
          <input type="text" value={title} onChange={handleTitleChange} style={{  width:'80vw', borderRadius: '5px', height:'25px'}} />
        
        <br />
        
          <h3>Author</h3>
          <input type="text" value={author} onChange={handleAuthorChange} style={{  width:'80vw', borderRadius: '5px', height:'25px'}} />
        
        <br />
        <h3>Year</h3>
  <input
    type="number" // Use type="number" for numeric input
    value={year}
    onChange={handleYearChange}
    style={{ width: '80vw', borderRadius: '5px', height: '25px' }}
  />
  <br />
        </div>
        
         <div className="checkbox">
            <span style={{float: 'left'}}>Favorite</span>
            <input type="checkbox" checked={favorite} onChange={handleFavoriteChange}  />
            <button type="submit">Add Book</button>
     
        </div>
        
        
      </form>
      <p style={{textAlign: 'center'}}>{message}</p>

     
    </>
  );
}  

export default AddBookForm;