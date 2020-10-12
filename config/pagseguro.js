module.exports ={
    mode: process.env.NODE_ENV === "production" ? "live" : "sandbox",
    sandbox: process.env.NODE_ENV === "production" ? false: true,
    sandbox_email: process.env.NODE_ENV === "production" ? null : "c05512847828114761630@sandbox.pagseguro.com.br",
    email: "vitorpaixaoa.loubi@gmail.com",
    token: "68D778C61895478E9DD3A58611F7D710",
    notificationURL: "",
};