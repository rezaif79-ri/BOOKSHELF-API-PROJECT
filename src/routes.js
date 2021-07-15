const {getAllBooksHandler} = require('./handler')

routes = [
    {
        method:'GET',
        path: '/books',
        handler: getAllBooksHandler,
    }
];

module.exports = routes;
