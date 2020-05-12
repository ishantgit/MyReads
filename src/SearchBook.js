import React, { Component } from 'react';
import {Link} from "react-router-dom";
import * as BooksApi from './BooksAPI';
import {BookItem} from "./BookItem";

class SearchBook extends Component{

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query },() => {
            this.searchQuery(query);
        });
    }

    updateState = (book_id,shelf) => {
        var books = this.state.books;
        books.filter(book => book.id === book_id).map(book => {
            book.shelf = shelf;
        });
        this.setState({books});
    };

    searchQuery = (query) => {
        BooksApi.search(query).then((books) =>{
            console.log(books);
           this.setState({books});
        });
    }

    render() {
        const { query } = this.state;
       return <div className="search-books">
            <div className="search-books-bar">
                <Link to='/'>
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input type="text" placeholder="Search by title or author"
                        value={query} onChange={(e) => this.updateQuery(e.target.value)}/>

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        this.state.books !== undefined ? this.state.books.map(book => {
                            return <li key={book.id}>
                                <BookItem book={book}  updateValue={(updatedShelf) => {
                                    this.updateState(book.id,updatedShelf);
                                }}/>
                            </li>
                        }) : null
                    }
                </ol>
            </div>
        </div>
    }
}

export default SearchBook;