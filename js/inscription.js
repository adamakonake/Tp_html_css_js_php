// Variable d'erreur
var error=false;
// Click du bouton photo
function photoOnClick(){
    document.getElementById('file').click();
    const reader = new FileReader();
    const fileInput = document.getElementById('file');
    const imag =  document.getElementById('photoProfil');
    reader.onload = e =>{
        imag.src = e.target.result;
    }
    fileInput.addEventListener('change', e =>{
        const f=e.target.files[0];
        reader.readAsDataURL(f);
    });
}

// FadeIn du madal content du button nos contacts

boutonConnecter = document.getElementById("btnConnecter");
modal = document.getElementById("modal");

boutonConnecter.onclick = function(){
    modal.style.display = "block";
}

modal.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
    }
}

// Fin FadeIn du madal content du button nos contacts

document.getElementById('telephone').addEventListener('keydown',e =>{

    if((e.key != "Backspace") && (e.key != "Delete")){
        if(document.getElementById('telephone').value.length == 2 || document.getElementById('telephone').value.length == 7
        || document.getElementById('telephone').value.length == 12){
            document.getElementById('telephone').value = document.getElementById('telephone').value+' - ';
        }
    }
});

function verifInput(inputt,span){
    
    switch(inputt.id){
        case 'nom': if(inputt.value=="" || inputt.value==null){
                        span.innerHTML="Veuiller remplire le champs";
                        span.style="margin-left:30px;color:red;align-self:center";
                        inputt.style="border:1px solid red";
                        error = true;
                        return;
                    }else{
                        span.innerHTML="";
                        inputt.style="border: 1px solid rgba(0, 0, 0, 0.11)"
                        error = false;
                    }
                    var re = /^[A-Za-z]+$/;
                    if(!re.test(inputt.value) || inputt.value.length<4){
                        span.innerHTML="Format incorrecte(ou inférieur à 4 caractères)";
                        span.style="margin-left:30px;color:red;align-self:center";
                        inputt.style="border:1px solid red";
                        error = true;
                        return;
                    }
                    break;
        case 'prenom': if(inputt.value=="" || inputt.value==null){
                            span.innerHTML="Veuiller remplire le champs";
                            span.style="margin-left:30px;color:red;align-self:center";
                            inputt.style="border:1px solid red";
                            error = true;
                            return;
                        }else{
                            span.innerHTML="";
                            inputt.style="border: 1px solid rgba(0, 0, 0, 0.11)"
                            error = false;
                        }
                        var re = /^[A-Za-z]+$/;
                        if(!re.test(inputt.value) || inputt.value.length<4){
                            span.innerHTML="Format incorrecte(ou inférieur à 4 caractères)";
                            span.style="margin-left:30px;color:red;align-self:center";
                            inputt.style="border:1px solid red";
                            error = true;
                            return;
                        }
                        break;
        case 'age': if(inputt.value=="" || inputt.value==null){
                            span.innerHTML="Veuiller remplire le champs";
                            span.style="margin-left:30px;color:red;align-self:center";
                            inputt.style="border:1px solid red";
                            error = true;
                            return;
                        }else{
                            span.innerHTML="";
                            inputt.style="border: 1px solid rgba(0, 0, 0, 0.11)"
                            error = false;
                        }
                        if((inputt.value<18 || inputt.value>30)){
                            span.innerHTML="Veuiller entrer un age entre 18 et 30";
                            span.style="margin-left:30px;color:red;align-self:center";
                            inputt.style="border:1px solid red";
                            error = true;
                            return;
                        }
                        break;
        case 'dateNaissance': if(inputt.value=="" || inputt.value==null){
                                    span.innerHTML="Veuiller remplire le champs";
                                    span.style="margin-left:30px;color:red;align-self:center";
                                    inputt.style="border:1px solid red";
                                    error = true;
                                    return;
                                }else{
                                    span.innerHTML="";
                                    inputt.style="border: 1px solid rgba(0, 0, 0, 0.11)"
                                    error = false;
                                }
                                if(((new Date().getFullYear()-new Date(inputt.value).getFullYear()))!=age.value){
                                    span.innerHTML="Veuiller une date qui correspond a votre age";
                                    span.style="margin-left:30px;color:red;align-self:center";
                                    inputt.style="border:1px solid red";
                                    error = true;
                                    return;
                                }
                                break;
        case 'email': if(inputt.value=="" || inputt.value==null){
                            span.innerHTML="Veuiller remplire le champs";
                            span.style="margin-left:30px;color:red;align-self:center";
                            inputt.style="border:1px solid red";
                            error = true;
                            return;
                        }else{
                            span.innerHTML="";
                            inputt.style="border: 1px solid rgba(0, 0, 0, 0.11)";
                            error = false;
                        }
                        var re = /^[a-z]+[a-z0-9]+[\.$]?[a-z0-9]+@[a-z]{3,10}\.{1}[a-z]{3}$/;
                        if(!re.test(inputt.value) || inputt.value.length<4){
                            span.innerHTML="Veuiller saisir un email correcte";
                            span.style="margin-left:30px;color:red;align-self:center";
                            inputt.style="border:1px solid red";
                            error = true;
                            return;
                        }
                        break;
        case 'telephone': var firstN = document.getElementById('telephone').value;
                            if(inputt.value=="" || inputt.value==null){
                                span.innerHTML="Veuiller remplire le champs";
                                span.style="margin-left:30px;color:red;align-self:center";
                                inputt.style="border:1px solid red";
                                error = true;
                                return;
                            }else{
                                span.innerHTML="";
                                inputt.style="border: 1px solid rgba(0, 0, 0, 0.11)"
                                error = false;
                            }
                            if((firstN.substring(0,1)!=5 && firstN.substring(0,1)!=6 && firstN.substring(0,1)!=7
                                && firstN.substring(0,1)!=8 && firstN.substring(0,1)!=9)||firstN.length<17 ||firstN.length>17){
                                span.innerHTML="Veuiller saisir un numéro valide";
                                span.style="margin-left:30px;color:red;align-self:center";
                                inputt.style="border:1px solid red";
                                error = true;
                                return;
                            }
        break;
        case 'promotion': if(inputt.value=="" || inputt.value==null){
                            span.innerHTML="Veuiller remplire le champs";
                            span.style="margin-left:30px;color:red;align-self:center";
                            inputt.style="border:1px solid red";
                            error = true;
                            return;
                        }else{
                            span.innerHTML="";
                            inputt.style="border: 1px solid rgba(0, 0, 0, 0.11)"
                            error = false;
                        }
                        var re = /^[P]{1}[1-9][0-9]*$/;
                        if(!re.test(inputt.value) || inputt.value.length<1){
                            span.innerHTML="Format incorrecte(Ex : P1)";
                            span.style="margin-left:30px;color:red;align-self:center";
                            inputt.style="border:1px solid red";
                            error = true;
                            return;
                        }
                        break;
        case 'anneeCerf': if(inputt.value=="" || inputt.value==null){
                            span.innerHTML="Veuiller remplire le champs";
                            span.style="margin-left:30px;color:red;align-self:center";
                            inputt.style="border:1px solid red";
                            error = true;
                            return;
                        }else{
                            span.innerHTML="";
                            inputt.style="border: 1px solid rgba(0, 0, 0, 0.11)"
                            error = false;
                        }
                        if((inputt.value<0 || inputt.value>new Date().getFullYear())){
                            span.innerHTML="Veuiller entrer une année correcte";
                            span.style="margin-left:30px;color:red;align-self:center";
                            inputt.style="border:1px solid red";
                            error = true;
                            return;
                        }
                        break;
        case 'file': if(inputt.value=="" || inputt.value==null){
                        span.innerHTML="Veuiller choisir une photo";
                        span.style="margin-left:30px;color:red;align-self:center";
                        document.getElementById('photoProfil').style="border:1px solid red";
                        error = true;
                        return;
                    }else{
                        span.innerHTML="";
                        document.getElementById('photoProfil').style="border: none";
                        error = false;
                    }  
        
    }
}
//Click du button enregister
function enregistrerOnClick(){
    var nom = document.getElementById('nom'), prenom = document.getElementById('prenom'),
            age = document.getElementById('age'), dateNaissance = document.getElementById('dateNaissance'),
            email = document.getElementById('email'), telephone = document.getElementById('telephone'),
            promotion = document.getElementById('promotion'), anneeCerf = document.getElementById('anneeCerf'),
            fileInput = document.getElementById('file');
    verifInput(nom,document.getElementById('error'));
    if(error)
        return;
    verifInput(prenom,document.getElementById('error'));
    if(error)
        return;
    verifInput(age,document.getElementById('error'));
    if(error)
        return;
    verifInput(dateNaissance,document.getElementById('error'));
    if(error)
        return;
    verifInput(email,document.getElementById('error'));
    if(error)
        return;
    verifInput(telephone,document.getElementById('error'));
    if(error)
        return;
    verifInput(promotion,document.getElementById('error'));
    if(error)
        return;
    verifInput(anneeCerf,document.getElementById('error'));
    if(error)
        return;
    verifInput(fileInput,document.getElementById('error'));
    if(error)
        return;
    //alert('no error');

    xnr = new XMLHttpRequest();
    xnr.open('POST','php/inscription.php');
    //xnr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //xnr.setRequestHeader('Content-type', 'multipart/form-data');
    var formData = new FormData();
    formData.append(nom.name,nom.value);
    formData.append(prenom.name,prenom.value);
    formData.append(age.name,age.value);
    formData.append(dateNaissance.name,dateNaissance.value);
    formData.append(email.name,email.value);
    formData.append(telephone.name,telephone.value);
    formData.append(promotion.name,promotion.value);
    formData.append(anneeCerf.name,anneeCerf.value);
    formData.append('file',fileInput.files[0]);
    xnr.send(formData);
    xnr.onload = function (){
        if(xnr.readyState === XMLHttpRequest.DONE){
            if( xnr.status === 200){
                console.log(xnr.responseText);
                switch(xnr.responseText){
                    case "succes" : document.getElementById('error').innerHTML="inscription effectuer avec succes !";
                                    document.getElementById('error').style="margin-left:30px;color:green;align-self:center";
                                    document.getElementById('myForm').reset();
                                    document.getElementById('photoProfil').src="images/logo_compte.png";
                                    //document.getElementsByTagName('input').style = "border: 1px solid rgba(0, 0, 0, 0.11)";
                                    break;
                    case "exist"  : document.getElementById('error').innerHTML="Cet email existe déjà";
                                    document.getElementById('error').style="margin-left:30px;color:red;align-self:center";
                                    document.getElementById('email').style="border:1px solid red";
                                    break;
                    case "Pnotfound"  : document.getElementById('error').innerHTML="Cette promotion n'existe pas";
                                    document.getElementById('error').style="margin-left:30px;color:red;align-self:center";
                                    document.getElementById('promotion').style="border:1px solid red";
                                    break;
                    default       : document.getElementById('error').innerHTML=xnr.responseText;
                                    document.getElementById('error').style="margin-left:30px;color:red;align-self:center";
                                    console.log(xnr.responseText);
                }
            }else{
                alert('error');
            }
        }else{
            alert(xnr.readyState);
        }
    }
    
    //document.getElementById('myForm').submit();

};