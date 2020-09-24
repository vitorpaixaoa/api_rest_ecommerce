const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const enviarEmailRecovery = require("../helpers/email-recovery");

class UsuarioController {


    //GET
    index(req, res, next ){
        Usuario.findById(req.payload.id).then(usuario =>{
            if(!usuario) return res.status(401).json({ errors: "Usuario não registrado "});
            return res.json({ usuario: usuario.enviarAuthJSON() });
        }).catch(next);
    }

    //GET /:id
    show(req, res, next ){
        Usuario.findById(req.parms.id).then(usuario => {
            if(!usuario) return res.status(401).json({ errors: "Usuario não registrado "});
            return res.json({
                usuario: {
                    nome: usuario.nome,
                    email: usuario.email,
                    permissao: usuario.permissao,
                    loja: usuario.loja
                }
            });
        }).catch(next);
    
    }

    // POST /registrar
    store( req, res, next ){
        const { nome, email, password } = req.body;

        if(!nome || !email || !password ) return res.status(422).json({errors: "Preencha todos os campos de cadastro"});

        const usuario = new Usuario({ nome, email });
        usuario.setSenha(password);
        usuario.save()
        .then(() => res.json ({ usuario: usuario.enviarAuthJSON }))
        .catch(next);
    }

    //UPDATE /
    update ( req, res, next ){
        const { nome, email, password } = req.body;
        Usuario.findById(req.payload.id).then((usuario) => {
            if(!usuario) return res.status(401).json({ errors: "Usuario não registrado "});
            if(typeof nome !== "undefined") usuario.nome = nome;
            if(typeof email !== "undefined") usuario.email = email;
            if(typeof password !== "undefined") usuario.setSenha(password);

            return usuario.save().then(() =>{
                return res.json({ usuario: usuario.enviarAuthJSON() });
            }).catch(next);
        }).catch(next);
    }

    //DELETE /
    remove(req, res, next ){
        Usuario.findById(req.payload.id).then(usuario => {
            if(!usuario) return res.status(401).json({ errors: "Usuario não registrado "});
            return usuario.remove().then(() =>{
                return res.json({ deletado: true })
            }).catch(next)
        }).catch(next);
    }

    //POST /login
    login(req, res , next ) {
        const {email, password} = req.body;
        if(!email) return res.status(422).json({ errors: { email: "Não pode ficar vazio" }});
        if(!password) return res.status(422).json({ errors: { password: "Não pode ficar vazio" }});
        Usuario.findOne({ email }).then((usuario) => {
            if(!usuario) return res.status(401).json({ errors: "Usuario não registrado "});
            if(!usuario.validarSenha(password)) return res.status(401).json({ errors: "Senha inválida "});
            return res.json({ usuario: usuario.enviarAuthJSON() });
        }).catch(next)
    }

    //RECOVERY 

    //GET /recuperar senha
    showRecovery(req, res, next ){
        return res.render('recovery', {error: null, success: null });

    };

    //POST /recuperar-senha
    createRecovery ( req, res, next ){
        const { email } = req.body;
        if(!email) return res.render('recovery',{ error: "Preencha com seu email ", success: null })
        
        Usuario.findOne({ email }).then((usuario) =>{
            if(!usuario) return res.render("Recovery", { error: "Não existe usuario com este email", success: null });
            const recpveryData = usuario.criarTokenRecuperacaoSenha();
            return usuario.save(()=>{
                return res.render("recovery", {error: null, success: true });
            }).catch(next);
        }).catch(next)
    }
    
    //GET /senha-recuperada
    showCompleteRecovery(req, res, next ){
        if(!req.query.token) return res.render("recovery",{ error: "Token não identificado", success: null } );
        Usuario.findOne({ "recovery.token": req.query.token }).then(usuario =>{
            if(!usuario) return res.render("Recovery", { error: "Não existe usuario com este token", success: null });
            if( new Date(usuario.recovery.date) < new Date() ) return res.render("recovery", { error: "Token expirado, tente novamente", success: null });
            return res.render("recovery/store", { error: null, success: nullm, token: req.query.token });
        }).catch(next);

        
    }

    //POST /senha-recuperada
    completRecovery( req, res, next ){
        const { token, password } = req.body;
        if(!token || !password) return res.render("recovery/store",{ error: "Preencha novamente com a nova senha", success: null });
        Usuario.findOne({ "recovery.token" : token }).then(usuario =>{
            if(!usuario) return res.render("recovery", {error: "Usuario não identificado", success: null });

            usuario.finalizarTokenRecuperacaoSenha();
            usuario.setSenha(password);
            return usuario.save().then(() =>{
                return res.render("recovery/store",{
                    error: null,
                    success:"Senha alterada com sucesso. Tente fazer login novamente",
                    token: null
                })
            }).catch(next);
        })

    }
}