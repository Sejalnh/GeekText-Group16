# GeekText-Group16 -- Backend

Online bookstore web app with REST API.

## Usage

1. Install the dependencies (packages): `npm install`
2. Run `npm run start` to initialize the server.
3. API entry point: `http://localhost:3000/` _(used in Postman)_

## MongoDB (Atlas) - Credentials

> **Database entry point:** mongodb+srv://admin1:1234@cluster0.qngmqvw.mongodb.net/GeekTextDB?retryWrites=true&w=majority

**Login:** https://www.mongodb.com/cloud

- **Username:** admin1
- **Password:** 1234

_In **production** we have to create a **.env** file to contain all login credentials_

## Tech Stack

- **Database:** MongoDB (Atlas) through Mongoose
- **Backend Framework:** Node.js/Express.js
- **Client:** Postman

## **Documentation**

- [**Feature 1 - Book Browsing and Sorting `/browser`**](#feature-1---book-browsing-and-sorting-browser)
  - [1.1 Retrieve List of Books by Genre](#11-retrieve-list-of-books-by-genre)
  - [1.2 Retrieve List of Top Sellers](#12-retrieve-list-of-top-sellers)
  - [1.3 Retrieve List of Books for a Particular Rating and Higher](#13-retrieve-list-of-books-for-a-particular-rating-and-higher)
  - [1.4 Discount Books by Publisher](#14-discount-books-by-publisher)

### **Feature 1 - Book Browsing and Sorting `/browser`**

> Users will have a simple and enjoyable way to discover new books and Authors and sort results.

#### 1.1 Retrieve List of Books by Genre

- **Method:** GET
- **Endpoint:**`/browser/books/genre/:genre`
- **Parameters:** genre
- **Response:** JSON object containing all the books with the specified `genre`

#### 1.2 Retrieve List of Top Sellers

- **Method:** GET
- **Endpoint:**`/browser/books/top10`
- **Parameters:** None
- **Response:** JSON object containing the Top 10 books in descending order by copies sold

#### 1.3 Retrieve List of Books for a Particular Rating and Higher

- **Method:** GET
- **Endpoint:**`/browser/books/rating/:rating`
- **Parameters:** rating
- **Response:** JSON object containing all the books with the minimum rating provided

#### 1.4 Discount Books by Publisher

- **Method:** PUT
- **Endpoint:**`/browser/books/discount/`
- **Parameters:** percentDiscount, publisher
- **Response:** None
