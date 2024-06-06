
# Bidding Platform

This is a bidding platform where users can register, login, create items for auction, place bids, and receive notifications about the bidding process. The platform includes WebSocket functionality to notify users in real-time about new bids.

## Table of contents
- Installation
- Usage
- WebSocket Functionality
- API Documentation
## Installation

Clone the repository

```bash
git clone https://github.com/hixmanshu00/bidding-api.git
cd bidding-api
```
Install dependencies

```bash
npm install
```

### Set up the database

Ensure your MySQL database is running and the database specified in DATABASE_URL exists. The tables will be created automatically.

#### SQL Scripts for setting up the database schema
`create database database_name`




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL= mysql://user:password@host:port/database`

`JWT_SECRET=your_jwt_secret`


## Usage

Start the server

```bash
npm run dev
```


## WebSocket Functionality

### Establishing a connection

Clients can establish a WebSocket connection to receive real-time updates about new bids.

```bash
const socket = io.connect('http://localhost:5000');

// Listen for new bids
socket.on('new_bid', (bid) => {
  console.log('New bid received:', bid);
});

// Place a new bid
socket.emit('bid', {
  token: 'jwt_token', // User's JWT token
  itemId: 1, // ID of the item
  amount: 30.0 // Bid amount
});

```

## API Documentation
These endpoints allow users (both regular users and admins) to perform CRUD operations. Users must be authenticated (except in Authentication end-points) with a valid JWT token, and only users with the 'user' or 'admin' role can access these endpoints.
Provide jwt_token with requests, e.g. bearer in Authorization tab of Postman.

### Authentication

#### POST /users/register

Register a new user.

**Request Body:**

`   {        "username" : "testuser",
    "email" : "testuser@gmail.com",
    "password": "testuser",
    "role": "user"  }   `

**Response:**

`{
    "id": 1,
    "username": "testuser",
    "password": "$2a$10$RIjK1erZwLLU1P7bC1sF9OdAyR5m3JvKA2P7gKOVsCzMEy1ryo32.",
    "email": "testuser@gmail.com",
    "role": "user",
    "updatedAt": "2024-06-06T20:11:51.724Z",
    "createdAt": "2024-06-06T20:11:51.724Z"
}`

#### POST /users/login

Login a user.

**Request Body:**

`   {    "username": "testuser",    "password": "password123"  }   `

**Response:**

`   {    "token": "jwt_token"  }   `

#### GET /users/profile

Get logged in user profile.

**Request Body:**

`   {    "username": "testuser",    "password": "password123"  }   `

**Response:**

`   {    "token": "jwt_token"  }   `

### Items

#### GET /items

Retrieve all items with pagination.

**Request Query Parameters:**

*   page (optional, default: 1)
    
*   limit (optional, default: 2)

*   search (optional, default: '')

*   status (optional, default: '')



**Response:**

`   {
    "items": [
        {
            "id": 2,
            "name": "woods",
            "description": "wood",
            "starting_price": "99",
            "current_price": "99",
            "image_url": "uploads\\1717705614079-Screenshot 2023-11-24 174634.png",
            "end_time": "2024-06-12T00:00:00.000Z",
            "user_id": 1,
            "created_at": "2024-06-06T20:26:54.000Z",
            "createdAt": "2024-06-06T20:26:54.000Z",
            "updatedAt": "2024-06-06T20:26:54.000Z"
        },
        {
            "id": 1,
            "name": "wood",
            "description": "wood",
            "starting_price": "99",
            "current_price": "99",
            "image_url": "uploads\\1717705428836-Screenshot 2023-11-24 174634.png",
            "end_time": "2024-06-12T00:00:00.000Z",
            "user_id": 1,
            "created_at": "2024-06-06T20:23:48.000Z",
            "createdAt": "2024-06-06T20:23:48.000Z",
            "updatedAt": "2024-06-06T20:23:48.000Z"
        }
    ],
    "totalItems": 2,
    "totalPages": 1,
    "currentPage": 1
}   `

