
const productos = [
    {
        id: 1,
        img: "assets/bandeja1.jpeg",
        nombre: "Bandeja Selva",
        precio: 1200,
    },
    {
        id: 2,
        img: "assets/bandeja2.jpeg",
        nombre: "Bandeja Silver",
        precio: 1500
    },
    {
        id: 3,
        img: "assets/bandeja3.jpeg",
        nombre: "Bandeja Mimbre",
        precio: 1100
    },
    {
        id: 4,
        img: "assets/cesto1.jpeg",
        nombre: "Cesto Hierro",
        precio: 1800
    },
    {
        id: 5,
        img: "assets/cesto2.jpeg",
        nombre: "Cesto Mimbre", 
        precio: 2000
    },
    {
        id: 6,
        img: "assets/cesto3.jpeg",
        nombre: "Cesto Big Hierro", 
        precio: 2300
    },
    {
        id: 7,
        img: "assets/individual1.jpeg",
        nombre: "Indiviual Flower", 
        precio: 890
    },
    {
        id: 8,
        img: "assets/individual2.jpeg",
        nombre: "Indiviual Bali", 
        precio: 920
    },
    {
        id: 9,
        img: "assets/individual3.jpeg",
        nombre: "Indiviual Rectangular", 
        precio: 950
    },
    {
        id: 10,
        img: "assets/espejo1.jpeg",
        nombre: "Espejo Mimbre", 
        precio: 2300
    },
    {
        id: 11,
        img: "assets/canasto1.jpeg",
        nombre: "Canasto Colgante", 
        precio: 2200
    },
    {
        id: 12,
        img: "assets/espejo2.jpeg",
        nombre: "Espejo Yute", 
        precio: 2500
    },
    {
        id: 13,
        img: "assets/jarro1.jpeg",
        nombre: "Jarro Silver", 
        precio: 1300
    },
    {
        id: 14,
        img: "assets/jarro2.jpeg",
        nombre: "Jarro Bronce", 
        precio: 1500
    },
    {
        id: 15,
        img: "assets/jarro5.jpeg",
        nombre: "Jarro Marmol", 
        precio: 1900
    },
    {
        id: 16,
        img: "assets/manta1.jpeg",
        nombre: "Manta Ladrillo", 
        precio: 2400
    },
    {
        id: 18,
        img: "assets/mantel1.jpeg",
        nombre: "Mantel Lino", 
        precio: 2200
    },
    {
        id: 17,
        img: "assets/manta2.jpeg",
        nombre: "Manta Rayas", 
        precio: 2600
    }
]


function buscar(){
    let busqueda = document.querySelector("#buscar-input").value;
    console.log("Buscaste esto: " + busqueda);
}

for(const producto of productos){ 
    if(producto.id < 10){          
        $("#contenedor").append(`<div id="producto-id" class="grid-item">
        <img id="img-prod" src="${producto.img}" alt="${producto.nombre}" class="img">
            <p id="nombre-prod" class="description">${producto.nombre}</p>
            <p id="precio-prod" class="precio-producto"> $ ${producto.precio}</b> <br>
            <button id="btn${producto.id}" class="agregar-carrito">Agregar al carrito</button>
        </div>`);
    }else{
        $("#btn-ver-mas").on("click", function(){
            $("#contenedor").append(`<div id="producto-id" class="grid-item">
            <img id="img-prod" src="${producto.img}" alt="${producto.nombre}" class="img">
                <p id="nombre-prod" class="description">${producto.nombre}</p>
                <p id="precio-prod" class="precio-producto"> $ ${producto.precio}</b> <br>
                <button id="btn${producto.id}" class="agregar-carrito">Agregar al carrito</button>
            </div>`);
            $("#btn-ver-mas").hide();
            $(`#btn${producto.id}`).on('click', function(){
               $('#lista-productos').append(`<div id="item-carrito${producto.id}" class="producto-carrito">
                <img src="${producto.img}" alt="${producto.nombre}" class="foto-carrito">
                <p class="item-carrito">${producto.nombre}</p>
                <p class="item-carrito">$${producto.precio}.-</p>
                <i id="remove-item${producto.id}" class="fas fa-trash-alt"></i>
                </div>`);  
                guardarProductosLocalStorage(producto);
                calcularTotal();
                $(`#remove-item${producto.id}`).on("click", function(){
                    $(`#item-carrito${producto.id}`).hide();
                    eliminarProductoLocalStorage(producto);
                    calcularTotal();
                });
            });
        });
    };

    $(`#btn${producto.id}`).on('click', function(){
     $('#lista-productos').append(`<div id="item-carrito${producto.id}" class="producto-carrito">
        <img src="${producto.img}" alt="${producto.nombre}" class="foto-carrito">
        <p class="item-carrito">${producto.nombre}</p>
        <p class="item-carrito">$${producto.precio}.-</p>
        <i id="remove-item${producto.id}" class="fas fa-trash-alt"></i>
        </div>`);   
        guardarProductosLocalStorage(producto);
        calcularTotal();
        $(`#remove-item${producto.id}`).on("click", function(){
            $(`#item-carrito${producto.id}`).hide();
            eliminarProductoLocalStorage(producto);
            calcularTotal();
        });
    });        
    
    const resultado = document.querySelector("#resultado-total");

    function calcularTotal(){
        let productosLS;
        total = 0;

        productosLS = this.obtenerProductosLocalStorage();

        for(let i = 0; i < productosLS.length; i++){
            let item = Number(productosLS[i].precio);
            total = total + item;
        }
        resultado.textContent = total;
    }

    function guardarProductosLocalStorage(producto){
        let productosCarrito;
        productosCarrito = this.obtenerProductosLocalStorage();
        productosCarrito.push(producto);
        localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));       
    }  

    function obtenerProductosLocalStorage(){
        let productoLS;
        if(localStorage.getItem('productosCarrito') === null){
            productoLS = [];
        }else{
            productoLS = JSON.parse(localStorage.getItem('productosCarrito'));
        }
        return productoLS;        
    }

    function eliminarProductoLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === producto.id){
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem('productosCarrito', JSON.stringify(productosLS));
    }

    document.addEventListener('DOMContentLoaded', eliminarProductoLocalStorage());
    
    let itemsCarrito = document.querySelector("#lista-productos");
    
    function vaciarCarrito(){
        while(itemsCarrito.firstChild){
            itemsCarrito.removeChild(itemsCarrito.firstChild);
        }
        localStorage.clear();
        calcularTotal();
        return false;
    }
};

const btnCarrito = document.querySelector("#carrito-btn");
let modal = document.querySelector("#modal");
let btnNosotros = document.querySelector("#btn-nosotros");
let modalNosotros = document.querySelector("#modal-nosotros");
let volverBtn = document.querySelector("#btn-volver");

btnNosotros.onclick = function(){
    modalNosotros.style.display = "grid";
}

btnCarrito.onclick = function(){
    modal.style.display = "grid";
}

window.onclick = function(e){
    if(e.target == modal || e.target == modalNosotros){
        modal.style.display = "none";
        modalNosotros.style.display = "none";
    }
}

volverBtn.onclick = function(){
    modal.style.display = "none";
}

$(`#cerrar-carrito`).on('click', function(){
    modal.style.display = "none";
});

$(`#cerrar-modal-us`).on('click', function(){
    modalNosotros.style.display = "none";
});

$(".logo").animate({
    height: "0px",
    width: "0px"},
    3000, 
    function(){
        $(".logo").animate({
            height: "40px",
            width: "45px"}
        )
    });