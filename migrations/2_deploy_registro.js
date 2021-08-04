const Registro = artifacts.require("RegistroContract");

module.exports = function (deployer) {
  deployer.deploy(Registro);
};