# Entrega Final - Curso Backend CoderHosue

## Pasos
1) Instalar dependencias:
````
npm i
````

2) Iniciar servidor
````
npm start
````
<br>

## Opciones CLI

1)"modo": FORK, CLUSET -  Default FORK

  * -m <'FORK/CLUSTER'>

2)"puerto": PORT NUMBER -  Default 8080

  * -p <'PORT NUMBER'>

``````
node server.js -p 3000 -m FORK
``````
``````
npm start -- -p 8081 -m CLUSTER
``````


<br>
<br>

## Rutas

3) Rutas API

    ### `"/"` HOME - ROOT

    * GET `"/"` : Middlewares verificar sesion por token JWT
    * GET `"/productos"` : SSR - HBS || View - Vista de productos / home page
    * GET `"/productos/:categoria?"` : SSR - HBS || View - Vista de productos por categoria
    <br>
    <br>
    
    * GET `"/signup"` : SSR - HBS || View - Vista de registro para nuevos usuarios
    * POST `"/signup"` : SSR - HBS || View - Registrar usuario nuevo - view/form/json
    * GET `"/failsignup"` : SSR - HBS || View - Error al registrar usuarios
    
    <br>
    <br>
    
    * GET `"/login"` : SSR - HBS || View - Vista de login para usuarios en DB
    * POST `"/login"` : SSR - HBS || View - Login usuario en DB - view/form/json
    * GET `"/faillogin"` : SSR - HBS || View - Error en login usuario
    
    <br>
    
    * GET `"/logout"` : SSR - HBS || View - Logout de usuario en sesion, borrado de cookies del sitio

    <br>
    <br>

    ### `"/api/productos"`

    * GET `"/"` : Obtener productos 
    * POST `"/"` : Agregar nuevo producto
    * GET `"/:categoria?"` : Obtener productos por categoria o ID
    * DELETE `"/:id"` : Eliminar productos por ID
    * PUT `"/:id"` : Modificar productos por ID

    <br>
    <br>

    ### `"/api/carrito"`

    * GET `"/"` : Obtener carritos - `requiere permisos de Admin`
    * POST `"/"` : Crear nuevo carrito
    * DELETE `"/:id"` : Eliminar carritos por ID - `requiere permisos de Admin`
    * GET `"/:id/productos"` : Obtener productos en carrito por ID
    * POST `"/:id/productos"` : Agregar productos en carrito por ID
    * DELETE `"/:id/productos"` : Eliminar todos los productos en carrito por ID
    * DELETE `"/:id/productos/:id_prod"` : Eliminar productos por ID, en carrito por ID


    <br>
    <br>

    ### `"/api/mensajes"`

    * GET `"/"` : Obtener mensajes
    * POST `"/"` : Crear nuevo mensaje
    * GET `"/:id"` : Obtener mensaje por ID
    * DELETE `"/:id"` : Eliminar mensaje por ID - `requiere permisos de Admin`

    <br>
    <br>

    ### `"/chat"`

    * GET `"/"` : SSR - HBS || View - Sala de chat general - websockets
    * POST `"/"` : SSR - HBS || View - Sala de chat general - websockets/form/json
    * GET `"/:email"` : SSR - HBS || View - Mensajes en DB por email de usuarios

    <br>
    <br>

    ### `"/user/"`

    * GET `"/"` : SSR - HBS || View - Perfil usuario en DB, sesion activa
    * GET `"/data"` : Obtener data usuario en DB, sesion activa
    * GET `"/carrito"` : SSR - HBS || View - Carrito usuario en DB, sesion activa

    <br>
    <br>

    ### `"/info/"`

    * GET `"/"` : SSR - HBS || Información del servidor - Sesion innecesaria

      <br>
      <br>

    ### `"/options/"`

    * GET `"/"` : SSR - HBS || Información del servidor - Datos sensibles requiere permisos de Admin

      <br>
      <br>


------------
 
### Legacy

``Legacy Graphql`` (Metodos limitados)

* Algunos query o mutations requieren permisos de Admin

* Registrarse o loguearse al sitio

  ``"/login"`` | | ``"/signup"``

  <br>



### RUTA: ``"/graphql"``

 Graphql: ``Query y Mutaciones``
<br>


### Ejemplos:

<br>

*   ``getAllProducts``
```
{
  getAllProducts {
    _id
    nombre
    descripcion
    codigo
    foto
    precio
    stock
    timestamp
  }
}
````

*   ``getProductById``
````
{
 getProductById(id:"<Ingresar un ID>") {
   _id
   nombre
   descripcion
   codigo
   foto
   precio
   stock
   timestamp
 }
}
````


