let addBtn = document.getElementById("addBtn");
showNotes();
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    if (addTxt.value == "") {
        alert("Note cannot be empty!");
    }
    else {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        showNotes();
    }

});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="card noteCards my-3 mx-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button class="btn btn-primary bg-danger" onclick="onDelete(this.id)" id=${index}>Delete</button>
        </div>
    </div>`
    });
    let notesEle = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `<p>No notes available</p>`
    }
}

function onDelete(index) {
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("input", function(){
    let inputTxt = searchBtn.value.toLowerCase();
    let cards = document.getElementsByClassName("noteCards");
    Array.from(cards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        cardTxt = cardTxt.toLowerCase();
        if(cardTxt.includes(inputTxt)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});
