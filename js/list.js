var apps;
var allApp;
var list = document.getElementById('list');
xnr = new XMLHttpRequest();
xnr.open('GET','php/list.php');
xnr.send();
xnr.onload = function(){
    if(xnr.readyState === XMLHttpRequest.DONE && xnr.status == 200){
        apps = JSON.parse(xnr.responseText);
        allApp = apps;
        console.log(apps);
        apps.forEach(element => {
            card = document.createElement('div');
            card.className="card";
            //card.style="width: 20%;display: inline; border:1px solid green"
            image = document.createElement('img');
            //image.style="width: 100%;height: auto;"
            image.className="cardImg"
            image.src="http://"+element.photo;
            card.appendChild(image);
            div = document.createElement('div');
            div.className = "divNomOeil";
            divOeil = document.createElement('div');
            divOeil.className = "divOeil";
            oeil = document.createElement('img');
            oeil.className ="oeil";
            oeil.src = "http://localhost/tpphp/images/oeil.png";
            titre = document.createElement('p');
            titre.className="cardTiltle";
            titre.innerHTML=element.nom+" "+element.prenom;
            div.appendChild(titre);
            divOeil.appendChild(oeil)
            div.appendChild(divOeil);
            card.appendChild(div);
            list.appendChild(card);
            var appr = element;
            image.addEventListener('click', e =>{
                sessionStorage.setItem("currentApprenant","["+JSON.stringify(appr)+"]");
                console.log(appr.photo);
                window.location.href="detail.html?id="+appr.id+"";
            });
            oeil.addEventListener('click', e =>{
                sessionStorage.setItem("currentApprenant","["+JSON.stringify(appr)+"]");
                console.log(appr.photo);
                window.location.href="detailClient.html?id="+appr.id+"";
            });
            
        });
        
    }
}

document.getElementById('promo').addEventListener('change', e =>{
    list.replaceChildren();
    allApp.forEach(el =>{
        if(el.promotion == e.target.value){
            console.log(e.target.value+"   "+el.promotion);
            card = document.createElement('div');
            card.className = "card";
            image = document.createElement('img');
            image.className="cardImg"
            image.src="http://"+el.photo;
            card.appendChild(image);
            div = document.createElement('div');
            div.className = "divNomOeil";
            divOeil = document.createElement('div');
            divOeil.className = "divOeil";
            oeil = document.createElement('img');
            oeil.className ="oeil";
            oeil.src = "http://localhost/tpphp/images/oeil.png";
            titre = document.createElement('p');
            titre.className="cardTiltle";
            titre.innerHTML=el.nom+" "+el.prenom;
            div.appendChild(titre);
            divOeil.appendChild(oeil)
            div.appendChild(divOeil);
            card.appendChild(div);
            list.appendChild(card);
            var appr = el;
            image.addEventListener('click', e =>{
                sessionStorage.setItem("currentApprenant","["+JSON.stringify(appr)+"]");
                console.log(appr.photo);
                window.location.href="detail.html?id="+appr.id+"";
            });
            oeil.addEventListener('click', e =>{
                sessionStorage.setItem("currentApprenant","["+JSON.stringify(appr)+"]");
                console.log(appr.photo);
                window.location.href="detailClient.html?id="+appr.id+"";
            });
        }else if(e.target.value == "all"){
            card = document.createElement('div');
            card.className = "card";
            image = document.createElement('img');
            image.className="cardImg"
            image.src="http://"+el.photo;
            card.appendChild(image);
            div = document.createElement('div');
            div.className = "divNomOeil";
            divOeil = document.createElement('div');
            divOeil.className = "divOeil";
            oeil = document.createElement('img');
            oeil.className ="oeil";
            oeil.src = "http://localhost/tpphp/images/oeil.png";
            titre = document.createElement('p');
            titre.className="cardTiltle";
            titre.innerHTML=el.nom+" "+el.prenom;
            div.appendChild(titre);
            divOeil.appendChild(oeil)
            div.appendChild(divOeil);
            card.appendChild(div);
            list.appendChild(card);
            var appr = el;
            image.addEventListener('click', e =>{
                sessionStorage.setItem("currentApprenant","["+JSON.stringify(appr)+"]");
                console.log(appr.photo);
                window.location.href="detail.html?id="+appr.id+"";
            });
            oeil.addEventListener('click', e =>{
                sessionStorage.setItem("currentApprenant","["+JSON.stringify(appr)+"]");
                console.log(appr.photo);
                window.location.href="detailClient.html?id="+appr.id+"";
            });
        }
    });
})