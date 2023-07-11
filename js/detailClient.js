var apprenant;
var xnr = new XMLHttpRequest();
tabIdInput=["nom","prenom","age","dateNaissance","email","telephone","promotion","anneeCerf"];

function makeReadOnly(){
    tabIdInput.forEach(element => {
        document.getElementById(element).readOnly = true;
    });
}

if(sessionStorage.getItem("currentApprenant") != null){
    apprenant = JSON.parse(sessionStorage.getItem("currentApprenant"));
    makeReadOnly();
    document.getElementById('titlePage').innerHTML=apprenant[0].nom;
    document.getElementById('photoProfile').src="http://"+apprenant[0].photo;
    document.getElementById('photoProfile').style="top : -"+document.getElementById('photoProfile').height/2+"px ;";
    document.getElementById("titeName").innerHTML=apprenant[0].nom+" "+apprenant[0].prenom;
    document.getElementById("titeAdresse").innerHTML=apprenant[0].email;
    document.getElementById("titeMatricule").innerHTML=apprenant[0].matriculle;
    document.getElementById("nom").value=apprenant[0].nom;
    document.getElementById("prenom").value=apprenant[0].prenom;
    document.getElementById("age").value=apprenant[0].age;
    document.getElementById("dateNaissance").value=apprenant[0].dateNaissance;
    document.getElementById("email").value=apprenant[0].email;
    document.getElementById("telephone").value=apprenant[0].telephone;
    document.getElementById("promotion").value=apprenant[0].promotion;
    document.getElementById("anneeCerf").value=apprenant[0].anneeCerf;
}else{

    var urlPage = window.location.search;
    var urlParam = new URLSearchParams(urlPage);
    var idApprenant = urlParam.get('id');

    xnr.open('GET','php/detail.php?id='+idApprenant+'');
    xnr.send();
    xnr.onload = function(){
        if(xnr.readyState === XMLHttpRequest.DONE && xnr.status == 200){
            apprenant = JSON.parse(xnr.responseText);
            makeReadOnly();
            document.getElementById('titlePage').innerHTML=apprenant[0].nom;
            document.getElementById('photoProfile').src="http://"+apprenant[0].photo;
            document.getElementById('photoProfile').style="top : -"+document.getElementById('photoProfile').height/2+"px ;";
            document.getElementById("titeName").innerHTML=apprenant[0].nom+" "+apprenant[0].prenom;
            document.getElementById("titeAdresse").innerHTML=apprenant[0].email;
            document.getElementById("titeMatricule").innerHTML=apprenant[0].matriculle;
            document.getElementById("nom").value=apprenant[0].nom;
            document.getElementById("prenom").value=apprenant[0].prenom;
            document.getElementById("age").value=apprenant[0].age;
            document.getElementById("dateNaissance").value=apprenant[0].dateNaissance;
            document.getElementById("email").value=apprenant[0].email;
            document.getElementById("telephone").value=apprenant[0].telephone;
            document.getElementById("promotion").value=apprenant[0].promotion;
            document.getElementById("anneeCerf").value=apprenant[0].anneeCerf;
        }
    }

}

