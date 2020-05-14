import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBook from "./SearchBook";
import BookList from "./BookList";
import * as BooksApi from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
      books:[]
  };

  componentDidMount() {
      BooksApi.getAll().then((books)=>{
          if(Array.isArray(books))
            this.setState({ books });
      });
  }

    updateState = (book_id,shelf) => {
        let books = this.state.books;
        books.filter(book => book.id === book_id).map(book => book.shelf = shelf);
        this.setState({books});
    };

    render() {

    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <BookList books={this.state.books} updateState={(book_id,shelf) => this.updateState(book_id,shelf)}/>
        )}/>

        <Route path='/search' render={() => (
            <SearchBook books={this.state.books} updateState={(book_id,shelf) => this.updateState(book_id,shelf)}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
