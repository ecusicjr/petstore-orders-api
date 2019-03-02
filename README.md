# petstore-orders-api

## Description

This is a simple petstore orders RESTful API. It can receive an order with a customer number and the product IDs and quantities of the items ordered. It calls an existing inventory API to get product names and prices. In response, it stores and returns an order object with the total order cost and items using NeDb storage which can be accessed through the routes in this API.

To build and run the project, run `npm install` followed by `npm start` in the project directory (root).

Unit tests are available to verify the order total calculation works properly and that the routes return JSON data as expected.
Run `npm test`

This API expects the following JSON order entry format at /orders and runs on port 3000:

```json
{
    "customerId": "string",
    "items": [
        {
            "productId": "string",
            "quantity": 0
        }
    ]
}
```

Existing Inventory API: 
The Inventory API that is used get item details is:
https://vrwiht4anb.execute-api.us-east-1.amazonaws.com/default/product/{id}

To get a list of all products, the following route can be used:
https://vrwiht4anb.execute-api.us-east-1.amazonaws.com/default/product

## API Usage

### GET /orders
Returns all orders

### GET /orders/:id
Returns the order matching the :id

### POST /orders

Example request

```json
{
  "customerId": "12346",
  "items": [
    {
      "productId": "100",
      "quantity": 10
    },
    {
      "productId": "103",
      "quantity": 3
    },
    {
      "productId": "101",
      "quantity": 2
    }
  ]
}
```

Example response

```json
{
        "customerId": "12346",
        "orderTotal": 128.85,
        "productsOrdered": [
            {
                "productId": "100",
                "name": "leash",
                "price": 9.99,
                "quantity": 10,
                "totalCost": 99.9
            },
            {
                "productId": "101",
                "name": "collar",
                "price": 6.99,
                "quantity": 2,
                "totalCost": 13.98
            },
            {
                "productId": "103",
                "name": "squeaky toy",
                "price": 4.99,
                "quantity": 3,
                "totalCost": 14.97
            }
        ],
        "_id": "3Qwkrl7CEbYXKHUS"
    }
```