#### POST /items

Create a new item. Use multipart/form-data to upload the data.

**Request Body:**

*   name (string)
    
*   description (string)
    
*   starting\_price (decimal)
    
*   end\_time (datetime)
    
*   image (file, optional)

*   current_price (file, optional)

    

**Response:**

`   {
    "created_at": "2024-06-06T20:23:48.842Z",
    "id": 1,
    "name": "wood",
    "description": "wood",
    "starting_price": "99",
    "end_time": "2024-06-12T00:00:00.000Z",
    "current_price": "99",
    "image_url": "uploads\\1717705428836-Screenshot 2023-11-24 174634.png",
    "user_id": 1,
    "updatedAt": "2024-06-06T20:23:48.842Z",
    "createdAt": "2024-06-06T20:23:48.842Z"
}   `

#### DELETE /items/:id

Delete an existing item by its ID.

**Request Parameters:**

*   id (string)  

**Response:**

`   {
    "message": "Item deleted"
    }   `

#### GET /items/:id

Get a specific item by its ID.

**Request Parameters:**

*   id (string)  

**Response:**

`   {
    "id": 1,
    "name": "wood",
    "description": "wood",
    "starting_price": "99",
    "current_price": "99",
    "image_url": "uploads\\1717705428836-Screenshot 2023-11-24 174634.png",
    "end_time": "2024-06-12T00:00:00.000Z",
    "user_id": 1,
    "created_at": "2024-06-06T20:23:48.000Z",
    "createdAt": "2024-06-06T20:23:48.000Z",
    "updatedAt": "2024-06-06T20:23:48.000Z"
}   `

#### PUT /items/:id

Update an existing item.

**Request Parameters:**

*   id (string) 

**Request Body:**

`   {
    "name": "diamond"   
}  `

**Response:**

`   {
    "id": 1,
    "name": "diamond",
    "description": "wood",
    "starting_price": "99",
    "current_price": "99",
    "image_url": "uploads\\1717705428836-Screenshot 2023-11-24 174634.png",
    "end_time": "2024-06-12T00:00:00.000Z",
    "user_id": 1,
    "created_at": "2024-06-06T20:23:48.000Z",
    "createdAt": "2024-06-06T20:23:48.000Z",
    "updatedAt": "2024-06-06T20:43:42.534Z"
}   `


### Bids

#### GET /item/:itemId/bids

Get all bids for a specific item.

**Response:**

`   [
    {
        "id": 1,
        "item_id": 1,
        "user_id": 1,
        "bid_amount": "150",
        "created_at": "2024-06-06T20:45:13.000Z",
        "createdAt": "2024-06-06T20:45:13.000Z",
        "updatedAt": "2024-06-06T20:45:13.000Z",
        "User": {
            "id": 1,
            "username": "testuser"
        }
    }
]   `

#### POST /item/:itemId/bids

Place a new bid on an item.

**Request Body:**
`   {    "bid_amount": 150  }   `

**Response:**

`   {
    "created_at": "2024-06-06T20:45:13.206Z",
    "id": 1,
    "item_id": "1",
    "user_id": 1,
    "bid_amount": 150,
    "updatedAt": "2024-06-06T20:45:13.206Z",
    "createdAt": "2024-06-06T20:45:13.206Z"
}   `

### Notifications

#### GET /notifications

Get all notifications for the logged-in user.

**Response:**

`   [    {      "id": 1,      "user_id": 2,      "message": "Your item 'Item 1' has received a new bid of 25.0.",      "is_read": false,      "created_at": "2023-01-01T00:00:00.000Z"    }  ]   `

#### POST /notifications/mark-as-read

Mark notifications as read.

**Request Body:**

`   {    "notificationIds": [1, 2, 3]  }   `

**Response:**

`   {    "message": "Notifications marked as read"  }   `

