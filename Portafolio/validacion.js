const inputs = document.querySelectorAll("#input");
inputs.forEach(input=>{
    input.addEventListener("blur",input=>{
        validacion(input.target)
    })
})
function validacion(input){
    
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML=monstrarMensajeError(tipoDeInput,input);
    }
}
function monstrarMensajeError(tipoDeInput,input){
    let mensaje = "";
    tipoDeErrores.forEach(error=>{
        if(input.validity[error]){
            //console.log(tipoDeInput);
            //console.log(input.validity[error]);
            //console.log(mensajeDeErrores[tipoDeInput][error]);
            mensaje = mensajeDeErrores[tipoDeInput][error]
        }
    })
    return mensaje;
}
const tipoDeErrores=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
]
const  mensajeDeErrores={
    Nombre:{
        valueMissing:"Este campo no puede estar vació",
    },
    Email:{
        valueMissing:"Este campo no puede estar vació",
        typeMismatch:"El correo no es valido, eje:texto@texto.com",
    },
    Asunto:{
        valueMissing:"Este campo no puede estar vació",
        patternMismatch:"debe tener de 10 a 50 caracteres",
    },
    
}
const validadores={
    nacimiento: (input) =>validarNacimiento(input),
}
function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!MayordeEdad(fechaCliente)){
        mensaje ="Al menos debes tener 18 años";
    }
    input.setCustomValidity(mensaje);
}
function MayordeEdad (fecha){
    const fechaActual = new Date();
    const diferenciaFecha =new Date(fecha.getUTCFullYear()+18,fecha.getUTCMonth(),fecha.getUTCDate());
    return diferenciaFecha<=fechaActual;
}
const btn = document.querySelector(".formcontato__botao");

btn.addEventListener("click",(event)=>{
    const nombre = document.querySelector(".formcontato__input").value;
    const email = document.querySelector(".email").value;
    const asunto = document.querySelector(".asunto").value;
    const mensaje = document.querySelector(".text").value;
    if(nombre&& email && asunto&& mensaje){
        console.log(nombre+ email+ asunto+mensaje)
        event.preventDefault();
        crearCliente(nombre,email,asunto,mensaje).then(respuesta=>{
            window.location.href = "registros-js-css/registro-exitoso/registrado.html";
        }).catch(error=>{console.log(error)}) 
    }
});
const crearCliente =(nombre,email,asunto,mensaje,id)=>{
    return fetch("https://israel8a.github.io/Portafolio/Portafolio/db.json",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
        },
        body:JSON.stringify({nombre,email,asunto,mensaje,id:uuid.v4()})
    });
};

