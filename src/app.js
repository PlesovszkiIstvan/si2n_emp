const doc = {
    tbody: null
};

const state = {
    dolgozoLista: [],
    saveButton: null
};

window.addEventListener('load',() => {
    init();
});

function getEmployee(){
    let endpoint = 'employees';
    let url = state.host + endpoint;
    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        state.dolgozoLista = result;
        render();
    })
    .catch(err =>{
        console.log('Hiba!');
        console.log(err);
    });
    
}

function init(){
    doc.tbody = document.querySelector('#tbody');
    state.host = "http://localhost:8000/";
    doc.saveButton.addEventListener('click',() =>{
        console.log('Cool and nice');
    })
    state.dolgozoLista = [
     /* 
    {id:1, name: 'Pisti', city: 'Szolnok', salary: 385},
    {id:2, name: 'Mari', city: 'Szeged', salary: 384},
    {id:3, name: 'Kati', city: 'Szolnok', salary: 383},
    {id:4, name: 'Dani', city: 'Szeged', salary: 382},
    {id:5, name: 'Lili', city: 'Szolnok', salary: 381}*/
    ];
    getEmployee();
};

function render(){
    let rows ='';
    state.dolgozoLista.forEach( dolgozo=> {
        console.log(dolgozo.name);
        rows +=`
        <tr>
            <td>${dolgozo.id}</td>
            <td>${dolgozo.name}</td>
            <td>${dolgozo.city}</td>
            <td>${dolgozo.salary}</td>
            <td>
                <button class="btn btn-error"
                onclick="startdeleteEmployee(this)"
                data-id="${dolgozo.id}"
                >Törlés</button>
            </td>
            
        </tr>`;
        });
        doc.tbody.innerHTML = rows;
    
};

function startdeleteEmployee(event) {
    let id = (event.getAttribute('data-id'))
    deleteEmployee(id);
}

function deleteEmployee(id){
    //state.url + '/' + id
    let endpoint = 'employees';
    let url = state.host + endpoint + '/' + id;
    console.log(url);
    fetch(url, {
        method: 'delete'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        getEmployee();
        render();
    })
    
}