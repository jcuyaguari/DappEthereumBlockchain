## Desarrollo de Dapp en Ethereum

Aplicación desarrollada con Ethereum, Ganache, Html y Js.

## Installation

Use Ganache [Link](https://www.trufflesuite.com/ganache) install on Windows or Linux.
```bash
Install NodeJs
```
Windows + R (cmd)
```bash
npm install truffle -g
```
## Create project
- Create a project in VsCode
- Open terminal in Vscode
- Installing truffle, lite-server & bootstrap
```bash
cmd> npm i @truffle/contract
cmd> npm i lite-server bootstrap
```
- Write `truffle init` (Only the first time it's necessary to execute this command)
```bash
cmd> truffle init
```
- Create automatic this files.
```bash
	--> contracts
		-mycontract.sol

	--> migrations
		--> se crea un archivo 2_name.js y se pega lo siguiente:
		const Registro = artifacts.require("RegistroContract");
			module.exports = function (deployer) {
			  deployer.deploy(Registro);
		};

	--> test
       -test.js
```
## Use in cmd

```bash
- truffle deploy //Despliega
- truffle compile //Compila 
- truffle test //Testea
- truffle migrate //Guarda los nuevos cambios en la blockchain
- truffle console //Abre una consola
- truffle --reset //reset el despliegue
```
## Use
```bash
npm run dev
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## 
![image](https://user-images.githubusercontent.com/49213049/129452980-51574bd1-67eb-4784-a862-f920ab602e40.png)


