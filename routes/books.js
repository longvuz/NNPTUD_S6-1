
var express = require('express');
var router = express.Router();
var bookModel = require('../schemas/book')



/*
Viết mã nguồn để thực hiện chuôi query với yêu cầu như sau
ngoại trừ các thuộc tính như sort,page,limit 
thì các trường còn lại sẽ check contain
*/
router.get('/', async function (req, res, next) {
    let queries = {};
    let exclude = ["sort", "page", "limit"];
    let arrayString = ["name","author"]
    for (const [key, value] of Object.entries(req.query)) {
        if(!exclude.includes(key)){
            queries[key] = new RegExp(value.replace(',','|'),'i');
        }
    }
    queries.isDeleted = false;
    console.log(queries);
    let limit = req.query.limit ? req.query.limit : 5;
    let page = req.query.page ? req.query.page : 1;
    let sort = {};
    if (req.query.sort) {
        if (req.query.sort.startsWith('-')) {
            sort[req.query.sort.substring(1, req.query.sort.length)] = -1;
        } else {
            sort[req.query.sort] = 1;
        }
    }
    let newqueryName = req.query.name.replace(',', '|');
    var books = await bookModel.find(
        queries)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort)
        .exec();
    res.status(200).send(books);
});

router.get('/:id', async function (req, res, next) {
    try {
        let book = await bookModel.find({ _id: req.params.id }).exec();
        res.status(200).send(book);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.post('/', async function (req, res, next) {
    var newBook = new bookModel({
        name: req.body.name,
        year: req.body.year,
        author: req.body.author
    })
    await newBook.save();
    res.status(200).send(newBook);
});

router.put('/:id', async function (req, res, next) {
    try {
        var book = await bookModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).send(book);
    } catch (error) {
        res.status(404).send(error);
    }

});

router.delete('/:id', async function (req, res, next) {
    try {
        var book = await bookModel.findByIdAndUpdate(req.params.id,
            { isDeleted: true }, {
            new: true
        });
        res.status(200).send(book);
    } catch (error) {
        res.status(404).send(error);
    }
});




module.exports = router;