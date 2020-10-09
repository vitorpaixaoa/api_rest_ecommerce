const router = require("express").Router()

const EntregaController = require("../../../controllers/EntregaController")

const {LojaValidation} = require("../../../controllers/validacoes/lojaValidation")

const auth = require("../../auth")

const entregaController = new EntregaController();


router.get("/:id", auth.required, entregaController.show)
router.put("/:id", auth.required, LojaValidation.admin, entregaController.update)
router.post("/calcualar", entregaController.calcular);

module.exports = router;