const transporter = require("nodemailer").createTransport(require("../config/email"));
const { loja } = require("../config/index");
const moment = require("moment");
const { date } = require("joi");

const _send = ({ subject, emails, message }, cb = null ) =>{
    const mailOptions = {
        from: "no-response@lojati.com",
        to: emails,
        subject,
        html: message
    };
    if( process.env.NODE_ENV === "production"){
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.warn(error);
                if(cb) return cb(error);
            }else{
                if(db) return cb(null, true );
            }
        });
    }else {
        console.log(mailOptions);
        if(cb) return cb(null, true);
    }

};

// NOVO PEDIDO
const enviarNovoPedido = ({ usuario, pedido }) => {
    const message = `
        <h1 style="text-align:center;"> Pedido Recebido </h1>
        <br />
        <p> O pedido realizado hoje, no dia ${moment(pedido.createdAt).format("DD/MM/YYYY")}, foi recebido com sucesso. </p>
        <br />
        <a href="${loja}">Acesse a loja para saber mais.</a>
        <br/><br/>
        <p> Atenciosamente,</p>
        <p> Equipe loja TI </>
    `;
    _send({
        subject: "Pedido recebido.- LOJA TI",
        emails: usuario.email,
        message
    });
}

//PEDIDO CANCELADO
const cancelarPedido = ({ usuario, pedido }) => {
    const message = `
        <h1 style="text-align:center;"> Pedido Cancelado </h1>
        <br />
        <p> O pedido feito hoje, no dia ${moment(pedido.createdAt).format("DD/MM/YYYY")}, foi cancelado. </p>
        <br />
        <a href="${loja}">Acesse a loja para saber mais.</a>
        <br/><br/>
        <p> Atenciosamente,</p>
        <p> Equipe loja TI </>
    `;
    _send({
        subject: "Pedido cancelado.- LOJA TI",
        emails: usuario.email,
        message
    });
}
//ATUALIZAÇÃO DE PAGAMENTO E ENTREGA
const atualizarPedido = ({ usuario, pedido, status, data, tipo }) =>{
    const message = `
        <h1 style="text-align:center;"> Pedido Atualizado </h1>
        <br />
        <p> O pedido realizado no dia ${moment(pedido.createdAt).format("DD/MM/YYYY")}, teve uma atualização. </p>
        <br />
        <p>Nova atualização: ${status} - realizado em ${moment().format("DD/MM/YYYY")} <p/>
        <a href="${loja}">Acesse a loja para saber mais.</a>
        <br/><br/>
        <p> Atenciosamente,</p>
        <p> Equipe loja TI </>
    `;
    _send({
        subject: "Pedido atualizado. - LOJA TI",
        emails: usuario.email,
        message
    });
}

module.exports ={
    enviarNovoPedido,
    cancelarPedido,
    atualizarPedido
}