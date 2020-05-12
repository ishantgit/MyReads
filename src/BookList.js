import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksApi from './BooksAPI';
import {BookItem} from "./BookItem";

class BookList extends Component{

    state = {

    };

    componentDidMount() {
        BooksApi.getAll().then((books)=>{
            this.setState({ books })
        });
    }

    updateState = (book_id,shelf) => {
      let books = this.state.books;
      books.filter(book => book.id === book_id).map(book => book.shelf = shelf);
      this.setState({books});
    };

    render() {
       let renderBooks = (shelf) => {
           return  this.state.books !== undefined && this.state.books != null ? this.state.books.filter(book=> book.shelf === shelf).map(book => {
               return <li key={book.id}>
                   <BookItem book={book} updateValue={(updatedShelf) => {
                       this.updateState(book.id,updatedShelf);
                   }}/>
               </li>
           }) : <div/>
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
                                {renderBooks("currentlyReading")}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {renderBooks("wantToRead")}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {renderBooks("read")}
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