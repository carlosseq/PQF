//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART_INFO2_URL ="https://japdevdep.github.io/ecommerce-api/cart/654.json"
carrito = {};
let subTotal_Final=0;
articulos= {};
articles= {};
document.addEventListener("DOMContentLoaded", function(e){ 

    getJSONData(CART_INFO2_URL).then(function(resultObj){
    if (resultObj.status = "ok") 
    { carrito = resultObj.data;
      mostrarCarrito(carrito);
      methodPay();
      
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
                   <!-- Sacar del carrito -->
                   <td style="vertical-align: middle;">
                   <button type="button" onclick="limpiarCarrito(articulos, ${i});" class="btn btn-primary float-right" data-toggle="tooltip" title="Eliminar artículo" style="background: linear-gradient(to right, #ec9ca7, #d33a57); border-color: #d33a57"><i class="fa fa-times" aria-hidden="true"></i>
                   </button>
                   </td>
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
  

  function limpiarCarrito(posicion) {
    
    carrito.articles.splice(posicion, 1);
    
    
    mostrarCarrito(carrito);
    
}
 

function methodPay() {
  let method = document.getElementById("method");
  htmlContentToAppend = "";
  method.onchange = function(e) {
      let selectMethod = e.target.value;
      if (selectMethod == "method2") {
          htmlContentToAppend = `
          <div class="container">
              <div class="alert alert-secondary text-center" role="alert" style="position: relative; width:auto; top: 0;">
                  <p>Las compras realizadas con este método de pago quedan ajustadas a las condiciones del banco.</p>
              </div>
          </div>
      `
      } else {
          htmlContentToAppend = `
          <div class="form-group input-group-sm col-md-3">
              <label><small>Número de la tarjeta:</small></label>
              <input name="credit-number" class="form-control" type="tel" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" required>
          </div>
          <div class="pl-5 col">
              <label><small>Fecha de vencimiento y código de seguridad:</small></label>
              <div class="form-row">
              <div class="input-group-sm col-md-2">
                  <select class="form-control" name="month" id="month">
                  <option value="--">--</option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  </select>
              </div>
              <div class="input-group-sm col-md-2">
                  <select class="form-control" name="year" id="year">
                  <option value="----">----</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  </select>
              </div>
              <div class="input-group-sm col-md-2">
                  <input type="tel" inputmode="numeric" pattern="[0-9\s]{3,5}" class="form-control" id="securityCode" maxlength="4" required>
              </div>
              </div>
          </div>
      `
      }
      document.getElementById("methodPay").innerHTML = htmlContentToAppend;
  }
}
