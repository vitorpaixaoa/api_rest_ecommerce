const router = require("express").Router();
const auth = require("../../auth");
const UsuarioController = require("../../../controllers/UsuarioController");

const usuarioController = new UsuarioController();

router.post("/login", usuarioController.login); //ok
router.post("/registrar", usuarioController.store); // ok 
router.put("/", auth.required, usuarioController.update);//ok
router.delete("/", auth.required, usuarioController.remove);//ok

router.get("/recuperar-senha", usuarioController.showRecovery) //OK
router.post("/recuperar-senha", usuarioController.createRecovery); //OK
router.get("/senha-recuperada", usuarioController.showCompleteRecovery); //OK 
router.post("/senha-recuperada", usuarioController.completeRecovery); //OK

router.get("/", auth.required, usuarioController.index); //ok
router.get("/:id", auth.required, usuarioController.show);//ok

module.exports = router;