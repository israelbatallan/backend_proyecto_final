const socket = io();

const listaDeProductos = async (productos) => {
    const fetchProd = fetch('../views/productos.hbs')
        .then((res) => res.text())
        .then((view) => {
            const template = Handlebars.compile(view);
            const html = template({ productos });
            return html;
        })
        .then((html) => html);
  
    btnsAddToCartandRemoveFromCart(); // await for Hanblebars view

    return fetchProd;
};

socket.on("productos", (productos) => {
    listaDeProductos(productos).then((html) => {
        document.getElementById("productos").innerHTML = html;
    });
});

const addToCart = async (productId,cartId) =>{

    await fetch(`/api/carrito/${cartId}/productos`, {
        headers:{
            'Content-Type': 'application/json'
        },
        method:"POST",
        body: JSON.stringify({
            id_prod: productId
        })
    })
    alert("Producto Agregado Correctamente")
};

const removeFromCart = async (productId,cartId) =>{
    
    await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
        headers:{
            'Content-Type': 'application/json'
        },
        method:"DELETE",
    })
    alert("Producto removido del carrito")
};

const btnsAddToCartandRemoveFromCart = async () =>{
    const userCart = await (await fetch('/user/data')).json()
    const userCartId = userCart.cart[0]

    const listProd = await (await fetch(`/api${window.location.pathname}`)).json()

    for (let index = 0; index < document.getElementsByClassName('btnComprar').length; index++) {
        const btnAddprod = `<button class="btn btn-primary fw-bold" onclick="return addToCart('${listProd[index]._id}', '${userCartId}')">Add</button>`;
        let populateBtnAddprod = document.getElementsByClassName('btnComprar').item(index).innerHTML = btnAddprod;

        const btnRemoveprod = `<button class="btn btn-danger fw-bold" onclick="return removeFromCart('${listProd[index]._id}', '${userCartId}')">Eliminar</button>`;
        let populateBtnRemoveprod = document.getElementsByClassName('btnEliminar').item(index).innerHTML = btnRemoveprod;
    };
};




const btnLogout = () => {
    const logoutBtn = document.getElementById('btnLogout');
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logoutBtn.classList.add('disabled');
        e.target.removeEventListener("click", btnLogout);
        logoutBtn.innerHTML = `Cerrando sesión <span class="spinner-border spinner-border-sm"></span>`;
        window.location.href = "/logout";
    });

};
btnLogout();

