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
            //card.style="width: 20%;display: inline; border:1px solid green"
            image = document.createElement('img');
            //image.style="width: 100%;height: auto;"
            image.className="cardImg"
            image.src="http://"+element.photo;
            card.appendChild(image);
            titre = document.createElement('p');
            titre.innerHTML=element.nom+" "+element.prenom;
            titre.className="cardTiltle";
            card.appendChild(titre);
            list.appendChild(card);
            var appr = element;
            card.addEventListener('click', e =>{
                sessionStorage.setItem("currentApprenant","["+JSON.stringify(appr)+"]");
                console.log(appr.photo);
                window.location.href="detail.html?id="+appr.id+"";
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
            //card.style="width: 20%;display: inline; border:1px solid green"
            image = document.createElement('img');
            //image.style="width: 100%;height: auto;"
            image.className="cardImg"
            image.src="http://"+el.photo;
            card.appendChild(image);
            titre = document.createElement('p');
            titre.innerHTML=el.nom+" "+el.prenom;
            titre.className="cardTiltle";
            card.appendChild(titre);
            list.appendChild(card);
            var appr = el;
            card.addEventListener('click', e =>{
                sessionStorage.setItem("currentApprenant",appr);
                window.location.href="detail.html?id="+appr.id+"";
            });
        }else if(e.target.value == "all"){
            card = document.createElement('div');
            //card.style="width: 20%;display: inline; border:1px solid green"
            image = document.createElement('img');
            //image.style="width: 100%;height: auto;"
            image.className="cardImg"
            image.src="http://"+el.photo;
            card.appendChild(image);
            titre = document.createElement('p');
            titre.innerHTML=el.nom+" "+el.prenom;
            titre.className="cardTiltle";
            card.appendChild(titre);
            list.appendChild(card);
            var appr = el;
            card.addEventListener('click', e =>{
                console.log("Salut   "+el.nom);
            });
        }
    });
})