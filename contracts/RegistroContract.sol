// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RegistroContract {

    uint public registroCounter = 0;

    constructor (){
        createRegistro("Juan Carlos","199887699");
    }

    event RegistroCreated(
        uint id,
        string titulo,
        string descripcion,
        bool done,
        uint createdAt
    );

    event actualizaEstado(
        uint id,
        bool done
    );

    struct Registro{
        uint id;
        string titulo;
        string descripcion;
        bool done;
        uint createdAt;
    }

    mapping (uint256 => Registro) public registros;

    function createRegistro(string memory _titulo, string memory _descripcion)public{
        registroCounter++;
        registros[registroCounter] = Registro(registroCounter,_titulo,_descripcion,false,block.timestamp);//Blocktimestap guarda el tiempo en el q se esta creando la tarea
        //Llamamos al evento
        emit RegistroCreated(registroCounter,_titulo,_descripcion,false,block.timestamp);
    }

    function actualizarEstado(uint _id) public{
        Registro memory _registro = registros[_id];
        _registro.done = !_registro.done;
        registros[_id] = _registro;
        emit actualizaEstado(_id,_registro.done);
    }
}