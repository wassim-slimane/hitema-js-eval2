document.querySelector(".js-form-add").addEventListener("submit" , async (e) => {
    e.preventDefault();

    const data = {
        name : e.target.name.value,
        montant : e.target.montant.value === '' ? "0" : e.target.montant.value
    }

    // vérification avec joi

    const optionsRequete = { method : "POST" , body : JSON.stringify(data) , headers :  {'Content-Type': 'application/json'}  }
    const reponse = await fetch("http://localhost:3000/depenses" , optionsRequete)

    if(reponse.status) e.target.reset()

    window.location.reload();
})