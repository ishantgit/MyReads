import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {BookItem} from "./BookItem";

class BookList extends Component{


    render() {
       let books = this.props.books;
       let renderBooks = (shelf) => {
           return  books !== undefined && books != null ? books.filter(book=> book.shelf === shelf).map(book => {
               return <li key={book.id}>
                   <BookItem book={book} updateValue={(updatedShelf) => {
                       this.props.updateState(book.id,updatedShelf);
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