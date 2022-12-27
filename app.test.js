const server = require("./app.js");
const chaiHttp =  require("chai-http");
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const expect = require('expect').default
const request = require('supertest')

let chai = require('chai');
let jsonfile = require('jsonfile');
let file = jsonfile.readFileSync('data.json');

describe('/GET book', () => {
    it('should GET all the books', done => {
        request(server)
            .get("/book")
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              done();
            });
    })
});

describe('/POST book', () => {
    it('should POST one book', done => {
        const book = {
          id: file.length,
          amount: 1,
        name: "book-name",
        author: "author-name",
        year: "data-relis"
        }

        request(server)
            .post('/book')
            .send(book)
            .expect(200)
            .expect((res) => {
                expect((res.body).length).toStrictEqual(file.length + 1)
            })
            .end((err, res) => {
                if (err) return done(err)
                done()
            });
    })
});

describe("/PUT book :id", () => {
    const book = {
        name: "HP",
        author: "KK",
        year: "1999"
    }
    it('should update book by PUT', done => {
        request(server)
            .put('/book/2')
            .send(book)
                done()
    })
});

describe('/DELETE/:id book', () => {
    it('should delete a book', (done) => {
        request(server)
            .delete('/book/3')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    })
});
 