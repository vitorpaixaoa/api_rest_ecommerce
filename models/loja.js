mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const LoajaSchema = mongoose.Schema({
    nome: {type: String, required: true},
    cnpj: { type: String, required: true, unique: true },
    email: { type: String},
    telefones:{
        type: [{ type: String}]
    },
    endereco: {
        type:{
            local: { type: String, required: true},
            numero: { type: String, required: true },
            complemento: { type: String},
            bairro:{ type: String, required: true },
            cidade:{ type: String, required: true },
            cep:{ type: String, required: true }

        },
        required: true
    }
},{timestamps: true});

LoajaSchema.plugin(uniqueValidator, { message: "Já está sendo utilizado"});

module.exports = mongoose.model("Loja",LoajaSchema);