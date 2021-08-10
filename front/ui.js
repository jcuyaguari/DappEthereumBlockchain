const registroForm = document.getElementById("registroForm")
const search = document.getElementById("search")
const li = document.getElementsByTagName("li")

let caracter = [];
registroForm.addEventListener("submit",e =>{
    e.preventDefault()
    console.log(registroForm['nombre'].value,registroForm['numero'].value);
    App.crearRegistro(registroForm['nombre'].value,registroForm['numero'].value);
});


search.addEventListener("keyup",e=>{
    const search = e.target.value
    console.log(search)
    for (i = 0; i < li.length; i++) {
        if (!li[i].innerHTML.toLowerCase().includes(search)) {
            li[i].style.display="none";
        }
        else {
            li[i].style.display="list-item";                 
        }
    }
});