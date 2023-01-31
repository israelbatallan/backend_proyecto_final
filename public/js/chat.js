const socket = io();

const chat = document.getElementById("enviarMensaje");
const chatAdmin = document.getElementById("enviarMensajeAdmin");
if (chat) {
    chat.addEventListener("submit", async (e) => {
        e.preventDefault();
        const mensaje = {
            email: e.target.email.value,
            type: e.target.type.value,
            text: e.target.text.value,
            date: new Date().toLocaleString(),
        };
        await socket.emit("new-message", mensaje);
        e.target.text.value = "";
    });
};

if (chatAdmin) {
    chatAdmin.addEventListener("submit", async (e) => {
        e.preventDefault();
        const mensaje = {
            email: e.target.email.value,
            type: e.target.type.value,
            text: `Hola <span class="text-primary fw-bold">${e.target.queryEmail.value}</span>. Consulta realizada <span class="text-brown fw-bold">${e.target.queryDate.value}</span>. ${e.target.text.value}`,
            date: new Date().toLocaleString(),
        };
        await socket.emit("new-message", mensaje);
        e.target.text.value = "";
        e.target.queryEmail.value = "";
        e.target.queryDate.value = "";
    });
};

const formatoMesaje = (msj) => {
    const propMensaje = {
        email: msj.email,
        type: msj.type,
        date: msj.date,
        text: msj.text,
    };
    const html = ` <article class="container-fluid border-bottom"> 
                        <span class="text-primary fs-5 fw-bold">${propMensaje.email}</span>
                        <span class="text-muted fs-6 fw-bold">${propMensaje.type}</span>
                        [<span class="text-brown fw-semibold">${propMensaje.date}</span>] :
                        <span class="text-success fst-italic">${propMensaje.text}</span>
                    </article>`;
    return html;
};

const renderMensajes = (msj) => {
    const listaMensajes = msj.map((mensaje) => formatoMesaje(mensaje)).join("");
    if (listaMensajes === "") {
        document.getElementById(
            "messages"
        ).innerHTML = `<div> <p class=" p-2 text-danger fs-3 text-center">No hay mensajes</p> </div>`;
    } else {
        document.getElementById("messages").innerHTML = listaMensajes;
    }
};

socket.on("messages", (msj) => {
    renderMensajes(msj);
});
