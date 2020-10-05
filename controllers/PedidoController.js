const mongoose = require("mongoose")

const Pedido = mongoose.model("Pedido")
const Produto = mongoose.model("Produto")
const Variacao = mongoose.model("Variacao")
const Pagamento = mongoose.model("Pagamento")
const Entrega = mongoose.model("Entrega")
const Cliente = mongoose.model("Cliente")

//const  CarrinhoValidation  = require ("./validacoes/carrinhoValidation")

class PedidoController {    
    //ADMIN
    async indexAdmin(req,res,next){
        const { offset, limit, loja } = req.query;
        try {
            const pedidos = await Pedido.paginate({loja}, { 
                offset: Number(offset || 0), 
                limit: Number(limit || 30 ), 
                populate:["cliente", "pagamento", "entrega"] 
            });
            pedidos.docs = await Promise.all(pedidos.docs.map(async(pedido) =>{
                pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) =>{
                    item.produto = await Produto.findById(item.produto);
                    item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }))
                return pedido;
            }))
            return res.send({ pedidos })
        } catch (e) {
            next(e)
        }
    }
    
    async showAdmin(req,res,next){
        try {
            const pedido = await Pedido
                                    .findOne({ loja: req.loja, _id: req.params.id })
                                    .populate(["cliente", "pagamento", "entrega"]);
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) =>{
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Variacao.findById(item.variacao);
                return item;
            }));
            return res.send({ pedido });

        } catch (e) {
            next(e)
        }
    }

    async removeAdmin (req,res,next){
        try {
            const pedido = await Pedido.findOne({ loja: req.query.loja, _id: req.params.id})
            if(!pedido) res.status(400).send({ error: "Pedido não encontrado"});
            pedido.cancelado = true;
            
            // REGISTRO DE ATIVIDADES;
            //ENVIAR EMAIL PARA CLIENTE e ADMIN  = pedido cancelado;

            await pedido.save();
            return res.send({ cancelado: true })
        } catch (e) {
            next(e)
        }
    }

    async showCarrinhoPedidoAdmin(req,res,next){
        try {
            const pedido = await Pedido.findOne({ loja: req.loja, _id: req.params.id });
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) =>{
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Variacao.findById(item.variacao);
                return item;
            }));
            return res.send({ carrinho: pedido.carrinho });

        } catch (e) {
            next(e)
        }
    };

    // CLIENTE 
    async index(req,res,next){
        const { offset, limit, loja } = req.query;
        try {
            const cliente = await Cliente.findById({ usuario: req.payload.id });
            const pedidos = await Pedido.paginate(
                { loja, cliente: cliente._id }, 
                { 
                offset: Number(offset || 0), 
                limit: Number(limit || 30 ), 
                populate:["cliente", "pagamento", "entrega"] 
            });
            pedidos.docs = await Promise.all(pedidos.docs.map(async(pedido) =>{
                pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) =>{
                    item.produto = await Produto.findById(item.produto);
                    item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }))
                return pedido;
            }))
            return res.send({ pedidos })
        } catch (e) {
            next(e)
        }
    };
    async show(req,res,next){
        try {
            const cliente = await Cliente.findById({ usuario: req.payload.id });
            const pedido = await Pedido
                                    .findOne({ cliente: cliente._id, _id: req.params.id })
                                    .populate(["cliente", "pagamento", "entrega"]);
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) =>{
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Variacao.findById(item.variacao);
                return item;
            }));
            return res.send({ pedido });

        } catch (e) {
            next(e)
        }
    };
    async store (req,res,next){
        const {  carrinho, pagamento, entrega } = req.body;
        const { loja } = req.query;

        try {
            
            //CHECAR DADOS DO CARRINHO
            //if(!CarrinhoValidation(carrinho)) return res.status(422).send({ error: "Carrinho inválido"})

            //CHECAR DADOS DA ENTREGA
           // if(!EntregaValidation(carrinho, entrega )) return res.status(422).send({ error: "Dados de entrega inválidos"})

            //CHECAR DADOS DO PAGAMENTO
            //if(!PagamentoValidation(carrinho, pagamento )) return res.status(422).send({ error: "Dados de pagamento inválidos"})
            
            const cliente = await Cliente.findOne({ usuario: req.payload._id});

            const novoPagamento = new Pagamento({
                valor: pagamento.valor,
                forma: pagamento.forma,
                status: "Iniciando",
                payload: pagamento,
                loja
            });

            const novaEntrega = new Entrega({
                status: "Não Iniciado",
                custo: entrega.custo,
                prazo: entrega.prazo,
                payload: entrega,
                loja
            });

            const pedido = new Pedido({
                cliente: cliente._id,
                carrinho,
                pagamento: novoPagamento._id,
                entrega: novaEntrega._id,
                loja
            });
            novoPagamento = pedido._id;
            novaEntrega.pedido = pedido._id;

            await pedido.save();
            await novoPagamento.save();
            await novaEntrega.save();

            //notificar via email cliente e admin novo pedido

            return res.send({ pedido: Object.assign({}, pedido, { entrega: novaEntrega, pagamento: novoPagamento, cliente }) })        
        } catch (e) {
            next(e)
        }
    };
    async remove(req,res,next){
        try {
            const cliente = await Cliente.findById({ usuario: req.payload.id });
            if(!cliente) res.status(400).send({ error: "Cliente não encontrado"});
            const pedido = await Pedido.findOne({ cliente: cliente._id, _id: req.params.id})
            if(!pedido) res.status(400).send({ error: "Pedido não encontrado"});
            pedido.cancelado = true;
            
            // REGISTRO DE ATIVIDADES;
            //ENVIAR EMAIL PARA CLIENTE e ADMIN  = pedido cancelado;

            await pedido.save();
            return res.send({ cancelado: true })
        } catch (e) {
            next(e)
        }
    };

    async showCarrinhoPedido(req,res,next){
        try {
            const cliente = await Cliente.findById({ usuario: req.payload.id });
            const pedido = await Pedido.findOne({ cliente: cliente._id, _id: req.params.id });
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) =>{
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Variacao.findById(item.variacao);
                return item;
            }));
            return res.send({ carrinho: pedido.carrinho });

        } catch (e) {
            next(e)
        }
    }; 


}
module.exports = PedidoController;