document.getElementById("btnAnnuler").addEventListener('click', e=>{

    makeReadOnly();
    document.getElementById('photoProfile').src="http://"+apprenant[0].photo;
    document.getElementById('photoProfile').style="top : -"+document.getElementById('photoProfile').height/2+"px ;";
    document.getElementById("titeName").innerHTML=apprenant[0].nom+" "+apprenant[0].prenom;
    document.getElementById("titeAdresse").innerHTML=apprenant[0].email;
    document.getElementById("titeMatricule").innerHTML=apprenant[0].matriculle;
    document.getElementById("nom").value=apprenant[0].nom;
    document.getElementById("prenom").value=apprenant[0].prenom;
    document.getElementById("age").value=apprenant[0].age;
    document.getElementById("dateNaissance").value=apprenant[0].dateNaissance;
    document.getElementById("email").value=apprenant[0].email;
    document.getElementById("telephone").value=apprenant[0].telephone;
    document.getElementById("promotion").value=apprenant[0].promotion;
    document.getElementById("anneeCerf").value=apprenant[0].anneeCerf;
    document.getElementById('btnModifier').value="MODIFIER";
    document.getElementById("btnAnnuler").style="display:none";

});
document.getElementById('btnModifier').addEventListener('click', e=>{
    if(e.target.value == "MODIFIER"){
        document.getElementById('btnModifier').value="ENREGISTRER";
        unMakeReadOnly();
        document.getElementById("btnAnnuler").style="display:inline";
    }else{

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
        //alert('no error');

        xnr = new XMLHttpRequest();
        xnr.open('POST','php/modification.php');
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
            if(xnr.readyState === XMLHttpRequest.DONE && xnr.status === 200){
                console.log(xnr.responseText);
                response = JSON.parse(xnr.responseText);
                response.apprenant[0].photo = "https://"+response.apprenant[0].photo;
                switch(response.message){
                    case "succes" : document.getElementById('error').innerHTML="modification effectuer avec succes !";
                                    document.getElementById('error').style="margin-left:30px;color:green;align-self:center";
                                    document.getElementById('btnModifier').value="MODIFIER";
                                    document.getElementById("btnAnnuler").style="display:none";
                                    apprenant = response.apprenant;
                                    makeReadOnly();
                                    
                                    //document.getElementsByTagName('input').style = "border: 1px solid rgba(0, 0, 0, 0.11)";
                                    break;
                    case "notExist"  : document.getElementById('error').innerHTML="Cet apprenant n'existe pas";
                                    document.getElementById('error').style="margin-left:30px;color:red;align-self:center";
                                    document.getElementById('email').style="border:1px solid red";
                                    break;
                    // case "Pnotfound"  : document.getElementById('error').innerHTML="Cette promotion n'existe pas";
                    //                 document.getElementById('error').style="margin-left:30px;color:red;align-self:center";
                    //                 document.getElementById('promotion').style="border:1px solid red";
                    //                 break;
                    default       : document.getElementById('error').innerHTML=xnr.responseText;
                                    document.getElementById('error').style="margin-left:30px;color:red;align-self:center";
                }

            }else{
                alert("error");
            }
        }
    }
});

document.getElementById('btnSupprimer').addEventListener('click', e =>{

    if(confirm("Voulez-vous vraiment supprimer cet Apprenant ?")){
        if(sessionStorage.getItem("currentApprenant") != null){
            apprenant = JSON.parse(sessionStorage.getItem("currentApprenant"));
            makeReadOnly();
            xnr = new XMLHttpRequest();
            xnr.open('GET','php/supprimer.php?id='+apprenant[0].id+'');
            xnr.send();
            xnr.onload = function(){
                xnr.status == 200
                if(xnr.readyState === XMLHttpRequest.DONE && xnr.status == 200){
                    console.log(xnr.responseText);
                    if(xnr.responseText == "succes"){
                        alert("Suppression effectuer avec succes !");
                        window.location.href="list.html";
                    }else{
                        document.getElementById('error').innerHTML=xnr.responseText;
                    }
                    
                }
            }
            
        }else{
    
            var urlPage = window.location.search;
            var urlParam = new URLSearchParams(urlPage);
            var idApprenant = urlParam.get('id');
            makeReadOnly();
            xnr = new XMLHttpRequest();
            xnr.open('GET','php/supprimer.php?id='+idApprenant+'');
            xnr.send();
            xnr.onload = function(){
                if(xnr.readyState === XMLHttpRequest.DONE && xnr.status == 200){
                    console.log(xnr.responseText);
                    if(xnr.responseText == "succes"){
                        alert("Suppression effectuer avec succes !");
                        window.location.href="list.html";
                    }else{
                        document.getElementById('error').innerHTML=xnrresponseText;
                    }
                    
                }
            }
        
        }

    }

});

// function makeReadOnly(){
//     tabIdInput.forEach(element => {
//         document.getElementById(element).readOnly = true;
//     });
// }
// function unMakeReadOnly(){
//     tabIdInput.forEach(element => {
//         document.getElementById(element).readOnly = false;
//     });
// }

document.getElementById('photoProfile').addEventListener('click', e=> {
    if(document.getElementById('btnModifier').value == "ENREGISTRER"){
        document.getElementById('file').click();
        const reader = new FileReader();
        const fileInput = document.getElementById('file');
        const imag =  document.getElementById('photoProfile');
        reader.onload = e =>{
            imag.src = e.target.result;
            document.getElementById('photoProfile').style="top : -"+document.getElementById('photoProfile').height/2+"px ;";
        }
        fileInput.addEventListener('change', e =>{
            const f=e.target.files[0];
            reader.readAsDataURL(f);
        });
    }
} );