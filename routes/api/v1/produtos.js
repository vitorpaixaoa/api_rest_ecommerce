const router = require("express").Router();

const ProdutoController = require("../../../controllers/ProdutoController");

const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const auth = require("../../auth");
const upload = require("../../../config/multer");
const lojaValidation = require("../../../controllers/validacoes/lojaValidation");

const produtoController = new ProdutoController;
/*
---------- ADMIN ------------ 
*/
    router.post("/", auth.required, LojaValidation.admin, produtoController.store);
    router.put("/:id", auth.required, LojaValidation.admin, produtoController.update);
    router.put("/images/:id", auth.required, lojaValidation.admin, upload.array("files", 4),produtoController.updateImages);
    router.delete("/:id", auth.required, lojaValidation.admin, produtoController.remove);

/*
---------- CLIENTE/VISITANTES ----------
*/
    router.get("/".produtoController.index);
    router.get("/disponiveis", produtoController.indexDisponiveis);
    router.get("/search/:search", produtoController.search);
    router.get("/:id", produtoController.show);

/*
---- VARIACOES -------
*/


/*
---------- AVALIACOES ----------
*/



module.exports = router;