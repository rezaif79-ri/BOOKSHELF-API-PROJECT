const {getAllBooksHandler, addBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler} = require('./handler')

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
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler,
    }
];

module.exports = routes;
