const {nanoid} = require('nanoid');
const Books = require('./books');



async function getAllBooksHandler(request,h){

    // JIKA TERDAPAT NAME PADA PARAMETER QUERY
    const queryName = request.query.name;
    let isExist = Books.filter((book) => book.name === queryName).length > 0;
    
    if(queryName){
        const queryBooks = Books.filter((b) => b.name.toLowerCase().includes(queryName.toLowerCase()));
        const books = [];

        queryBooks.forEach(function(obj){
            const row = {
                'id':obj.id,
                'name':obj.name,
                'publisher':obj.publisher,
                
            };
            books.push(row); 
        });

        const response = h.response({
            status: 'success',
            data:{
                books,
            }
        });

        response.code(200);
        return response;
    }

    // JIKA TERDAPAT READING PADA PARAMETER QUERY
    const queryReading = request.query.reading;
    
    if(queryReading){
        isExist = Books.filter((book) => book.reading == queryReading).length > 0;
        if(isExist){
            const queryBooks = Books.filter((book) => book.reading == queryReading);
            const books = [];

            queryBooks.forEach(function(obj){
                const row = {
                    'id':obj.id,
                    'name':obj.name,
                    'publisher':obj.publisher, 
                };
                books.push(row); 
            });

            const response = h.response({
                status: 'success',
                data:{
                    books,
                }
            });

            response.code(200);
            return response;
        }
        
    }
    
    // JIKA TERDAPAT FINISHED PADA PARAMETER QUERY
    const queryFinished = request.query.finished;
     
    if(queryFinished){
        isExist = Books.filter((book) => book.finished == queryFinished).length > 0;
        
        if(isExist){
            const queryBooks = Books.filter((book) => book.finished == queryFinished);
            const books = [];

            queryBooks.forEach(function(obj){
                const row = {
                    'id':obj.id,
                    'name':obj.name,
                    'publisher':obj.publisher, 
                };
                books.push(row); 
            });

            const response = h.response({
                status: 'success',
                data:{
                    books,
                }
            });

            response.code(200);
            return response;
        }
    }
    

    const getBook = [];
    Books.forEach(function(obj){
        const row = {
            'id':obj.id,
            'name':obj.name,
            'publisher':obj.publisher,
            
        };
        getBook.push(row); 
    });

    const response = h.response({
        status: "success",
        data:{
            "books": getBook, 
        } 
    });
    response.code(200);
    return response;
};

function addBookHandler(request, h){
    const { name="", year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };


    if (name === "") {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;

    }else if (readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }else{
        Books.push(newBook);
        const isSuccess = Books.filter((book) => book.id === id).length > 0;
        if (isSuccess) {
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                  bookId: id,
                },
              });
              
              response.code(201);
              return response;
        }
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal ditambahkan',
        });
        
        response.code(500);
        return response;        
    }

  
};

function getBookByIdHandler(request, h){
    const {bookId} = request.params;
    const book = Books.filter((b) => b.id === bookId)[0];
    
    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);

        return response;
    }
     
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
}

function editBookByIdHandler(request, h){
    const {bookId} = request.params;
    
    const { name="", year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();
    const finished = pageCount === readPage;

    const index = Books.findIndex((book) => book.id === bookId);

    if(name === ""){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });

        response.code(400);
        return response;

    }else if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });

        response.code(400);
        return response;

    }else if(index !== -1){
        Books[index] = {
            ...Books[index],
            name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            reading,
            finished,
            updatedAt            
        }
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
    
        response.code(200);
        return response;
    }else{
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
    
        response.code(404);
        return response;
    }    
}

function deleteBookByIdHandler(request, h){
    const { bookId } = request.params;
    const index = Books.findIndex((book) => book.id === bookId);

    if(index !== -1){
        Books.splice(index,1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });

        response.code(200);
        return response;

    }else{
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });

        response.code(404);
        return response;
    }
}



module.exports = { getAllBooksHandler, addBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };