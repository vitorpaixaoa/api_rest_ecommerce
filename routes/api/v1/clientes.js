const router = require("express").Router();

const ClienteController = require("../../../controllers/ClienteController");
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation")
const { ClienteValidation } = require("../../../controllers/validacoes/clienteValidation")
const Validation = require("express-validation");
const auth = require("../../auth");

const clienteController = new ClienteController();

//AMDMIN
router.get("/", auth.required, LojaValidation.admin, clienteController.index); //mostrar todos os clientes
//router.get("/search/:search/pedidos", auth.required, LojaValidation.admin, clienteController.searchPedidos); //procurar um pedido em especifico
router.get("/search/:search", auth.required, LojaValidation.admin, clienteController.search); //procurar um cliente em especifico
router.get("/admin/:id", auth.required, LojaValidation.admin, clienteController.showAdmin); //mostrar todos os clientes
//router.get("/admin/:id/pedidos", auth.required, LojaValidation.admin, clienteController.showPedidos);//mostrar todos os pedidos

router.put("/admin/:id", auth.required, LojaValidation.admin, clienteController.updateAdmin); //atualziar dados do cliente

//CLIENTE

router.get("/", auth.required, clienteController.show)

router.post("/", clienteController.store)
router.put("/:id", auth.required, clienteController.update)
router.delete("/", auth.required, clienteController.remove)

module.exports = router;