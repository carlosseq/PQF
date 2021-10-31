//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let perfil = JSON.parse(localStorage.getItem('perfil'));
   
   
        

    document.getElementById('foto').src = perfil.imagen;
    mostrarPerfil();
 
});
function editarPerfil () {
        
                
    let perfil = {};
    let preview = document.getElementById('foto');
    let datoNombre = document.getElementById('editarNombres');
    let datoApellido = document.getElementById('editarApellidos');
    let datoEdad = document.getElementById('editarEdad');
    let datoEmail = document.getElementById('editarEmail');
    let datoTelefono = document.getElementById('editarTelefono');
    

    perfil.nombres = datoNombre.value;
    perfil.apellidos = datoApellido.value;
    perfil.edad = datoEdad.value;  
    perfil.email = datoEmail.value;
    perfil.telefono = datoTelefono.value;
    perfil.imagen = preview.src
    
    
    localStorage.setItem('perfil', JSON.stringify(perfil));
    location.reload();
    




};

function mostrarPerfil () {

        
    let perfilDatos = JSON.parse(localStorage.getItem('perfil'));
        
        let mostrarNombre = document.getElementById("nombrePerfil");
        let mostrarApellido = document.getElementById("apellidoPerfil");
        let mostraEdad = document.getElementById("edadPerfil");
        let mostrarEmail = document.getElementById("emailPerfil");
        let mostrarTelefono = document.getElementById("telefonoPerfil");
        

        mostrarNombre.innerHTML = perfilDatos.nombres 
        mostrarApellido.innerHTML = perfilDatos.apellidos
        mostraEdad.innerHTML = perfilDatos.edad
        mostrarEmail.innerHTML = perfilDatos.email
        mostrarTelefono.innerHTML = perfilDatos.telefono
        
        
        
        
} ;  
function previewFile() {
    let preview = document.getElementById('foto');
    let file    = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result; 
      
      
    }
  
    if (file) {
      reader.readAsDataURL(file);
     
    } else {
      preview.src = "https://i.ibb.co/7vmVgnr/avatar.jpg";
    }
  }