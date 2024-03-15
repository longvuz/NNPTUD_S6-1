
var express = require('express');
var router = express.Router();

function GenID(num) {
    let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789";
    var result = "";
    for (let index = 0; index < num; index++) {
        var rand = parseInt(Math.random() * 61);
        result += source[rand];
    }
    return result;
}

var books = [{
    id: 1,
    name: "toan lop 1"
}, {
    id: 2,
    name: "tieng viet lop 1"
}, {
    id: 3,
    name: "dao duc lop 1"
}]

//localhost:3000/api/v1/books
/* GET users listing. */
router.get('/', function (req, res, next) {
    var remainbooks = books.filter(book => !book.isDeleted);
    res.status(200).send(remainbooks);
});

// Sử dụng các hàm build in của Array
//  để tìm ra quyển sách có id là req.param.id
//+0.5
//localhost:3000/api/v1/books/1
router.get('/:id', function (req, res, next) {
    let book = books.find(book => book.id == req.params.id);
    if (book) {
        res.status(200).send(book);
    } else {
        res.status(404).send("ID khong ton tai");
    }
});

router.post('/', function (req, res, next) {
    let book = books.find(book => book.id == req.body.id);
    if (book) {
        res.status(404).send("ID da ton tai");
    } else {
        let newbook = {
            id: GenID(16),
            name: req.body.name
        }
        books.push(newbook);
        res.status(200).send(newbook);
    }
});

router.put('/:id', function (req, res, next) {
    let book = books.find(book => book.id == req.params.id);
    if (book) {
        book.name = req.body.name;
        res.status(200).send(book);
    } else {
        res.status(404).send("ID khong ton tai");
    }
});

router.delete('/:id', function (req, res, next) {
    let book = books.find(book => book.id == req.params.id);
    if (book) {
        // var index = books.indexOf(book);
        // books.splice(index,1);
        book.isDeleted = true;
        res.status(200).send("xoa thanh cong");
    } else {
        res.status(404).send("ID khong ton tai");
    }
});




module.exports = router;