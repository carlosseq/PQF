function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    /*console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());*/

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    let usuario={};
    usuario.nombre=profile.getName();
    usuario.estado="Conectado"
    usuario.avatar=profile.getImageUrl();
    
   alert("conectado")
  }

function verificar(){
    let user = document.getElementById('user')
    let password = document.getElementById('pass')
    let msj = document.getElementById('msj')
    let users = {};
    
    if(user.value.trim() === '' || password.value.trim() === ''){
        //Valido - Invalido
        user.classList.add('invalido');
        password.classList.add('invalido');
        
        msj.innerHTML='Tu usuario o contraseña son incorrectos';
        msj.style.color='red';
        msj.style.display='block';
    } else{
        
        location.href ='index.html';
    
        users.nombre = user.value;
        users.images="img/userIcon.png"
        users.estado = "conectado";
    
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem('users', JSON.stringify(users));
       
    }
    
    }   
    
    
    
    document.addEventListener("DOMContentLoaded", ()=> {
        let users =  JSON.parse( localStorage.getItem('users'))
        if(users.estado == "conectado"){
            location.href = 'index.html'}   
        
    
    });

    function desconectar(){ 

        signOut(); 
    
        localStorage.clear(); 
        location.href="index.html"; 
        
    }