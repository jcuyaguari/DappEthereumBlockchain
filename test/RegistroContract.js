const RegistroContract = artifacts.require("RegistroContract")

contract("RegistroContract",()=>{
    before(async()=>{
        this.registroContract = await RegistroContract.deployed()
    })

    it('migrate deployed successfully', async()=>{
        const address = this.registroContract.address

        assert.notEqual(address,null);
        assert.notEqual(address,undefined);
        assert.notEqual(address,0x0);
        assert.notEqual(address,"");
    })

    it('get Registros List', async()=>{
        const registroCounter = await this.registroContract.registroCounter()
        const register = await this.registroContract.registros(registroCounter)

        assert.equal(register.id.toNumber(),registroCounter);
        assert.equal(register.titulo, "Juan Carlos");
        assert.equal(register.descripcion, "199887699");
        assert.equal(register.done,false);
        assert.equal(registroCounter,1);
    })

    it('registro created successfully',async()=>{
        const result = await this.registroContract.createRegistro("Mercedes","123432123")
        const registroEvent = result.logs[0].args;
        const registrosCounter = await this.registroContract.registroCounter();

        assert.equal(registrosCounter,2);
        assert.equal(registroEvent.id.toNumber(),2);
        assert.equal(registroEvent.titulo,"Mercedes");
        assert.equal(registroEvent.descripcion,"123432123");
        assert.equal(registroEvent.done,false);


    })

    it('registro created successfully',async()=>{
        const result = await this.registroContract.actualizarEstado(1);
        const registroEvento = result.logs[0].args;
        const registro = await this.registroContract.registros(1)

        assert.equal(registro.done,true);
        assert.equal(registroEvento.done,true);
        assert.equal(registroEvento.id,1);
        
    })
})