const ORDER_ASC_BY_Price = "🡡Asc";
const ORDER_DESC_BY_Price = "🡣Des";
const ORDER_BY_Relevancia = "Rele.";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var productsArray = [];

function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    productsArray = categoriesArray;
  }

  productsArray = sortCategories(currentSortCriteria, productsArray);

  //Muestro las categorías ordenadas
  showProductsList(productsArray);
}

function sortCategories(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_Price) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_Price) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_Relevancia) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}
function showProductsList(array) {
  let htmlContentToAppend = "";
  for (product of array) {
    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(product.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(product.cost) <= maxCount))
    ) {
      htmlContentToAppend +=
        `
        <a href="product-info.html" class="card mb-8 shadow-sm custom-car">
          <div class="list-group-item list-group-item-action">
            <div class="card">
                <div class="col-29">
                    <img src="` +
         product.imgSrc +
         `" alt="` +
         product.description +
         `" class="bd-placeholder-img card-img-top">
                </div>
                <div class="text">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-3">` +
          product.name +
          `</h4>
                        <small class="text-muted">` +
          product.currency +
          product.cost +
          `</small>
                    </div>
                    <p class="mb-1"> ` +
          product.description +
          ` </p>
                </div>
            </div>
          </div>
        </a>
        `;
    }
    document.getElementById("Productos").innerHTML = htmlContentToAppend;
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    showSpinner;
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;
      showProductsList(productsArray);
    }
  });
  
});


document.getElementById("asc").addEventListener("click", function () {
  sortAndShowCategories(ORDER_ASC_BY_Price);
});

document.getElementById("des").addEventListener("click", function () {
  sortAndShowCategories(ORDER_DESC_BY_Price);
});

document.getElementById("rele").addEventListener("click", function () {
  sortAndShowCategories(ORDER_BY_Relevancia);
});

document.getElementById("limpiar").addEventListener("click", function () {
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";

  minCount = undefined;
  maxCount = undefined;

  showProductsList(productsArray);
});
document.getElementById("fil").addEventListener("click", function () {
  //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
  //de productos por categoría.
  minCount = document.getElementById("rangeFilterCountMin").value;
  maxCount = document.getElementById("rangeFilterCountMax").value;

  if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
    minCount = parseInt(minCount);
  } else {
    minCount = undefined;
  }

  if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
    maxCount = parseInt(maxCount);
  } else {
    maxCount = undefined;
  }

  showProductsList(productsArray);
});




function buscar(){
    let peticion = document.getElementById("encontrar").value;
    let buscados = productsArray.filter(  product =>  {
      return product.name.toLowerCase().indexOf(peticion.toLowerCase())> -1;
    })

    showProductsList(buscados);
    

}
document.getElementById("encontrar").addEventListener('keyup',()=>{
  buscar();
});
document.getElementById("Productos").addEventListener("click", () => {
  location.href= "product-info.html"
  alert("Direccionando")
});
