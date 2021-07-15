const {getAllBooksHandler, addBookHandler} = require('./handler')

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
    }
];

module.exports = routes;
