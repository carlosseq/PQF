//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART_INFO2_URL ="https://japdevdep.github.io/ecommerce-api/cart/654.json"
carrito = {};
let subTotal_Final=0;
document.addEventListener("DOMContentLoaded", function(e){ 

    getJSONData(CART_INFO2_URL).then(function(resultObj){
    if (resultObj.status = "ok") 
    { carrito = resultObj.data;
      mostrarCarrito(carrito);
    }
})

});

function mostrarCarrito(lista){
    let tabla = ``;
    for(let i = 0; i < lista.articles.length; i++){
        let articulo = lista.articles[i];
        if(articulo.currency=="UYU"){
            articulo.currency="USD";
            articulo.unitCost=articulo.unitCost/40;
        }
        tabla +=`

        <div
              class="
                d-flex
                justify-content-between
                align-items-center
                mt-3
                p-2
                items
                rounded
              "
            >
              <div class="d-flex flex-row">
                <img
                  class="rounded"
                  src="${articulo.src}"
                  width="120"
                  height="105"
                />
                <div class="d-flex flex-row align-items-center">
                <div class="ml-2">
                  <span class="font-weight-bold d-block">${articulo.name}</span>
                </div>
            </div>
              </div>
              <div class="d-flex justify-content-between information">
              
                <div class="ml-2">
                    <span class="font-weight-bold d-block">Cantidad</span>
                    <span class="d-block font-weight-bold"><input id="cantidad${i}"type="number" min=0 max=10 value=0 onchange="calSubtotal(${i},${articulo.unitCost});"></span>
                  </div>
                  <div class="ml-2">
                    <span class="font-weight-bold d-block">Precio Unitario</span>
                    <span class="d-block font-weight-bold">${articulo.currency}&nbsp;${articulo.unitCost}</span>
                  </div>
                  <div class="ml-2">
                    <span class="font-weight-bold d-block">Sub total</span>
                    <div class="d-flex justify-content-between information">
                      <span>USD </span><span class="d-block font-weight-bold" id="subtotal${i}">${0}</span>
                    </div>
                   </div>
                
              </div>
            </div>
    `
    document.getElementById("articles-cart").innerHTML = tabla;
    document.getElementById("cant-prod-cart").innerText = "Hay "+lista.articles.length+" articulos en su carrito";
    }
    
      

}      
function calSubtotal(indice,precio){   

   
      cantidad=document.getElementById("cantidad"+indice).value;
      
      subtotal = precio * cantidad;
      document.getElementById("subtotal"+indice).innerHTML= subtotal;
  
      calcCostoEnvio()
     
  }
  
  function calcCostoEnvio(){
    let total_Final=0;
    let subTotal_Final=0;
    let costoEnvio=0
    for (let index = 0; index < carrito.articles.length; index++) {
      subTotal_Final += parseFloat(document.getElementById("subtotal"+index).innerHTML)  
    }
    document.getElementById("subTotal-final").innerText ="USD "+ subTotal_Final.toFixed(2)
  
    let envio = document.getElementsByName("card");
      if(envio[0].checked){
        costoEnvio=(subTotal_Final*0.15).toFixed(2)
        document.getElementById("costo-envio").innerText="USD "+ costoEnvio
      }
      if(envio[1].checked){
        costoEnvio = (subTotal_Final*0.07).toFixed(2)
        document.getElementById("costo-envio").innerText="USD "+ costoEnvio
      }if(envio[2].checked){
        costoEnvio = (subTotal_Final*0.05).toFixed(2)
        document.getElementById("costo-envio").innerText="USD "+ costoEnvio
      }
      total_Final = (parseFloat(subTotal_Final)+parseFloat(costoEnvio)).toFixed(2);
      document.getElementById("total-cost").innerText="USD "+ total_Final;
  }
  