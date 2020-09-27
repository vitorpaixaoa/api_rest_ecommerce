const router = require("express").Router();

router.use("/usuarios", require("./usuarios"));
router.use("/lojas", require("./lojas"));
router.use("/clientes", require("./clientes"));

module.exports  = router ;
