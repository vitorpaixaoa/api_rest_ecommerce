const Joi = require("joi");

const PedidoValidation = {
    indexAdmin: {
        query:{
            offset: Joi.number().required(),
            limit: Joi.number().required(),
        }
    },
    showAdmin:{
        params:{
            id: Joi.string().alphanum().length(24).required()
        }
    },
    removeAdmin:{
        params:{
            id: Joi.string().alphanum().length(24).required()
        }
    },
    showCarrinhoPedidoAdmin:{
        params:{
            id: Joi.string().alphanum().length(24).required()
        }
    },

    // CLIENTE
    index: {
        query:{
            offset: Joi.number().required(),
            limit: Joi.number().required(),
            loja: Joi.string().alphanum().length(24).required()
        }
    },
    show:{
        params:{
            id: Joi.string().alphanum().length(24).required()
        }
    },
    remove:{
        params:{
            id: Joi.string().alphanum().length(24).required()
        }
    },
    showCarrinhoPedido:{
        params:{
            id: Joi.string().alphanum().length(24).required()
        }
    },

    store:{
        query:{
            loja: Joi.string().alphanum().length(24).required()
        },
        body:{
            carrinho: Joi.array().items(Joi.object({
                produto:Joi.string().alphanum().length(24).required(),
                variacao:Joi.string().alphanum().length(24).required(),
                precoUnitario: Joi.number().required(), 
                quantidade: Joi.number().required()
            })).required(),
            pagamento: Joi.object({
                forma: Joi.string().required(),
                valor: Joi.number().required()
            }).required(),
            entrega: Joi.object({
                custo: Joi.number().required(),
                tipo: Joi.string().required(),
                prazo: Joi.number().required()
            }).required()
        }
    }

};
module.exports = {PedidoValidation};