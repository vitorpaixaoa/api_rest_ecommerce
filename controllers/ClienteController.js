const mongoose = require("mongoose");
const Cliente = mongoose.model("Cliente")
const Usuario = mongoose.model("Usuario")

class ClienteController {
    /*
    *
    * ADMIN
    * 
    */
    //GET /index
    async index(req, res, next ){
        try{
            const offset = Number(req.query.offset) || 0;
            const limit = Number(req.query.limit) || 30;
            const clientes = await Cliente.paginate(
                { loja: req.query.loja},
                {offset, limit, populate: "usuario" }
                );
                return res.send({ clientes })
        }catch(e){
            next(e);
        }
    }

    //GET /search/:search/pedidos
    searchPedidos(req, res, next) {
        return res.status(400).send({ error: "em desenvolvimento." })
    }

    //GET /search/:search
    async search(req, res, next ){
        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 30;
        const search = new RegExp(req.params.search,"i")
        try{
            const clientes = await Cliente.paginate(
                { loja: req.query.loja, nome:{ $regex:search}},
                {offset, limit, populate: "usuario" }
                );
                return res.send({ clientes })
        }catch(e){
            next(e);
        }
    }

    //GET /admin/:id 
    async showAdmin(req, res, next ){
        try {
            const cliente = await Cliente.findOne({ _id: req.params.id, loja: req.query.loja }).populate("usuario");
            return res.send({ cliente });
        } catch (e) {
           next(e) ;
        }
    }
    
    // GET /admin/:id/pedidos
     showPedidosClientes(req, res ,next ){
        return res.status(400).send({ error: "em desenvolvimento." })
    }

    //PUT /admin/:id
    async updateAdmin(req, res, next ){
        const { nome, cpf, email, telefones, endereco, dataDeNascimento} = req.body;
        try {
            const Cliente = await Cliente.findById(req.params.id).populate("usuario");
            if(nome){
                cliente.usuario.nome = nome;
                cliente.nome = nome;
            }
            if(email) cliente.usuario.email = emal;
            if(telefones)cliente.telefones = telefones 
            if(endereco) cliente.endereco = endereco
            if(dataDeNascimento) cliente.dataDeNascimento = dataDeNascimento;
            await cliente.save();
            return res.send({ cliente });
        } catch (e) {
            next(e)
            
        }
    }

    /*
    *
    * CLIENTES
    * 
    */
   async show (req,res,next){
    try {
        const cliente = await Cliente.findOne({ usuario: req.payload.id, loja: req.query.loja }).populate({ path:"usuario", select: "-salt -hash" });
        console.log({ cliente, usuario: req.payload.id })
        return res.send({ cliente });
    }catch(e){
        next(e);
    }
}

   async store (req, res, next ){
       const { nome, email, cpf, telefones, endereco, dataDeNascimento, password  } = req.body;
       const { loja } = req.query;

       const usuario = new Usuario({ nome, email, loja });
       usuario.setSenha(password);
       const cliente = new Cliente({ nome, cpf, telefones, endereco, loja, dataDeNascimento,usuario: usuario._id});
    
       try {
            await usuario.save();
            await cliente.save();
            return res.send({ cliente: Object.assign({}, cliente.doc, { cliente }) });
       } catch (e) {
           next(e)
       }
      
   }

   async update (req, res, next ){
    const { nome, email, cpf, telefones, endereco, dataDeNascimento, password  } = req.body;
    try {
        const cliente = await (await Cliente.findOne({usuario: req.payload.id})).populate('usuario')
        if(!cliente) return res.send({ error: "Cliente não existe"})
            if(nome){
                cliente.usuario.nome = nome;
                cliente.nome = nome;
            }
            if(email) cliente.usuario.email = email;
            if(password) cliente.usuario.setSenha(password);
            if(cpf) cliente.cpf = cpf;
            if(telefones) cliente.telefones = telefones;
            if(endereco) cliente.endereco = endereco;
            if(dataDeNascimento) cliente.dataDeNascimento = dataDeNascimento;
            await cliente.save();
            return res.send({ cliente });
    } catch (e) {
        next(e)
    }
   }

async remove(req, res, next ){
    try {
        const cliente = await (await Cliente.findOne({ usuario: req.payload.id })).populate("usuario");
        await cliente.usuario.remove();
        cliente.deletado = true;
        await cliente.save();
        return res.send({ deletado: true });
    } catch (e) {
        next(e)
    }
}
};

module.exports = ClienteController;