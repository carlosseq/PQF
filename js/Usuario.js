document.addEventListener("DOMContentLoaded", ()=> {
    let users =  JSON.parse( localStorage.getItem('users'))
    document.getElementById("usuario").innerHTML=users.nombre; 
    

});