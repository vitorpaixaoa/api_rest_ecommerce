const router = require("express").Router();

const CategoriaController = require ("../../../controllers/CategoriaController");

const auth = require("../../auth");
const Validation = require("express-validation");
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const { CategoriaValidation } = require("../../../controllers/validacoes/categoriaValidation");
const {LojaValidation} = require("../../../controllers/validacoes/lojaValidation");

const categoriaController = new CategoriaController();
//GET
router.get("/", categoriaController.index);
router.get("/disponiveis",categoriaController.indexDisponiveis);
router.get("/:id", categoriaController.show);
//POST
router.post("/", auth.required, LojaValidation.admin, categoriaController.store);
//PUT
router.put("/:id",auth.required, LojaValidation.admin,categoriaController.update )
//DELETE
router.delete("/:id",auth.required, LojaValidation.admin,categoriaController.remove)

//ROTAS AO PRODUTO 


module.exports = router;