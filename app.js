navigator.serviceWorker.register('sw.js');
const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
const container = document.querySelector('.collection');
let aNotas = [];


// CLASS

class Nota {
  constructor(notas, horas) {
    this.notas = notas;
    this.horas = horas;
  }


  set setNota(notas) {
    this.notas = notas;
  }

  get getNota() {
    return this.notas;
  }

  set setHora(horas) {
    this.horas = horas;
  }

  get getHora() {
    return this.horas;
  }

}


document.addEventListener('DOMContentLoaded', function () {
  let sideNav = document.querySelectorAll('.sidenav');
  let instanciaSide = M.Sidenav.init(sideNav, {});

  let modal = document.querySelectorAll('.modal');
  let instanciaModal = M.Modal.init(modal, {});

  leerNotas();
  renderizarNotas(aNotas);
});

/* - FUNCION 1:  Obtiene el texto del textArea y guarda en el texto en el array - */
btnSave.addEventListener('click', (e) => {
  e.preventDefault();

  let nota = document.querySelector('#text-1').value;
  let cHora = new Date();
  let hora = cHora.toLocaleString();
  let notas = new Nota(nota, hora);

  if (!nota == "") {
    aNotas.push(notas);
    localStorage.setItem("tasks", JSON.stringify(aNotas));
    renderizarNotas(aNotas);
  }
});



function leerNotas() {

  let traerNotas = JSON.parse(localStorage.getItem("tasks"));

  if (traerNotas) {
    aNotas = traerNotas;
  } else {
    aNotas = [];
  }


  return aNotas;
}

function renderizarNotas(aNotas) {


  leerNotas();

  if (aNotas.length === 0) {
    container.innerHTML = `
    <p class="alert">No tienes tarea pendientes en este momento</p>
  `;

  }
  else {
    container.innerHTML = "";
  }


  for (x of aNotas) {

    li = document.createElement('li');
    li.setAttribute('class', 'notas');
    container.appendChild(li);


    let p1 = document.createElement('p');
    li.append(p1);
    p1.setAttribute('class', 'hora');
    p1.textContent = x.horas;

    let p2 = document.createElement('p');
    p1.after(p2);
    p2.textContent = x.notas;

    let btn = document.createElement('button');
    p2.after(btn);
    btn.setAttribute('class', 'del');

    let btnicon = document.createElement('i');
    btn.append(btnicon);
    btn.append(btnicon);
    btnicon.setAttribute('class', 'material-icons delete');
    btnicon.textContent = 'delete'
 

  }

 const del = document.querySelectorAll('.del')

 for (const dels of del) {
  dels.addEventListener('click', (e) => {
    let resultado = aNotas.findIndex((x) => x.notas === e.target.closest('.notas').querySelector('p:last-of-type').textContent);
    console.log(resultado);

    aNotas.splice(resultado, 1);
    localStorage.setItem("tasks", JSON.stringify(aNotas));
    renderizarNotas(aNotas);
  });
}
  

}


leerNotas();

renderizarNotas(aNotas);
