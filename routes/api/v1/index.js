const router = require("express").Router();

router.use("/usuarios", require("./usuarios"));
router.use("/lojas", require("./lojas"));
router.use("/clientes", require("./clientes"));
router.use("/categorias", require("./categorias"));
router.use("/produtos", require("./produtos"));
router.use("/avaliacoes", require("./avaliacoes"));
module.exports  = router ;
