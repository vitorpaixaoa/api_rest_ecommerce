const router = require("express").Router();

const ClienteController = require("../../../controllers/ClienteController");
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation")
const { ClienteValidation } = require("../../../controllers/validacoes/clienteValidation")
const Validation = require("express-validation");
const auth = require("../../auth");

const clienteController = new ClienteController();

//AMDMIN
router.get("/", auth.required, LojaValidation.admin, Validation(ClienteValidation.index), clienteController.index); // OK mostrar todos os clientes
router.get("/search/:search/pedidos", auth.required, LojaValidation.admin, clienteController.searchPedidos); // OK procurar um pedido em especifico
router.get("/search/:search", auth.required, LojaValidation.admin,Validation(ClienteValidation.search), clienteController.search); //procurar um cliente em especifico
router.get("/admin/:id", auth.required, LojaValidation.admin,Validation(ClienteValidation.showAdmin), clienteController.showAdmin); //mostrar todos os clientes
router.get("/admin/:id/pedidos", auth.required, LojaValidation.admin, Validation(ClienteValidation.showAdmin), clienteController.showAdmin);//mostrar todos os pedidos

router.put("/admin/:id", auth.required, LojaValidation.admin, Validation(ClienteValidation.updateAdmin), clienteController.updateAdmin); //atualziar dados do cliente

//CLIENTE

router.get("/:id", auth.required, Validation(ClienteValidation.show), clienteController.show);

router.post("/", Validation(ClienteValidation.store), clienteController.store)
router.put("/:id", auth.required, Validation(ClienteValidation.update), clienteController.update)
router.delete("/:id", auth.required, clienteController.remove)

module.exports = router;