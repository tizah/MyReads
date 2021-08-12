import React, {Component} from 'react';
import ShelfRow from './ShelfRow';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookShelf extends Component {

  state  = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((book) => {
      this.setState({books: book})
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

    render () {
      const { books } = this.state
      const shelfRows = [
        {
        name: 'Read',
        books: books.filter(book => book.shelf === 'read')
        },
        {
        name: 'Current Reading',
        books: books.filter(book => book.shelf === 'currentlyReading')
        },
        {
        name: 'Want To Read',
        books: books.filter(book => book.shelf === 'wantToRead')
        }
      ]
      
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelfRows && shelfRows.map((shelf, index) => (
                  <ShelfRow
                    key={index}
                    title={shelf.name}
                    books={shelf.books}
                    onShelfUpdate={this.onShelfUpdate}/>
                ))}
            </div>
             <div className="open-search">
              <Link to="/search">
                Add a book
              </Link>
             </div>
          </div>
          </div>
        )
    }
}

export default BookShelf;