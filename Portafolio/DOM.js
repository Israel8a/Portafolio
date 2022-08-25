const crearLinea =(nombre,email,asunto, mensaje,id)=>{
const linea  = document.createElement("fieldset")
const contenido =`
<legend class="form__label">perfil</legend>
    <nav class="text">
        <label class="input-label"for="name">Nombre</label>
        <textarea name="name" id="name" class="inputt" type="text">${nombre}</textarea>
        <label class="input-label"for="email">Email</label>
        <textarea name="email" id="email" class="inputt" type="email">${email}</textarea>
    
        <label class="input-label"for="password">Asunto</label>
        <textarea name="password" id="password" class="inputt" type="text" >${asunto}</textarea>
        <label for="">Mensaje</label>
        <textarea type="text" class="inputt">${mensaje}</textarea>
        <button id="${id}">borrar perfil</button>
    </nav>
`
linea.innerHTML=contenido;
const elimiarcliente =(id)=>{
return fetch(`https://israel8a.github.io/Portafolio/Portafolio/db.json/${id}`,{
    method:"DELETE",
})
}
const btn = linea.querySelector("button");

btn.addEventListener("click",(event)=>{event.preventDefault();
    const id = btn.id;
elimiarcliente(id).then(respuesta=>{console.log(respuesta)}).catch(error=>alert("ocurio un error"))
})
return linea
}
const tabla = document.querySelector(".info");

const listaClientes =()=>{
    return fetch("https://israel8a.github.io/Portafolio/Portafolio/db.json").then((respuesta)=>respuesta.json())}
    
listaClientes().then(data=>{
data.forEach(perfil=>{
const nuevalinea = crearLinea(perfil.nombre,perfil.email,perfil.asunto,perfil.mensaje,perfil.id);
tabla.appendChild(nuevalinea)
})
}).catch((error)=>alert("ocurio un error"));
