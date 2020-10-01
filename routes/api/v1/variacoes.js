const router = require("express").Router();

const VariacaoController = require("../../../controllers/VariacaoController")
const { LojaValidation } =require ("../../../controllers/validacoes/lojaValidation")
const auth = require("../../auth")
const upload = require("../../../config/multer")

const variacaoController = new VariacaoController();

router.get("/", variacaoController.index);
router.get("/:id", variacaoController.show);

router.post("/", auth.required, LojaValidation.admin, variacaoController.store );
router.put("/:id", auth.required, LojaValidation.admin, variacaoController.update);
router.put("/images/:id", auth.required, LojaValidation.admin, upload.array("files", 4), variacaoController.updateImages );
router.delete("/:id",auth.required, LojaValidation.admin, variacaoController.remove)




module.exports = router;
