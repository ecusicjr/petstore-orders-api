const express = require('express')
const request = require('request')
const app = express()
const port = 3000

var Datastore = require('nedb')
    , db = new Datastore({ filename: 'orders', autoload: true });

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<a href="https://github.com/ecusicjr/petstore-orders-api">Please see readme for instructions to use this API</a>');
})

app.get('/orders', (req, res) => {
    res.send(db.getAllData());
})

app.get('/orders/:id', (req, res) => {
    db.findOne({ "_id": req.params.id }, function (err, doc) {
        res.send(doc);
    })
})

app.post('/orders', (req, res) => {
    const body = req.body;
    const customerId = body.customerId;
    const items = body.items;

    let orderTotal = 0.0;

    let productsOrdered = [];

    items.map((currentItem) => {
        const productId = currentItem.productId;
        const quantity = currentItem.quantity;
        request.get(`https://vrwiht4anb.execute-api.us-east-1.amazonaws.com/default/product/${productId}`, function (error, response, body) {
            let item = JSON.parse(body).body;
            let name = item.name;
            let price = item.price;
            let cost = price * quantity;

            orderTotal += cost;

            productsOrdered.push(
                {
                    "productId": productId,
                    "name": name,
                    "price": price,
                    "quantity": quantity,
                    "totalCost": cost
                }
            )

            if (productsOrdered.length === items.length) {
                productsOrdered.sort((a, b) => a.productId > b.productId);
                let doc = {
                    "customerId": customerId,
                    "orderTotal": orderTotal.toFixed(2),
                    "productsOrdered": productsOrdered
                }
                db.insert(doc, function (err, newDoc) {
                    res.status(201);
                    res.send(newDoc);
                });
            }
        })
    });
})

app.listen(port, () => console.log(`Sample petstore orders API is listening on port ${port}!\n\nGithub: https://github.com/ecusicjr/petstore-orders-api`))

module.exports = app;