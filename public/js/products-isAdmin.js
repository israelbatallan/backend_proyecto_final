const ingresoProducto = document.getElementById("ingresarProducto");

ingresoProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const producto = {
        timestamp: new Date().toISOString(),
        nombre: e.target.nombre.value,
        descripcion : e.target.descripcion.value,
        precio : e.target.precio.value,
        foto : e.target.foto.value,
        codigo: Date.now(),
        stock : e.target.stock.value || 200,
        categoria: e.target.categoria.value
    };

    socket.emit("agregarProducto", producto);
    e.target.nombre.value = "";
    e.target.precio.value = "";
    e.target.foto.value = "";
    e.target.stock.value = "";
    e.target.categoria.value = "";
    e.target.descripcion.value = "";
});
