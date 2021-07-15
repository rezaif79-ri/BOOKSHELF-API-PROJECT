const {getAllBooksHandler, addBookHandler, getBookByIdHandler} = require('./handler')

routes = [
    {
        method:'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method:'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method:'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    }
];

module.exports = routes;
