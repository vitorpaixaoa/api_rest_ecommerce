module.exports = {
    secret: process.env.NODE_ENV === "production"? process.env.SECRET : "ASDHQKWDHUIASHDIU21UHDW12871EBWDBAS112EI7H12E12E",
    api: process.env.NODE_ENV === "production" ? "http://api.lojateste.ampliee.com" : "http://localhost:3000",
    loja: process.env.NODE_ENV === "production"? "http://lojateste.ampliee.com" : "http://localhost:8000"
}