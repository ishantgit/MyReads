import React, { Component } from 'react';
import {update} from "./BooksAPI";

export const BookItem = (props) => {
    return <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
                <select value={props.book.shelf !== undefined ? props.book.shelf : "none"} onChange={(e) => {
                    let updatedShelf = e.target.value;
                    update(props.book,updatedShelf).then((res)=>{
                        console.log(res);
                        props.updateValue(updatedShelf);
                    })
                }}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">
            {props.book.authors !== undefined ? props.book.authors.map(item => item) :  null}
        </div>
    </div>
};