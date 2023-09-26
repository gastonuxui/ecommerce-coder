class Producto {
    constructor(id, nombre, precio, descripcion, img, alt, cantidad = 1) {

        this.id = id
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.alt = alt;
        this.img = img;


    }
    aumentarCantidad() {
        this.cantidad++
    }

    disminuirCantidad() {
        if (this.cantidad > 1) {
            this.cantidad = this.cantidad - 1
        }

    }

    descripcionCarrito() {
        //Tarjeta de modal
        return `
            <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${this.img}" class="img-fluid rounded-start" alt="${this.alt}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${this.nombre}</h5>
                        <p class="card-text">Cantidad:
                        <button class= "btn btn-primary" id="disminuir-${this.id}"><i class="fa-solid fa-minus"></i></button>
                    
                        ${this.cantidad}
                        <button class= "btn btn-primary" id="aumentar-${this.id}"><i class="fa-solid fa-plus"></i></button>
                        </p>

                        <p class="card-text">Precio:$${this.precio}</p>
                        <button class="btn btn-danger" id="ep-${this.id}">
                        <i class="fa-solid fa-trash "></i>
                    </button>
                    </div>
                </div>
            </div>
        </div> `
    }

    descripcionProducto() {
        return `<div class="card" style="width: 18rem;">
        <img src="${this.img}" alt="${this.alt}">
                <div class="card-body">
                    <h5 class="card-title">${this.nombre}</h5>
                    <p class="card-text">${this.descripcion}</p>
                    <p class="card-text">${this.precio}</p>
                    <button class="btn btn-primary" id="ap-${this.id}">Añadir al carrito</button>
                    <button class="btn" id="verdetalle"></button>
                    
                </div>
            </div > `
    }

    descripcionModal() {
        return ` <section class="modal-descripcion  ">
        <div class="modal__container">
            <div class="contenedor_imagenes_pequeño">
                <img src="/imagenes/image 30.png" alt="">
                <img src="/imagenes/image 32.png" alt="">
                <img src="/imagenes/image 33.png" alt="">
            </div>
                <div  class="modal_img">
                    <img src="/imagenes/imagendescripcion.jpg" alt="">
                </div>
            
            <div class="modal_descripcion_texto">
                
                <h2 class="modal_title">Zapatillas Nike Air Max Sc</h2>
                <p class="modal_paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium eos
                    cumque
                    explicabo perspiciatis consequuntur placeat eligendi illum, possimus dolore animi
                    quod commodi tenetur fugiat ratione.</p>
                <a href="" class="boton_moda l_agregar"> Agregar al carrito</a>
                <a href="" class="boton_modal_verDetalle"> Ver detalle del producto</a>
            </div>
        </div>

    </section>` 
}





}


class GaleriaDeProductos {
     constructor() {
     this.listaProductos = []
                    }


    agregar(producto) {
    this.listaProductos.push(producto)
                    }



                    
                //Cosumir API
                async traerProductosSimulado(){
                    let listaProductosJSON = await fetch ("producto.json")
                    let listaProductoJS = await listaProductosJSON.json()
                
                    listaProductoJS.forEach(producto => {
                    let nuevoProducto= new Producto(producto.id,producto.nombre,producto.precio,producto.descripcion,producto.img, producto.alt,producto.cantidad)
                    this.agregar(nuevoProducto)
                    })
                    this.mostrarEnDom()
                    
                
                    }
                
                
                    mostrarEnDom () {

                        let contenedor_productos = document.getElementById("contenedor_productos")
                
                            this.listaProductos.forEach(producto => {
                         contenedor_productos.innerHTML += producto.descripcionProducto()
                
                                    })
                
                        this.listaProductos.forEach(producto => {
                            const btn_ap = document.getElementById(`ap-${producto.id}`)
                            //Boton
                            btn_ap.addEventListener("click", () => {
                                carrito.agregar(producto)
                                carrito.guardarEnStorage()
                                carrito.mostrarEnDom()
                
                                    Swal.fire({
                                        position: 'top-end',
                                    title: 'Agregaste un producto',
                                    showConfirmButton: false,
                                    showCloseButton: true,
                                    timer: 2000,
                                    customClass: {
                                        popup: "mi-popup-swal",
                
                                    }
                                })
                            })
                        })
                    }



}


