import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class BookSearch extends React.Component {
  state = {
    books: [],
    empty: false
  }

  componentDidMount() {
    BooksAPI.getAll().then(bookList => {
      this.setState({
        books: bookList.filter(book => book.shelf !== 'none')
	  })
  	})
  }

  onShelfUpdate = (book, shelfName) => {
    const { books } = this.state
	  const updateIndex = books.findIndex(b => b.id === book.id)
    const updateBook = books[updateIndex]
    updateBook.shelf = shelfName

    this.setState({
      allBooks: [...books.slice(0, updateIndex), updateBook, ...books.slice(updateIndex + 1)]
    })

    BooksAPI.update(book, shelfName)
  }


  searchBooks(query) {
    const { books } = this.state
    if (query) {
      BooksAPI.search(query, 20).then((results) => {
        if (results && results.length > 0) {
          let searchResults = results
      	  searchResults.map((book) => book.shelf = 'none' )
      	  books.map((book) => {
      		const updateIndex = searchResults.findIndex(s => s.id === book.id)
      		if (searchResults[updateIndex]) {
      		  searchResults[updateIndex].shelf = book.shelf
    		}
        this.setState({ books: searchResults, empty: false })
    	  })
          this.setState({ books: searchResults })
        } else {
          this.setState({ empty: true })
        }
      })
    } else {
      this.setState({ ...books.splice(0, books.length) })
    }
  }


    render() {
      const { books, empty } = this.state
      return (
        <div className="search-books">
                  <div className="search-books-bar">
                  <Link to="/" className="close-search" />
                    <div className="search-books-input-wrapper">
                      <input type="text" placeholder="Search by title or author" onChange={(e) => this.searchBooks(e.target.value) } />
                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid">
                      {empty ? (<div>SEARCH RESULT CAME EMPTY</div>) : books && (books.map((book, index) => (
              <Book
                key={index}
                book={book}
                empty={empty}
                onShelfUpdate={this.onShelfUpdate}
      		  />
            )))
            } 
                    </ol>
                  </div>
                </div>
      )
    }
  }

export default BookSearch