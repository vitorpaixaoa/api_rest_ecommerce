const router = require("express").Router();
const auth = require("../../auth");
const UsuarioController = require("../../../controllers/UsuarioController");

const Validation = require("express-validation");

const {UsuarioValidation} = require("../../../controllers/validacoes/usuarioValidation")
const usuarioController = new UsuarioController();

router.post("/login", Validation(UsuarioValidation.login), usuarioController.login); //ok
router.post("/registrar", Validation(UsuarioValidation.store), usuarioController.store); // ok 
router.put("/", auth.required, Validation(UsuarioValidation.update), usuarioController.update);//ok
router.delete("/", auth.required, usuarioController.remove);//ok

router.get("/recuperar-senha", usuarioController.showRecovery) //OK
router.post("/recuperar-senha", usuarioController.createRecovery); //OK
router.get("/senha-recuperada", usuarioController.showCompleteRecovery); //OK 
router.post("/senha-recuperada", usuarioController.completeRecovery); //OK

router.get("/", auth.required, usuarioController.index); //ok
router.get("/:id", auth.required,Validation(UsuarioValidation.show), usuarioController.show);//ok

module.exports = router;