const { response } = require('express');
const pool = require('../../db');
const queries = require('./queries');
const openapi = require('../../openapi.json');

const getBooks = (req, res) => {
    pool.query(queries.getBooks, (error, results) => {
        if(error) {
            res.status(404).send(`{
                "status": "Not Found",
                "message": "There is nothing to fetch here.",
                "response": null
            }`);
        }
        // res.status(200).json(results.rows);
        res.status(200).send(`{
            "status": "OK",
            "message": "Fetched all books",
            "response": {
                ${JSON.stringify(results.rows)}
            }
        }`);
    });
};

const addBook = (req, res) => {
    const { sifraknjige, nazivknjige, nazivautora, bestseler, vrstadjela, likovi, nazivizdavackekuce, uvez, brojstranica, posudjenaod,
        posudjenado, brojpreostalihprimjeraka } = req.body;
    //check if id exists
    pool.query(queries.checkSifraExists, [sifraknjige], (error, results) => {
        if(results.rows.length) {
            res.status(400).send(`{
                "status": "Bad Request",
                "message": "The book with the given ID already exists.",
                "response": null
            }`);
        }

        autor = 0;
        pool.query(queries.checkAuthorExists, [nazivautora], (error, results) => {
            if(results.rows.length) {
                console.log("Autor vec u bazi");
            } else {
                pool.query(queries.addAuthor, [nazivautora], (error, results) => {
                    if(error) throw error;
                    autor = 1;
                });
            }
        });

        // likovi.forEach(element => {
        //     imelika = element.Ime;
        //     prezimelika = element.Prezime;

        //     console.log(imelika + "...." + prezimelika);

        //     pool.query(queries.addSadrzi, [sifraknjige, imelika], (error, results) => {
        //         if(error) throw error;
        //         res.status(201).send("Sadrzi added successfully!");
        //     });
        //     pool.query(queries.checkLikExists, [imelika, prezimelika], (error, results) => {
        //         if(results.rows.length) {
        //             console.log("Lik vec u bazi");
        //         } else {
        //             pool.query(queries.addLik, [imelika, prezimelika], (error, results) => {
        //                 if(error) throw error;
        //                 res.status(201).send("Lik added successfully!");
        //             });   
        //         }
        //     });
        // });

        //add book to db
        pool.query(queries.addBook, [nazivknjige, sifraknjige, brojpreostalihprimjeraka, brojstranica, uvez, posudjenaod,
            posudjenado, bestseler, vrstadjela, nazivautora, nazivizdavackekuce], (error, results) => {
            if(error) {
                res.status(400).send(`{
                    "status": "Bad Request",
                    "message": "Wrong parameters for adding a book.",
                    "response": null
                }`);
            }
            if(autor === 1) {
                res.status(201).send(`{
                    "status": "OK",
                    "message": "Book and author added sucessfully!",
                    "response": null
                }`);
            } else {
                res.status(201).send(`{
                    "status": "OK",
                    "message": "Book added sucessfully!",
                    "response": null
                }`);
            }
        });
    });
};

const getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBookById, [id], (error, results) => {
        if(error) {
            res.status(400).send(`{
                "status": "Bad request",
                "message": "Invalid ID.",
                "response": null
            }`);
        }
        // res.status(200).json(results.rows);
        res.status(200).send(`{
            "status": "OK",
            "message": "Fetched book with the given ID.",
            "response": {
                ${JSON.stringify(results.rows)}
            }
        }`);

        // res.status(404).send(`{
        //     "status": "Not Found",
        //     "message": "Book with the given ID does not exist.",
        //     "response": null
        // }`);
    });
};

const updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const { brojpreostalihprimjeraka, posudjenaod, posudjenado, bestseler } = req.body;

    pool.query(queries.getBookById, [id], (error, results) => {
        const noBookFound = !results.rows.length;
        if(noBookFound) {
            res.status(404).send(`{
                "status": "Not Found",
                "message": "Book with the given ID does not exist.",
                "response": null
            }`);
        }

        pool.query(queries.updateBook, [brojpreostalihprimjeraka, posudjenaod, posudjenado, bestseler, id], (error, results) => {
            if(error) {
                res.status(400).send(`{
                    "status": "Bad Request",
                    "message": "Wrong update parameters.",
                    "response": null
                }`);
            }
            res.status(200).send(`{
                "status": "OK",
                "message": "Book updated successfully",
            }`);
        });
    });
};

const removeBook = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getKnjigaById, [id], (error, results) => {
        const noBookFound = !results.rows.length;
        if(noBookFound) {
            res.status(404).send(`{
                "status": "Not Found",
                "message": "Book with the given ID does not exist.",
                "response": null
            }`);
        }

        pool.query(queries.removeBook, [id], (error, results) => {
            if(error) {
                res.status(400).send(`{
                    "status": "Bad Request",
                    "message": "Invalid ID.",
                    "response": null
                }`);
            }
            res.status(200).send(`{
                "status": "OK",
                "message": "Book removed sucessfully!",
                "response": null
            }`);
        });
    });
};

const getMeki = (req, res) => {
    const meki = "meki";
    pool.query(queries.getMeki, [meki], (error, results) => {
        if(error) {
            res.status(404).send(`{
                "status": "Not Found",
                "message": "Invalid argument.",
                "response": null
            }`);
        }
        // res.status(200).json(results.rows);
        res.status(200).send(`{
            "status": "OK",
            "message": "Fetched books with soft cover.",
            "response": {
                ${JSON.stringify(results.rows)}
            }
        }`);
    });
}

const getDostojevski = (req, res) => {
    const dostojevski = "Fjodor Mihajlovič Dostojevski";
    pool.query(queries.getDostojevski, [dostojevski], (error, results) => {
        if(error) {
            res.status(404).send(`{
                "status": "Not Found",
                "message": "Invalid argument.",
                "response": null
            }`);
        }
        // res.status(200).json(results.rows);
        res.status(200).send(`{
            "status": "OK",
            "message": "Fetched books who's author is Fjodor Mihajlovič Dostojevski.",
            "response": {
                ${JSON.stringify(results.rows)}
            }
        }`);
    });
}

const getBestseler = (req, res) => {
    const bestseler = "da";
    pool.query(queries.getBestseler, [bestseler], (error, results) => {
        if(error) {
            res.status(404).send(`{
                "status": "Not Found",
                "message": "Invalid argument.",
                "response": null
            }`);
        }
        // res.status(200).json(results.rows);
        res.status(200).send(`{
            "status": "OK",
            "message": "Fetched bestsellers.",
            "response": {
                ${JSON.stringify(results.rows)}
            }
        }`);
    });
}

const getOpenapi = (req, res) => {
    // res.status(200).json(openapi);
    res.status(200).send(`{
        "status": "OK",
        "message": "Fetched openapi specification of the API.",
        "response": {
            ${JSON.stringify(openapi)}
        }
    }`);
    res.status(404).send(`{
        "status": "Not Found",
        "message": "There is nothing to fetch here.",
        "response": null
    }`);
}

module.exports = {
    getBooks,
    getBookById,
    addBook,
    removeBook,
    updateBook,
    getMeki,
    getDostojevski,
    getBestseler,
    getOpenapi,
};