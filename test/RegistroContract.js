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
        const registroCounter = this.registroContract.registroCounter()
    })
})