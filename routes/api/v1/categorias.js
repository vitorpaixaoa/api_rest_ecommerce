const router = require("express").Router();

const CategoriaController = require ("../../../controllers/CategoriaController");

const auth = require("../../auth");
const Validation = require("express-validation");
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const { CategoriaValidation } = require("../../../controllers/validacoes/categoriaValidation");

const categoriaController = new CategoriaController();
//GET
router.get("/", Validation(CategoriaValidation.index), categoriaController.index);
router.get("/disponiveis",Validation(CategoriaValidation.indexDisponiveis),categoriaController.indexDisponiveis);
router.get("/:id", Validation(CategoriaValidation.show), categoriaController.show);
//POST
router.post("/", auth.required, LojaValidation.admin, Validation(CategoriaValidation.store), categoriaController.store);
//PUT
router.put("/:id",auth.required, LojaValidation.admin, Validation(CategoriaValidation.update),categoriaController.update )
//DELETE
router.delete("/:id",auth.required, LojaValidation.admin, Validation(CategoriaValidation.remove),categoriaController.remove)

//ROTAS AO PRODUTO 


module.exports = router;