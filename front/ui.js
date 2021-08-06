const registroForm = document.getElementById("registroForm")

registroForm.addEventListener("submit",e =>{
    e.preventDefault()
    console.log(registroForm['nombre'].value,registroForm['numero'].value);
    App.crearRegistro(registroForm['nombre'].value,registroForm['numero'].value);
});