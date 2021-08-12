import React from 'react'
import BookShelf from './BookShelf';
import {Route} from 'react-router-dom'
import BookSearch from './BookSearch';
import './App.css'

class BooksApp extends React.Component {
  
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BookShelf} />
        <Route path="/search" component={BookSearch} />
      </div>
    )
  }
}

export default BooksApp
