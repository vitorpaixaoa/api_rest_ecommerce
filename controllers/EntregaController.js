const mongoose = require("mongoose")
const Entrega = mongoose.model("Entrega")
const Produto = mongoose.model("Produto")
const Pedido = mongoose.model("Pedido")
const Variacao = mongoose.model("Variacao")
const RegistroPedido = mongoose.model("RegistroPedido")
const {calcularFrete} = require("./integracoes/correios")

const EmailController = require("./EmailCotroller")


class EntregaController  {
    async show (req,res,next){
        try {
            const entrega = await Entrega.findOne({ _id: req.params.id, loja: req.query.loja });
            const registros = await RegistroPedido.find({ pedido: entrega.pedido, tipo: "entrega" });
            return res.send({ entrega,registros });
        }catch(e){
            next(e);
        }
    }

    //PUT />id
    async update(req,res,next){
        const { status, codigoRastreamento} = req.body;
        const {loja} = req.query;
        try {
            const entrega = await Entrega.findOne({ loja, _id: req.params.id});
            if(status) entrega.status = status;
            if(codigoRastreamento) entrega.codigoRastreamento = codigoRastreamento;
            
            const registroPedido = new RegistroPedido({
                pedido: entrega.pedido,
                tipo: "entrega",
                situacao: status,
                payload: req.body
            });
            await registroPedido.save()
            // enviar email de aviso para o cliente.
            const pedido = await Pedido.findById(pagamento.pedido).populate({ path:"cliente", populate:"usuario" });
            EmailController.atualizarPedido({ 
                usuario: pedido.cliente.usuario, 
                pedido, 
                tipo:"entrega",
                status: status,
                data: new Date()
            });

            await entrega.save()
            return res.send({ entrega })
        } catch (e) {
            next(e)
        }
    }

    //post /calcular
    async calcular(req, res, next ){
        const { cep, carrinho} = req.body;
        try {
            const _carrinho = await Promise.all(carrinho.map(async (item) =>{
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Variacao.findById(item.variacao);
                return item;

            }));
            console.log(_carrinho)
            const resultados = await calcularFrete({cep, produtos: _carrinho});
            return res.send({ resultados }); 
        } catch (e) {
            next(e)
        }
    }

}

module.exports = EntregaController;