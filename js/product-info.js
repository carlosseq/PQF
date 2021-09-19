//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let Productos = "";
let productosArray = "";
let comentarios = "";
let mostrar = "";
let nuevoComentario = "";
let puntuacion = "";
let hoy = new Date();
let fechaActual = (hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDay()+" "+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds());
let usuario = JSON.parse(localStorage.getItem("users"));
let nombre = usuario.nombre;
let coment= "";

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          productosArray = resultObj.data;
        }
      });
      
      getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
          if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            mostrarComentarios(comentarios);
          }
      });
      getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          Productos = resultObj.data;
          mostrarInfoProducto(Productos);
          mostrarGaleria(Productos);
        }
      });
      console.log(fechaActual)
});


    function mostrarInfoProducto(Productos) {
        informacion = `
          <div class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-center">                           
                  <h1 class="row justify-content-center ">
                  ${Productos.name} 
                  </h1> 
              </div><hr><br>
                    
              <div class="row">
                  <div class="col">
                      <img src="
                      ${Productos.images[0]}
                      " alt="" class="img-fluid"><hr>
                  </div>
                  <div class="col">
                      <hr><br>
                      <div class="d-flex w-100 justify-content-between">
                      <p class="mb-1">
                      ${Productos.description}
                      </p>
                  </div><hr><br>
                  
                  <div class="d-flex w-100 justify-content-between">                           
                      <small class="text">
                      ${Productos.soldCount}
                       artículos vendidos</small>
                      <h3 class="text-muted">
                      ${Productos.currency}                 
                      ${Productos.cost}
                       </h3>
                  </div>
              </div>
          </div>
          <hr><br>  
          `;
      
          document.getElementById("Productos").innerHTML = informacion;
    }
    

    function mostrarGaleria(infoProducto) {
    
        let galeria = {};
        galeria =`
        <div class="list-group-item list-group-item-action">
            <div class="card">
                <div class="row justify-content-center">
                    <div class="zoom col d-block">
                        <img src="${infoProducto.images[4]}" class="d-block w-100">                    
                        <div class="zoom-content">
                           
                        </div>
                    </div>
                    <div class="zoom col d-block">
                        <img src="${infoProducto.images[2]}" class="rounded d-block w-100">
                        <div class="zoom-content">
                            
                        </div>
                    </div>
                    <div class="zoom col d-block">
                        <img src="${infoProducto.images[1]}" class="d-block w-100">
                        <div class="zoom-content">
                           
                        </div>
                    </div>
                    <div class="zoom col d-block">
                        <img src="${infoProducto.images[3]}" class="d-block w-100">
                        <div class="zoom-content">
                           
                        </div>
                    </div>                
                </div>
            </div>
        </div>
        `;
    
        document.getElementById("galeria").innerHTML = galeria;
    
    }

    function mostrarComentarios(comentarios) {
      let mostrar = "";
        for (coment of comentarios) {
          puntos = parseInt(coment.score);
          mostrar += `
              <div class="list-group-item list-group-item-action">
                  <div class="justify-content-center"> 
                      <h4>${coment.user}</h4>
                      <div id="puntuacion" style="margin-bottom: 5px"> ${mostrarEstrellas(
                        puntos
                      )}</div>
                      <p class="">${coment.description}</p>
                      <small class="text">${coment.dateTime}</small>
                  </div>
              </div> `;
        }
        document.getElementById("comentarios").innerHTML = mostrar;
      }


      function mostrarEstrellas(puntos) {
        let estrellas = "";
        for (let i = 1; i < 6; i++) {
          if (i <= puntos) {
            estrellas += `<i class="fas fa-battery-full"style='color:orange'></i>`;
          } else {
            estrellas += `<i class="fas fa-battery-empty"style='color:grey'></i>`;
          }
        }
        return estrellas;
      }

      function comentar() {
       let nuevoComentario = document.getElementById("poner-comentarios").value;
          for (let i = 1; i <= 5; i++) {
            if (document.getElementById(i).checked) {
              puntuacion = document.getElementById(i).value;
            }
          }
          comentarios.push({score:parseInt(puntuacion),description:nuevoComentario,user:nombre,dateTime:fechaActual});
      
          console.log(comentarios)
          mostrarComentarios(comentarios);
        }