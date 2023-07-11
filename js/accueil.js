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