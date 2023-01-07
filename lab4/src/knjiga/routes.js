const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/", controller.getBooks);
router.post("/", controller.addBook);

router.get("/:id", controller.getBookById);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.removeBook);

router.get("/uvez/meki", controller.getMeki);

router.get("/autor/dostojevski", controller.getDostojevski);

router.get("/bestseler/da", controller.getBestseler);

router.get("/docs/openapi", controller.getOpenapi);

//not implemented
router.post("/:id", controller.notImpl);

router.put("/", controller.notImpl);
router.delete("/", controller.notImpl);

router.post("/uvez/meki", controller.notImpl);
router.put("/uvez/meki", controller.notImpl);
router.delete("/uvez/meki", controller.notImpl);

router.post("/autor/dostojevski", controller.notImpl);
router.put("/autor/dostojevski", controller.notImpl);
router.delete("/autor/dostojevski", controller.notImpl);

router.post("/bestseler/da", controller.notImpl);
router.put("/bestseler/da", controller.notImpl);
router.delete("/bestseler/da", controller.notImpl);

router.post("/docs/openapi", controller.notImpl);
router.put("/docs/openapi", controller.notImpl);
router.delete("/docs/openapi", controller.notImpl);

module.exports = router;