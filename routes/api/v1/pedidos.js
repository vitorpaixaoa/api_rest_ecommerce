const router = require("express").Router();

const PedidoController = require("../../../controllers/PedidoController")

const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation")
const auth = require("../../auth")

const pedidoController = new PedidoController();

    //ADMIN ******************************************************

    router.get("/admin", auth.required, LojaValidation.admin, pedidoController.indexAdmin);
    router.get("/admin/:id",auth.required, LojaValidation.admin, pedidoController.showAdmin)
    
    router.delete("/admin/:id", auth.required, LojaValidation.admin, pedidoController.removeAdmin)

    // -- /cliente
    router.get("/admin/:id/cliente", auth.required, LojaValidation.admin, pedidoController.showClientePedidosAdmin)
   
    router.get("/admin/:id/carrinho", auth.required, LojaValidation.admin, pedidoController.showCarrinhoPedidoAdmin)
   
    // -- entrega


    // --pagamento 


    
    //CLIENTE *************************************************
    router.get("/", auth.required, pedidoController.index);
    router.get("/:id",auth.required, pedidoController.show)
    
    router.post("/",auth.required, pedidoController.store )
    router.delete("/:id", auth.required, pedidoController.remove)
   
    router.get("/:id/carrinho", auth.required, pedidoController.showCarrinhoPedido)
   
    // -- entrega


    // --pagamento 





module.exports = router;