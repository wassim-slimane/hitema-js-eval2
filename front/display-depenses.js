window.addEventListener("DOMContentLoaded"  , async() => {

    const reponse = await fetch("http://localhost:3000/depenses" )
    const depenses = await reponse.json();

    document.querySelector(".js-list-depenses").innerHTML = genererFormsDepenses(depenses);

    let sommeRecettes = 0;
    let sommesDepenses = 0;
    depenses.forEach( item => {
        if (item.montant < 0) {
            sommeRecettes += parseInt(item.montant);
        } else{
            sommesDepenses += parseInt(item.montant)
        }
    })
    const total = sommesDepenses + sommeRecettes;
    document.querySelector(".js-compteur-total").innerHTML = total;
    document.querySelector(".js-compteur-depenses").innerHTML = sommesDepenses;
    document.querySelector(".js-compteur-recettes").innerHTML = sommeRecettes;


    // écouter quand on clique dans la zone js-list-tache
    document.querySelector(".js-list-depenses").addEventListener("click" , async e => {
        e.preventDefault();
        if(e.target.className.includes("btn")){
            const form = e.target.closest('form');
            const action = e.target.value ;
            const id = form.id.value
            if(action == "modifier"){
                const data = {
                    id : id,
                    name : form.name.value,
                    montant : form.montant.value == "" ? '0' : form.montant.value
                }
                const options = { method : "PUT" , body : JSON.stringify(data) , headers : {'Content-Type': 'application/json'} }
                const response = await fetch("http://localhost:3000/depenses/"+id , options)
                response.ok && window.location.reload();
            }else if(action == "supprimer"){
                const options = {method : "DELETE"}
                const response = await fetch("http://localhost:3000/depenses/"+id , options);
                response.ok && window.location.reload();
            }
        }
    })
})

function genererFormsDepenses(data){

    if(data.length === 0) return "<p>Veuillez ajouter des tâches</p>";

    return data.map( d => {
        return `
<div class="row">
<form class="d-flex my-3 border-top border-bottom">
                        <div class="col-3 border-right"><input type="hidden" name="id" class="form-input" value="${d.id}">${d.id}</div>
                        <div class="col-3 border-right"><input type="text" name="name" class="form-input" value="${d.name}"></div>
                        <div class="col-3 border-right"><input type="text" name="montant" class="form-input" value="${d.montant}"></div>
                        <div class="col-3 border-right">
                            <input type="submit" class="btn btn-warning mx-3" value="modifier">
                            <input type="submit" class="btn btn-danger" value="supprimer">
                        </div>
                </form>
</div>`
    }).join("")
}