class Carro {
     constructor() {
     this.listaCarrito = []
        }
                   
    agregar(productoAgregar) {
            let existe = this.listaCarrito.some(producto => producto.id == productoAgregar.id)
            if (existe) {
            let producto = this.listaCarrito.find(producto => producto.id == productoAgregar.id)
            producto.aumentarCantidad()
            } else {
            if (productoAgregar instanceof Producto) {

                        this.listaCarrito.push(productoAgregar)
                    }
        }

    }

                    eliminar(productoAeliminar) {
                        let indice = this.listaCarrito.findIndex(producto => producto.id == productoAeliminar.id)
                    this.listaCarrito.splice(indice, 1)
    }

                    guardarEnStorage() {
                        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
                    localStorage.setItem("listaCarrito", listaCarritoJSON)
    }
                    recuperarStorage() {
                        
                    let listaCarritoJSON = localStorage.getItem("listaCarrito")
                    let listaCarritoJS = JSON.parse(listaCarritoJSON)
                    let listaAux = []
                    if (listaCarritoJS){
                        listaCarritoJS.forEach(producto => {

                            let nuevoProducto = new Producto(producto.id, producto.nombre, producto.precio, producto.descripcion, 
                            producto.img, producto.alt, producto.cantidad)
                            listaAux.push(nuevoProducto)
                })
                    }
                    this.agregar()
                    this.listaCarrito = listaAux
    }



                    mostrarEnDom() {
                        let contenedor_carrito = document.getElementById("contenedor_carrito")
                    contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
                        contenedor_carrito.innerHTML += producto.descripcionCarrito();

        })



        this.listaCarrito.forEach(producto => {
        const btn_eliminar = document.getElementById(`ep-${producto.id}`)
        btn_eliminar.addEventListener("click", () => {
        this.eliminar(producto)
        this.guardarEnStorage()
        this.mostrarEnDom()

            })

})
                    this.mostrarTotal()
                    this.eventoAumentarCantidad()
                    this.eventoDisminuirCantidad()

    }

                    eventoAumentarCantidad() {
                        this.listaCarrito.forEach(producto => {
                            const btn_aumentar = document.getElementById(`aumentar-${producto.id}`)
                            btn_aumentar.addEventListener("click", () => {
                                producto.aumentarCantidad()
                                this.mostrarEnDom()

                            })
                        })
                    }

                    eventoDisminuirCantidad() {
                        this.listaCarrito.forEach(producto => {
                            const btn_disminuir = document.getElementById(`disminuir-${producto.id}`)
                            btn_disminuir.addEventListener("click", () => {
                                producto.disminuirCantidad()
                                this.mostrarEnDom()
                            })
                        })
                    }


                    vaciarCarrito() {
                        let btn_limpiarCarrito = document.getElementById("btn_limpiarCarrito")
        btn_limpiarCarrito.addEventListener("click", () => {
                        this.listaCarrito = [];
                    this.guardarEnStorage()
                    this.mostrarEnDom()
        });
    }

                    calcularTotal() {
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
    }


                    mostrarTotal() {
        const precio_total = document.getElementById("precio_total")
                    precio_total.innerText = `Precio Total $ ${this.calcularTotal()}`
    }


    finalizarCompra(){
            let botonFianlizar= document.getElementById("botonfinalizar")
            botonFianlizar.addEventListener("click", () => {
                
                this.listaCarrito = [];
                Swal.fire({
                    title: 'Has finalizado la compra exitosamente.',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })

                  this.vaciarCarrito()
                  this.mostrarEnDom()
                    this.guardarEnStorage()
                
                
                

            })

    }




}




const CP = new GaleriaDeProductos()
const carrito = new Carro()
carrito.recuperarStorage()
carrito.mostrarEnDom()


CP.traerProductosSimulado()
carrito.vaciarCarrito()
carrito.finalizarCompra()

