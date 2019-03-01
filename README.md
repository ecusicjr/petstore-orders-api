# petstore-orders-api

This is a simple petstore orders RESTful API. It can receive an order with a customer number and the product IDs and quantities of the items ordered. It calls an existing inventory API to get product names and prices. In response, it stores and returns an order object with the total order cost and items using NeDb storage which can be accessed through the routes in this API.

To build and run the project, run "npm install" followed by "npm start" in the project directory (root).

Unit tests are available to verify the order totalling calculation happening.
Run "npm test"

This API expects the following JSON order entry format:

{
    "customerId": "string",
    "items": [
        {
            "productId": "string",
            "quantity": 0
        }
    ]
}

Existing Inventory API:
The Inventory API that you will is used get item details is:
https://vrwiht4anb.execute-api.us-east-1.amazonaws.com/default/product/{id}

To get a list of all products, the following route can be used:
https://vrwiht4anb.execute-api.us-east-1.amazonaws.com/default/product
