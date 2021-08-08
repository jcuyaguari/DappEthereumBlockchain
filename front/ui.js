const registroForm = document.getElementById("registroForm")
const search = document.getElementById("search")
let caracter = [];
registroForm.addEventListener("submit",e =>{
    e.preventDefault()
    console.log(registroForm['nombre'].value,registroForm['numero'].value);
    App.crearRegistro(registroForm['nombre'].value,registroForm['numero'].value);
});

search.addEventListener("keyup",e=>{

    const search = e.target.value
    console.log(search)
    const filC = caracter.filter((character)=>{
        console.log(filC)
       return character.name.includes(search) || character.house.includes(search)
    });
    console.log('Champion',filC)
})