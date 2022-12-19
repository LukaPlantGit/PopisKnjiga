const getBooks = "SELECT knjiga.sifraknjige, knjiga.nazivknjige, knjiga.nazivautora, knjiga.bestseler, knjiga.vrstadjela, COALESCE(json_agg(json_build_object('Ime', sadrzi.imelika, 'Prezime', lik.prezimelika)) FILTER (WHERE sadrzi.imelika IS NOT NULL), '[]') AS likovi, knjiga.nazivizdavackekuce, knjiga.uvez, knjiga.brojstranica, knjiga.posudjenaod, knjiga.posudjenado, knjiga.brojpreostalihprimjeraka FROM knjiga JOIN sadrzi ON knjiga.sifraknjige = sadrzi.sifraknjige JOIN lik ON sadrzi.imelika = lik.imelika GROUP BY knjiga.sifraknjige";
const getBookById = "SELECT knjiga.sifraknjige, knjiga.nazivknjige, knjiga.nazivautora, knjiga.bestseler, knjiga.vrstadjela, COALESCE(json_agg(json_build_object('Ime', sadrzi.imelika, 'Prezime', lik.prezimelika)) FILTER (WHERE sadrzi.imelika IS NOT NULL), '[]') AS likovi, knjiga.nazivizdavackekuce, knjiga.uvez, knjiga.brojstranica, knjiga.posudjenaod, knjiga.posudjenado, knjiga.brojpreostalihprimjeraka FROM knjiga JOIN sadrzi ON knjiga.sifraknjige = sadrzi.sifraknjige JOIN lik ON sadrzi.imelika = lik.imelika WHERE knjiga.sifraknjige = $1 GROUP BY knjiga.sifraknjige";
const getKnjigaById = "SELECT * FROM knjiga WHERE sifraknjige = $1"

const checkSifraExists = "SELECT k FROM knjiga k WHERE k.sifraknjige = $1";
const checkAuthorExists = "SELECT a FROM autor a WHERE a.nazivautora = $1";
const addAuthor = "INSERT INTO autor (nazivautora) VALUES ($1)";
const addBook = "INSERT INTO knjiga (nazivknjige, sifraknjige, brojpreostalihprimjeraka, brojstranica, uvez, posudjenaod, posudjenado, bestseler, vrstadjela, nazivautora, nazivizdavackekuce) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
const addSadrzi = "INSERT INTO sadrzi (sifraknjige, imelika) VALUES ($1, $2)";
const checkLikExists = "SELECT l FROM lik l WHERE l.imelika = $1 AND l.prezimelika = $2";
const addLik = "INSERT INTO lik (imelika, prezimelika) VALUES ($1, $2)";

const removeBook = "DELETE FROM knjiga WHERE sifraknjige = $1";
const updateBook = "UPDATE knjiga SET brojpreostalihprimjeraka = $1, posudjenaod = $2, posudjenado = $3, bestseler = $4 WHERE sifraknjige = $5";

const getMeki = "SELECT knjiga.sifraknjige, knjiga.nazivknjige, knjiga.nazivautora, knjiga.bestseler, knjiga.vrstadjela, COALESCE(json_agg(json_build_object('Ime', sadrzi.imelika, 'Prezime', lik.prezimelika)) FILTER (WHERE sadrzi.imelika IS NOT NULL), '[]') AS likovi, knjiga.nazivizdavackekuce, knjiga.uvez, knjiga.brojstranica, knjiga.posudjenaod, knjiga.posudjenado, knjiga.brojpreostalihprimjeraka FROM knjiga JOIN sadrzi ON knjiga.sifraknjige = sadrzi.sifraknjige JOIN lik ON sadrzi.imelika = lik.imelika WHERE knjiga.uvez = $1 GROUP BY knjiga.sifraknjige";
const getDostojevski = "SELECT knjiga.sifraknjige, knjiga.nazivknjige, knjiga.nazivautora, knjiga.bestseler, knjiga.vrstadjela, COALESCE(json_agg(json_build_object('Ime', sadrzi.imelika, 'Prezime', lik.prezimelika)) FILTER (WHERE sadrzi.imelika IS NOT NULL), '[]') AS likovi, knjiga.nazivizdavackekuce, knjiga.uvez, knjiga.brojstranica, knjiga.posudjenaod, knjiga.posudjenado, knjiga.brojpreostalihprimjeraka FROM knjiga JOIN sadrzi ON knjiga.sifraknjige = sadrzi.sifraknjige JOIN lik ON sadrzi.imelika = lik.imelika WHERE knjiga.nazivautora = $1 GROUP BY knjiga.sifraknjige";
const getBestseler = "SELECT knjiga.sifraknjige, knjiga.nazivknjige, knjiga.nazivautora, knjiga.bestseler, knjiga.vrstadjela, COALESCE(json_agg(json_build_object('Ime', sadrzi.imelika, 'Prezime', lik.prezimelika)) FILTER (WHERE sadrzi.imelika IS NOT NULL), '[]') AS likovi, knjiga.nazivizdavackekuce, knjiga.uvez, knjiga.brojstranica, knjiga.posudjenaod, knjiga.posudjenado, knjiga.brojpreostalihprimjeraka FROM knjiga JOIN sadrzi ON knjiga.sifraknjige = sadrzi.sifraknjige JOIN lik ON sadrzi.imelika = lik.imelika WHERE knjiga.bestseler = $1 GROUP BY knjiga.sifraknjige";

const getOpenapi = "";

module.exports = {
    getBooks,
    getBookById,
    getKnjigaById,
    checkSifraExists,
    checkAuthorExists,
    checkLikExists,
    addAuthor,
    addBook,
    addSadrzi,
    addLik,
    removeBook,
    updateBook,
    getMeki,
    getDostojevski,
    getBestseler,
    getOpenapi,
};