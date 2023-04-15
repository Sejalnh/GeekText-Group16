# GeekText-Group16 -- Backend

Online bookstore web app with REST API.

## Usage

1. Install the dependencies (packages): `npm install`
2. Create `.env` file and paste the `PORT` and `MONGO_URI` _(from Google Drive)_
3. Run `npm run start` to initialize the server.

## MongoDB (Atlas) - Credentials

> They are saved in the Team Google Drive. Keep in mind the .DOTENV setup
>
> **Note:** if the Database doesn't seem to be responding, that may indicate the `.env` or credentials aren't valid

## Tech Stack

- **Database:** MongoDB (Atlas) through Mongoose
- **Backend:** Node.js/Express.js
- **Client:** Postman

## Documentation

- [1. Book Browsing and Sorting](#1-book-browsing-and-sorting)
  - [1.1 Retrieve List of Books by Genre](#11-retrieve-list-of-books-by-genre)
  - [1.2 Retrieve List of Top Sellers](#12-retrieve-list-of-top-sellers)
  - [1.3 Retrieve List of Books for a particular rating and higher](#13-retrieve-list-of-books-for-a-particular-rating-and-higher)
  - [1.4 Discount books by publisher.](#14-discount-books-by-publisher)
- [2. Profile Management](#2-profile-management)
  - [2.1 Create a User with username, password and optional fields (name, email address, home address)](#21-create-a-user-with-username-password-and-optional-fields-name-email-address-home-address)
  - [2.2 Retrieve a User object and its fields by their username](#22-retrieve-a-user-object-and-its-fields-by-their-username)
  - [2.3 Update the user and any fields except for email](#23-update-the-user-and-any-fields-except-for-email)
  - [2.4 Create Credit Card that belongs to a User](#24-create-credit-card-that-belongs-to-a-user)
- [3. Shopping Cart](#3-shopping-cart)
  - [3.1 Retrieve the subtotal price of all items in the user’s shopping cart.](#31-retrieve-the-subtotal-price-of-all-items-in-the-users-shopping-cart)
  - [3.2 Add a book to the shopping cart.](#32-add-a-book-to-the-shopping-cart)
  - [3.3 Retrieve the list of book(s) in the user’s shopping cart.](#33-retrieve-the-list-of-books-in-the-users-shopping-cart)
  - [3.4 Delete a book from the shopping cart instance for that user.](#34-delete-a-book-from-the-shopping-cart-instance-for-that-user)
- [4. Book Details](#4-book-details)
  - [4.1 An administrator must be able to create a book with the book ISBN, book](#41-an-administrator-must-be-able-to-create-a-book-with-the-book-isbn-book)
  - [4.2 Must be able retrieve a book’s details by the ISBN](#42-must-be-able-retrieve-a-books-details-by-the-isbn)
  - [4.3 An administrator must be able to create an author with first name, last](#43-an-administrator-must-be-able-to-create-an-author-with-first-name-last)
  - [4.4 Must be able to retrieve a list of books associated with an author](#44-must-be-able-to-retrieve-a-list-of-books-associated-with-an-author)

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

  ### 2. Profile Management

  #### 2.1 Create a User with username, password and optional fields (name, email address, home address)

  > Provided the user fields, create the user in the database

  - **Method:** POST
  - **Endpoint:** `users/create`
  - **Body:** JSON object containing required user fields `username`, `password` and `passwordConfirm`, as well as optional fields `name`, emailAddress`, `homeAddress`, `creditCards`, `wishList`and`shoppingCart`
  - **Responses:**
    - \*\*200 (user added): JSON object containing user details for current user created

  #### 2.2 Retrieve a User object and its fields by their username

  > Given a specific username, retrieve the user details

  - **Method:** GET
  - **Endpoint:** `users/username/:username`
  - **Body:** `empty`
  - **Responses:**
    - \*\*200: JSON object containing user details for requested user
    - \*\*400 (user not found): There is no user for the queried username

#### 2.3 Update the user and any fields except for email

> Given the username as a key lookup valueand any other user fields, update that user field with the new parameter value

- **Method:** PUT
- **Enpoint:** `users/updateuser/:username`
- **Body:** JSON object containing user fields to be updated
- **Responses:**
  - \*\*200: JSON containing updated user fields
  - \*\*404 (ERROR): There is no user for the the queried username

#### 2.4 Create Credit Card that belongs to a User

> Given a user name and credit card details, create a credit card for that user

- **Method:** POST
- **Endpoint:** `users/creditcards/:username`
- **Body:** JSON object containing `creditCardNumber`, `securityCode` and `expiryDate`
- **responses:**
  - \*\*200: JSON object containing user details and creditCard fields populated
  - \*\*404 (ERROR): There is no user for the the queried username

## 3. Shopping Cart

#### 3.1 Retrieve the subtotal price of all items in the user’s shopping cart.

> Get the sum price of all books in shopping cart

- **Method:** GET
- **Endpoint:** `/shoppingCart/:username/total`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** Shopping Cart Subtotal: (Subtotal)
  - **404 (failure):** Error Message

#### 3.2 Add a book to the shopping cart.

> Adds an isbn number to the shopping cart array of a user

- **Method:** POST
- **Endpoint:** `/shoppingCart/:username/add/:ISBN`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** Book (ISBN) added to shopping cart
  - **404 (failure):** No such ISBN: (ISBN)

#### 3.3 Retrieve the list of book(s) in the user’s shopping cart.

> Get a list of all the books that correspond to the ISBN numbers inside the shopping cart of a user

- **Method:** GET
- **Endpoint:** `/shoppingCart/:username/list`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** JSON object containing all books corresponding to ISBN numbers in shopping cart
  - **404 (failure):** Error Message

#### 3.4 Delete a book from the shopping cart instance for that user.

> Remove a specific isbn number from the users shopping cart.

- **Method:** DELETE
- **Endpoint:** `/shoppingCart/:username/remove/:ISBN`
- **Body:** `empty`
- **Responses:**

  - **200 (success):** Book (ISBN) removed from shopping cart
  - **404 (failure):** No such ISBN: (ISBN)

  ### 4. Book Details

#### 4.1 An administrator must be able to create a book with the book ISBN, book

name, book description, price, author, genre, publisher , year published and
copies sold

> Create a book with the provided information including the book ISBN, book name, book description, price, author, genre, publisher , year published and
> copies sold.

- **Method:** POST
- **Endpoint:** `/books/createBook`
- **Body:** JSON object containing `title`,`ISBN`,`author`,`genre`,`copiesSold`,`rating`,`publisher`,`price`,`description`,`yearPublished`,`rating`and`comments`
- **Responses:**
  - **200 (success):** Book Added! message
  - **404 (failure):** Error Message

#### 4.2 Must be able retrieve a book’s details by the ISBN

> Return the book details associated with the provided ISBN number

- **Method:** GET
- **Endpoint:** `/books/ISBN/:ISBN`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** JSON object containing the books information from the provided ISBN
  - **404 (failure):** Error Message

#### 4.3 An administrator must be able to create an author with first name, last

name, biography and publisher

> Create an author with the provided information including first name, last
> name, biography and publisher

- **Method:** POST
- **Endpoint:** `books/createAuthor`
- **Body:** JSON object containing `firstname`, `lastname`, `biography`, `publisher`
- **Responses:**
  - **200 (success):** Author added! message
  - **404 (failure):** Error Message

#### 4.4 Must be able to retrieve a list of books associated with an author

> Given an authors name, return a list of books associated with that author.

- **Method:** GET
- **Endpoint:** `books/author/:author`
- **Body:** `empty`
- **Responses:**

  - **200 (success):** JSON object containing the books associated with the provided author
  - **404 (failure):** Error Message
  
  ### 5. Book Rating and Commenting
 
 #### 5.1 Create a rating for a book by a user on a 5 star scale with a date

> Create a rating for a book given by a user.

- **Method:** POST
- **Endpoint:** `/books-rating/`
- **Body:** `JSON object containing ISBN, rating, and username`
> **Note:** `Example`
  - `{
  "bookId": "76790538",
    "rating": 4.5,
    "username": "MinimalUser"
}`
- **Responses:**
  - **200 (success):** Rating Added! message
  - **404 (failure):** Error Message
  
  
 #### 5.2 Create a Comment for a Book by a User with a Date

> Create a comment for a book given by a user.

- **Method:** POST
- **Endpoint:** `/books-comment/`
- **Body:** `JSON object containing ISBN, comment, and username`
> **Note:** `Example`
  - `{
  "bookId": "76790538",
    "comment": "Amazing Book!!",
    "username": "MinimalUser"
}`
- **Responses:**
  - **200 (success):** Comment Added! message
  - **404 (failure):** Error Message

#### 5.3 Retrieve a List of All Comments for a Particular Book

> Retrieve a list of comments for the book.

- **Method:** GET
- **Endpoint:** `/books-comment/:ISBN`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** JSON list containing the comments of particular book
  - **404 (failure):** Error Message

#### 5.4 Retrieve Average Rating for a Particular Book

> Given a book Id, calculate the average rating as a decimal

- **Method:** GET
- **Endpoint:** `/books-rating/:ISBN`
- **Body:** `empty`
- **Responses:**
  - **200 (success):** decimal which is average rating of particular book
  - **404 (failure):** Error Message
