import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksApi from './BooksAPI';
import {BookItem} from "./BookItem";

class BookList extends Component{

    state = {

    }

    componentDidMount() {
        BooksApi.getAll().then((books)=>{
            console.log(books);
            this.setState({ books })
        });
    }

    updateState = (book_id,shelf) => {
      var books = this.state.books;
      books.filter(book => book.id === book_id).map(book => {
          book.shelf = shelf;
      });
      this.setState({books});
    };

    render() {
       var renderBooks = (shelf) => {
           return this.state.books.filter(book=> book.shelf === shelf).map(book => {
               return <li key={book.id}>
                   <BookItem book={book} updateValue={(updatedShelf) => {
                       this.updateState(book.id,updatedShelf);
                   }}/>
               </li>
           })
       };
       return <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    this.state.books !== undefined ? renderBooks("currentlyReading") : null
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    this.state.books !== undefined ? renderBooks("wantToRead") : null
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    this.state.books !== undefined ? renderBooks("read") : null
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <Link to='/search' className="open-search">
                <button >Add a book</button>
            </Link>
        </div>
    }
}

export default BookList;