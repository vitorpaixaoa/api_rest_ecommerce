const Joi = require("joi");

const EntregaValidation = {
    show:{
        params:{
            id: Joi.string().alphanum().length(24).required()
        },
        query:{
            loja: Joi.string().alphanum().length(24).required()
        }
    },
    update:{
        params:{
            id: Joi.string().alphanum().length(24).required()
        },
        query:{
            loja: Joi.string().alphanum().length(24).required()
        },
        body:{
            status: Joi.string().optional(),
            codigoRastreamento: Joi.string().optional()
        }
    },

    calcular:{
        body:{
            cep: Joi.string().required(),
            carrinho: Joi.array().items(Joi.object({
                produto:Joi.string().alphanum().length(24).required() ,
                variacao:Joi.string().alphanum().length(24).required() ,
                quantidade:  Joi.number().required(),
                precoUnitario: Joi.number().required()
            })).required()
        }
    }
}

module.exports = {EntregaValidation}