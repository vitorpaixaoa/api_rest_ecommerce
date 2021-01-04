module.exports = {
    secret: process.env.NODE_ENV === "production"? process.env.SECRET : "ASDHQKWDHUIASHDIU21UHDW12871EBWDBAS112EI7H12E12E",
    api: process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",
    loja: process.env.NODE_ENV === "production"? "" : "http://localhost:8000"
}