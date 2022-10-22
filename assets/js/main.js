//  <li class="tarefa">
//  <button class="done"></button>
//   <h3>Teste de Tarefa</h3>
//  <button class="remove"></button>
//  </li> -->

//Selecionando Elementos
const botaoAdd = document.querySelector('.addTarefa');
const listaDeTarefas = document.querySelector('.lista__tarefas');
const form = document.querySelector('#adiciona-tarefa');
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const removeAllBtn = document.querySelector('.removeAll');
const audio = document.querySelector('audio');

tarefas.forEach(elemento => {
    criaElemento(elemento);
})

botaoAdd.addEventListener('click', (evento) => {
    evento.preventDefault();

    const tarefaAtual = {nome: form.tarefa.value};
    const existe = tarefas.find(elemento => elemento.nome === tarefaAtual.nome);

    if(existe){
        tarefaAtual.id = existe.id;
    }else if(tarefaAtual.nome !== ''){
        tarefaAtual.id = tarefas[tarefas.length -1] ? tarefas[tarefas.length -1].id + 1 : 0; 
        //tarefas.length - 1 = ultimo elemento do array, então se existir um elemento adicione o proximo na proxima posição caso contrario entra com indice 0;
        criaElemento(tarefaAtual);
        tarefas.push(tarefaAtual);
    }

    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    form.tarefa.value = "";
})


function criaElemento(tarefaValor){
    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add('tarefa');

    const textoTarefa = document.createElement('h3');
    textoTarefa.textContent = tarefaValor.nome;
    textoTarefa.dataset.id = tarefaValor.id;

    novaTarefa.appendChild(textoTarefa);

    novaTarefa.appendChild(addBtn(tarefaValor.id));
    
    novaTarefa.appendChild(removeBtn(tarefaValor.id));

    listaDeTarefas.appendChild(novaTarefa);
}

function removeBtn(id){
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.addEventListener('click', function() {
        removeTarefa(this.parentNode, id);
    })
    return removeBtn
}

function removeTarefa(tag, id,){
    tag.remove();
    tarefas.splice(id, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function addBtn(id){
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('done');
    doneBtn.addEventListener('click', function(){
        tarefaFeita(this.parentNode, this, this.nextSibling)
        // console.log(this.nextSibling)
        // this.classList.add('feita')
    })

    return doneBtn
}

function tarefaFeita(li,btn1,btn2){
    li.classList.toggle('tarefa-feita');
    btn1.classList.toggle('feita');
    btn2.classList.toggle('feita-remove');
    if(li.classList.contains('tarefa-feita')){
        audio.play();
    }
    
}


removeAllBtn.addEventListener('click', () => {
    localStorage.clear();
})