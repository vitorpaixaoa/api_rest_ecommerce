const router = require("express").Router();
const auth = require("../../auth");

const {LojaValidation} = require("../../../controllers/validacoes/lojaValidation")
const Validation = require("express-validation")

const LojaController = require("../../../controllers/LojaController");
const lojaController = new LojaController();

router.get("/", lojaController.index);
router.get("/:id", Validation(LojaValidation.show), lojaController.show);

router.post("/", auth.required, Validation(LojaValidation.store),  lojaController.store );
router.put("/:id", auth.required, LojaValidation.admin, Validation(LojaValidation.update),lojaController.update);
router.delete("/:id", auth.required, LojaValidation.admin, lojaController.remove);


module.exports = router;