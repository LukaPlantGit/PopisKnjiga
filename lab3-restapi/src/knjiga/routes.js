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

module.exports = router;