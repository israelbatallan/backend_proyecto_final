const calcularPrecioporProducto = async () => {

    const user = await (await fetch('/user/data')).json()
    const userCartId = user.cart[0]
   
    const myCart = await( await fetch(`/api/carrito/${userCartId}/productos`)).json()
    
    let finalTotal = 0;

    for (let index = 0; index < document.getElementsByClassName('this-precio').length; index++) {

        const precio = `Precio unitario: <span class="fw-bold">${myCart[index].precio}</span>`
        const cantidad = `Cantidad: <span class="fw-bold">${myCart[index].cantidad}</span>`
        const total = `Total: <span class="fw-bold">$ ${myCart[index].precio * myCart[index].cantidad}</span>`

        const thisPrecio = document.getElementsByClassName('this-precio').item(index).innerHTML = precio;
        const thisCantidad = document.getElementsByClassName('this-cantidad').item(index).innerHTML = cantidad;
        const thisTotal = document.getElementsByClassName('this-total').item(index).innerHTML = total;
    
        let precioFinal = myCart[index].precio * myCart[index].cantidad;
        finalTotal += precioFinal;

        const btnRemoveprod = `<button class="btn btn-danger fw-bold" onclick="return removeFromThisCart('${myCart[index]._id}', '${userCartId}')">Eliminar</button>`;
        let populateBtnRemoveprod = document.getElementsByClassName('btnEliminar').item(index).innerHTML = btnRemoveprod;
    }

    if(finalTotal !==0) {
        document.getElementById('total-final').innerHTML = `Total final: $ <span class="text-success">${finalTotal}</span>`;
        document.getElementById('vaciar-carrito').innerHTML = `<a onclick="return emptyThisCart('${userCartId}')">Vaciar Carrito</a>`;
    }
};

calcularPrecioporProducto()

const removeFromThisCart = async (productId,cartId) =>{
    
    await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
        headers:{
            'Content-Type': 'application/json'
        },
        method:"DELETE",
    })
    alert("Producto removido del carrito")
    window.location.reload()
};

const emptyThisCart = async (cartId) => {
    await fetch(`/api/carrito/${cartId}/productos`, {
        headers:{
            'Content-Type': 'application/json'
        },
        method:"DELETE",
    })
    alert("Carrito Eliminado")
    window.location.reload()
};