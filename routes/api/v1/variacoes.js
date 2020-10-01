const router = require("express").Router();

const VariacaoController = require("../../../controllers/VariacaoController")
const { LojaValidation } =require ("../../../controllers/validacoes/lojaValidation")
const auth = require("../../auth")
const upload = require("../../../config/multer")
const Validation = require("express-validation");
const { VariacaoValidation } = require("../../../controllers/validacoes/variacaoValidation")

const variacaoController = new VariacaoController();

router.get("/", Validation(VariacaoValidation.index),variacaoController.index);
router.get("/:id",Validation(VariacaoValidation.show), variacaoController.show);

router.post("/", auth.required, LojaValidation.admin, Validation(VariacaoValidation.store), variacaoController.store );
router.put("/:id", auth.required, LojaValidation.admin, Validation(VariacaoValidation.update), variacaoController.update);
router.put("/images/:id", auth.required, LojaValidation.admin, upload.array("files", 4),  Validation(VariacaoValidation.uploadImages),variacaoController.uploadImages );
router.delete("/:id",auth.required, LojaValidation.admin,Validation(VariacaoValidation.remove), variacaoController.remove)




module.exports = router;
