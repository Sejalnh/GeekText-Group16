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
    - **200: JSON object containing user details for requested user
    - **400 (user not found): There is no user by queried username

#### 2.3 Update the user and any fields except for email

> Given the username as a key lookup valueand any other user fields, update that user field with the new parameter value

- **Method:** PUT
- **Enpoint:** `users/updateuser/:username`
- **Body:** JSON object containing user fields to be updated
- **Responses:**
  - **200: JSON containing updated user fields
  - **404 (ERROR): There is no user by the queried username

#### 2.4 Create Credit Card that belongs to a User

> Given a user name and credit card details, create a credit card for that user

- **Method:** POST
- **Endpoint:** `users/creditcards/:username`
- **Body:** JSON object containing `creditCardNumber`, `securityCode` and `expiryDate`
- **responses:**
  - **200: JSON object containing user details and creditCard fields populated
  - **404 (ERROR): There is no user by the queried username
