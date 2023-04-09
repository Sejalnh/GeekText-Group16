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

## Documentation

### 1. Book Browsing and Sorting

#### 1.1 Retrieve List of Books by Genre

> Given a specific genre, return a list of books for that genre.

- **Method:** GET
- **Endpoint:** `/browser/books/genre/:genre`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** JSON object containing the book with that genre info
  - **404 (failure):** there were no books with that genre

#### 1.2 Retrieve List of Top Sellers

> Return the top 10 books that have sold the most copies in descending order (most copies sold would be #1)

- **Method:** GET
- **Endpoint:** `/browser/books/top10`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** JSON object containing the top 10 books (by copiesSold) in descending order

#### 1.3 Retrieve List of Books for a particular rating and higher

> Filter by rating higher or equal to the passed rating value.

- **Method:** GET
- **Endpoint:** `browser/books/rating/:rating`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** JSON object containing the top 10 books (by copiesSold) in descending order

#### 1.4 Discount books by publisher.

> Update the price of all books under a publisher by a discount percent

- **Method:** PUT
- **Endpoint:** `browser/books/rating/:rating`
- **Body:** JSON object containing `percentDiscount` and `publisher`
  > **Note:** `percentDiscount` is expressed as a PERCENTAGE. So 20 -> indicates 20% discount
  - `{
  "percentDiscount": "20",
    "publisher": "Warner Books"
}`
- **Responses:**
  - **202 (success):** Successful update message

### 6. Wishlist Management

#### 6.1 Create a Wishlist

> Given a userId and a unique wishlist name, create a wishlist of books. 

- **Method:** POST
- **Endpoint:** `/wishlists/create`
- **Body:** JSON object containing `name` and `username` and optional `items`
- **Responses:**
  - **200 (success):** Successful message update
  - **404 (failure):** Error message

#### 6.2 Add Book to Wishlist

> Add a book to a user's existing wishlist. 

- **Method:** POST
- **Endpoint:** `/wishlists/add-book/:wishlistId/:bookId`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** Successful message update
  - **404 (failure):** Error message

#### 6.3 Add to Cart

> Remove a book from a user's existing wishlist into their shopping cart.

- **Method:** DELETE
- **Endpoint:** `/wishlists/add-to-cart/:wishlistId/:bookId`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** Successful message update
  - **404 (failure):** Error message

#### 6.4 Retrieve List of Books in Wishlist

> Lists all the books in a user's wishlist along with list name and user name.

- **Method:** GET
- **Endpoint:** `/wishlists/view/:name`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** JSON object containing all the books in the wishlist, along with the list's name and the user's name and Id.
  - **404 (failure):** Error message

#### 6.5 Delete a Book

> Remove a book from a user's existing wishlist

- **Method:** DELETE
- **Endpoint:** `/wishlists/delete-book/:wishlistId/:bookId`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** Successful message update
  - **404 (failure):** Error message