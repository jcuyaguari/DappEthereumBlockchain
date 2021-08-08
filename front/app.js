//Llamar a ganache
App = {
    contracts:{},

    init: async()=>{
        console.log('Cargando..!')
        await App.cargarEthereum()
        await App.loadCuentaUsuario()
        await App.loadContracts()
        App.render()
        await App.renderRegistro()
    },

    //Conecta a ethereum 
    cargarEthereum: async()=>{
        
        if(window.ethereum){
            console.log('Ethereum cargado')
            App.web3Provider = window.ethereum
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        }else if(window.web3){
            web3 = new Web3(window.web3.currentProvider)//Comprueba tambien si puede cargar usando web3
        }
        else{
            console.log('Navegador no Compatible.! Instale Metamask')
        }
    },
    //Carga la cuenta del usuario
    loadCuentaUsuario:async()=>{
        const cuentaUser = await window.ethereum.request({method:'eth_requestAccounts'})
        var web3 = new Web3(window.web3.currentProvider)
        let ether = await web3.eth.getBalance(cuentaUser[0])
        let balance = await web3.utils.fromWei(ether.toString(),'ether')
        document.getElementById('eth').innerText = balance;
        let gasPrice = await web3.eth.getGasPrice();
        document.getElementById('gas').innerText = gasPrice;
        let bloque = await web3.eth.getBlockNumber();
        document.getElementById('bloque').innerText = bloque;
        console.log(cuentaUser,'??',balance,gasPrice,bloque)
        App.account = cuentaUser[0]
    },
    //Cargar Contratos
    loadContracts: async()=>{
        //Se añade primero "./build/contracts" al bs-config para que sea accesible desde el navegador los smartcontracs .json
        const respuesta = await fetch("RegistroContract.json")
        const registroContractJSON = await respuesta.json()//convertimos el json
        //console.log(registroContractJSON)

        //Instalamos antes  npm i @truffle/contract
        App.contracts.registroContract = TruffleContract(registroContractJSON)
        
        //Conecta a metaMask el contrato
        App.contracts.registroContract.setProvider(App.web3Provider)
    
        //Contrato finalmente configurado
        App.registrosContract = await App.contracts.registroContract.deployed()
    },

    //pinta los datos en la interfaz
    render: () =>{
        document.getElementById("account").innerText = App.account
    },

    //C
    renderRegistro: async()=>{
        const registroCounter = await App.registrosContract.registroCounter()
        const registroCounterNumber = registroCounter.toNumber()
        //console.log(registroCounterNumber)

        let html = ''

        for (let i = 1; i <= registroCounterNumber; i++) {
            const registro = await App.registrosContract.registros(i)
            console.log(registro)
            const id = registro[0]
            const titulo = registro[1]
            const descripcion = registro[2]
            const estado = registro[3]
            const fecha = registro[4]

            let registroElement = 
            `
                <li class="card-header bg-dark border-white" rounded-0 mt-1" >
                    <span>${id}</span>
                    <div className="card-header d-flex form-check-inline">
                        <span>${titulo}</span>
                        <div class="card-text text-success form-check form-switch">
                            <input class="form-check-input" type="checkbox" ${estado && "checked"} data-id="${id}" onchange="App.toggleEstado(this)"></input>
                        </div>
                        
                    </div>
                    <div class="card-body bg-dark mt-1" >
                        <p class="text-muted "><span> Número Telf: ${descripcion}</span></p>
                        <p class="text-muted "><span> Estado Guardado Block: ${estado}</span></p>
                    </div>
                    <div class="card-footer bg-transparent border-warning">
                        <p class="text-muted">Registro Creado ${new Date(fecha * 1000)}</p>
                    </div>
                    
                </li>
            `
            html += registroElement;
        }
        document.getElementById('registroList').innerHTML = html;
    },
    //Crear el registro
    crearRegistro: async (nombre, descripcion)=>{
        const resultado = await App.registrosContract.createRegistro(nombre,descripcion,{from:App.account})//pide a metamask la cuenta para guardar.
        //console.log(resultado.logs[0].args)
    },

    toggleEstado: async (obj)=>{
        console.log(obj.dataset.id)
        const id = obj.dataset.id

        await App.registrosContract.actualizarEstado(id,{from:App.account})
        window.location.reload();
    }

};

App.init()