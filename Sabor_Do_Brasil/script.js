document.addEventListener("DOMContentLoaded", function () {
    const modalLogin = document.getElementById("modal-login");
    const btnCancelar = document.getElementById("btn-cancelar");
    const btnEntrar = document.getElementById("btn-entrar");
    const btnIrCadastro = document.getElementById("btn-ir-cadastro");
    const btnLogin = document.getElementById("btn-login");
    const mensagemErro = document.getElementById("mensagem-erro");
    const totalLikes = document.getElementById("total-likes");
    const totalDislikes = document.getElementById("total-dislikes");
    const btnCadastrarPet = document.getElementById("btn-cadastrar-pet");
    const modalCadastrarPet = document.getElementById("modal-cadastrar-pet");
    const btnCancelarPet = document.getElementById("btn-cancelar-pet");
    const btnSalvarPet = document.getElementById("btn-salvar-pet");
    const mensagemErroPet = document.getElementById("mensagem-erro-pet");
    const modalEditarPet = document.getElementById("modal-editar-pet");
    const btnCancelarEditar = document.getElementById("btn-cancelar-editar");
    const btnSalvarEditar = document.getElementById("btn-salvar-editar");
    const mensagemErroEditar = document.getElementById("mensagem-erro-editar");
    const btnMinhasPublicacoes = document.getElementById("btn-minhas-publicacoes");
    const btnVoltarInicial = document.getElementById("btn-voltar-inicial");
    let usuarioLogado = localStorage.getItem('usuarioLogado');
    let usuarioLogadoId = localStorage.getItem('usuarioLogadoId');
});

// Adicionando cadastro
// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    const formCadastro = document.getElementById("form-cadastro");
    const mensagemErro = document.getElementById("mensagem-erro-cadastro");

    // Escuta o envio do formulário
    formCadastro.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        // Coleta os valores dos campos
        const nome = document.getElementById("nome-cadastro").value.trim();
        const email = document.getElementById("email-cadastro").value.trim();
        const nickname = document.getElementById("nickname-cadastro").value.trim();
        const senha = document.getElementById("senha-cadastro").value;

        // Verifica se os campos estão preenchidos
        if (!nome || !email || !nickname || !senha) {
            mensagemErro.textContent = "Todos os campos são obrigatórios.";
            return;
        }

        // Obtém usuários já cadastrados ou cria um array vazio
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verifica se o e-mail ou nickname já está em uso
        const emailJaExiste = usuarios.some(user => user.email === email);
        const nicknameJaExiste = usuarios.some(user => user.nickname === nickname);

        if (emailJaExiste || nicknameJaExiste) {
            mensagemErro.textContent = "E-mail ou nickname já cadastrado.";
            return;
        }

        // Cria objeto do novo usuário
        const novoUsuario = {
            nome: nome,
            email: email,
            nickname: nickname,
            senha: senha // Em um sistema real, a senha deve ser criptografada
        };

        // Adiciona o novo usuário ao array e salva no localStorage
        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Redireciona ou limpa o formulário
        alert("Usuário cadastrado com sucesso!");
        formCadastro.reset();
        mensagemErro.textContent = "";
        window.location.href = "index.html"; // Redireciona para a página de login
    });
});