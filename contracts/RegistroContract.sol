// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RegistroContract {

    uint public registroCounter = 0;

    constructor () public{
        createRegistro("Juan Carlos","199887699");
    }

    struct Registro{
        uint id;
        string titulo;
        string descripcion;
        bool done;
        uint createdAt;
    }

    mapping (uint256 => Registro) public registros;

    function createRegistro(string memory _titulo, string memory _descripcion)public{
        registros[registroCounter] = Registro(registroCounter,_titulo,_descripcion,false,block.timestamp);//Blocktimestap guarda el tiempo en el q se esta creando la tarea
        registroCounter++;
    }

    function actualizarEstado(uint _id) public{
        Registro memory _registro = registros[_id];
        _registro.done = !_registro.done;
        registros[_id] = _registro;
    }
}