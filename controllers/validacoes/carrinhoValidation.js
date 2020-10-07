
const mongoose = require("mongoose")
const Produto = mongoose.model("Produto")
const Variacao = mongoose.model("Variacao")

const getCarrinhoValue = (carrinho) =>{
    let precoTotal = 0;
    let quantidade =0;
    carrinho.array.forEach(item => {
        precoTotal += item.precoUnitario* item.quantidade;
        quantidade += item.quantidade;
    });
    return { precoTotal, quantidade }
};

const getLojaValue = (carrinho) => {
    const results = Promise.all(carrinho.map(async (item) =>{
        const produto = await Produto.findById(item.produto);
        const variacao = await Variacao.findById(item.variacao);
        let preco = 0;
        let qtd = 0;
        if(produto && varaicao && produto.variacao.includes(variacao_id) ){
            let _preco = variacao.promocao || variacao.preco;
            preco = _preco * item.quantidade;
            qtd = item.quantidade;
        }
        return { preco, qtd }
    }));
    let precoTotal = results.reduce((all, item) => all + item.preco, 0  );
    let quantidade = results.reduce((all, item) => all + item.qtd, 0  );
    return {precoTotal, quantidade };
}

function CarrinhoValidation(carrinho) {
    const { precoTotal: PrecoTotalCarrinho, quantidade: quantidadeTotalCarrinho} = getCarrinhoValue(carrinho)
    const {precoTotal: PrecoTotalLoja, quantidade: quantidadeTotalLoja} = getLojaValue(carrinho);
    return precoTotal === PrecoTotalLoja && quantidadeTotalCarrinho === quantidadeTotalLoja;
};

module.exports = CarrinhoValidation;