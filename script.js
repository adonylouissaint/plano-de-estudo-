// Seleção de Elementos
const subjectInput = document.getElementById('subject');
const timeInput = document.getElementById('time');
const addBtn = document.getElementById('addBtn');
const studyList = document.getElementById('studyList');
const currentDateElement = document.getElementById('currentDate');

// Estado Inicial (Carregar do LocalStorage ou array vazio)
let studyPlan = JSON.parse(localStorage.getItem('studyPlan')) || [];

// Função para atualizar a data no topo
function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    currentDateElement.textContent = today.toLocaleDateString('pt-BR', options);
}

// Função para Salvar no LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('studyPlan', JSON.stringify(studyPlan));
}

// Função para Renderizar a Lista
function renderList() {
    studyList.innerHTML = ''; // Limpa a lista atual

    studyPlan.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('study-item');
        if (item.completed) li.classList.add('completed');

        li.innerHTML = `
            <div class="study-info">
                <strong>${item.subject}</strong>
                <span><i class="far fa-clock"></i> ${item.time}</span>
            </div>
            <div class="study-actions">
                <button class="check-btn" onclick="toggleComplete(${index})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="delete-btn" onclick="deleteItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        studyList.appendChild(li);
    });
}

// Função para Adicionar Item
addBtn.addEventListener('click', () => {
    const subject = subjectInput.value;
    const time = timeInput.value;

    if (subject === '' || time === '') {
        alert('Por favor, preencha a matéria e o horário!');
        return;
    }

    const newStudy = {
        subject: subject,
        time: time,
        completed: false
    };

    studyPlan.push(newStudy);
    saveToLocalStorage();
    renderList();

    // Limpar inputs
    subjectInput.value = '';
    timeInput.value = '';
});

// Função para Marcar como Concluído
window.toggleComplete = function(index) {
    studyPlan[index].completed = !studyPlan[index].completed;
    saveToLocalStorage();
    renderList();
}

// Função para Deletar Item
window.deleteItem = function(index) {
    if(confirm('Tem certeza que deseja apagar este estudo?')) {
        studyPlan.splice(index, 1);
        saveToLocalStorage();
        renderList();
    }
}

// Inicialização
updateDate();
renderList();
