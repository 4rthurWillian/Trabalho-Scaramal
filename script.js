// Simulação de banco de dados em memória
let usuarios = [
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Maria Santos" }
];
let nextId = 3;

// Elementos do DOM
const form = document.getElementById('form-registro');
const nomeInput = document.getElementById('nome-input');
const idEditando = document.getElementById('id-editando');
const btnSubmit = document.getElementById('btn-submit');
const btnCancelar = document.getElementById('btn-cancelar');
const tabelaCorpo = document.getElementById('tabela-corpo');

// Carregar registros ao iniciar
carregarRegistros();

// Evento do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = nomeInput.value.trim();
    const id = idEditando.value;
    
    if (nome) {
        if (id) {
            // Editar
            editarUsuario(parseInt(id), nome);
        } else {
            // Incluir
            incluirUsuario(nome);
        }
    }
});

// Botão cancelar
btnCancelar.addEventListener('click', function() {
    cancelarEdicao();
});

// FUNÇÕES CRUD

function carregarRegistros() {
    tabelaCorpo.innerHTML = '';
    
    usuarios.forEach(usuario => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>
                <button class="editar" onclick="prepararEdicao(${usuario.id})">Editar</button>
                <button class="excluir" onclick="excluirUsuario(${usuario.id})">Excluir</button>
            </td>
        `;
        tabelaCorpo.appendChild(tr);
    });
}

function incluirUsuario(nome) {
    const novoUsuario = {
        id: nextId++,
        nome: nome
    };
    usuarios.push(novoUsuario);
    carregarRegistros();
    form.reset();
}

function prepararEdicao(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        nomeInput.value = usuario.nome;
        idEditando.value = usuario.id;
        btnSubmit.textContent = 'Atualizar';
        btnCancelar.style.display = 'inline-block';
        nomeInput.focus();
    }
}

function editarUsuario(id, novoNome) {
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].nome = novoNome;
        carregarRegistros();
        cancelarEdicao();
    }
}

function excluirUsuario(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        usuarios = usuarios.filter(u => u.id !== id);
        carregarRegistros();
    }
}

function cancelarEdicao() {
    form.reset();
    idEditando.value = '';
    btnSubmit.textContent = 'Incluir';
    btnCancelar.style.display = 'none';
}