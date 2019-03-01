const request = require('supertest');
var expect = require('chai').expect
const app = require('./app.js');

let orderId = "";

describe('GET /', function () {
    it('responds with 200 OK to confirm the server is running', function (done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});

describe('POST /orders', function () {
    let data = {
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
    it('responds with 201 created', function (done) {
        request(app)
            .post('/orders')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                orderId = res.body._id;
                done();
            });
    });
});

describe('GET /orders', function () {
    it('responds with JSON containing a list of all orders', function (done) {
        request(app)
            .get('/orders')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /orders/:id', function () {
    it('responds with JSON containing a specific order', function (done) {
        request(app)
            .get(`/orders/${orderId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('has the correct order total', function (done) {
        request(app)
            .get(`/orders/${orderId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let orderTotal = res.body.orderTotal;
                let calculatedCost = 0;
                res.body.productsOrdered.map(item => {
                    calculatedCost += (item.price * item.quantity);
                })
                expect(calculatedCost.toFixed(2)).to.be.equal(orderTotal);
                done();
            });
    })
});