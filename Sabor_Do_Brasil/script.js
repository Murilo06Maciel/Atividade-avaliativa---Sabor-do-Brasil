document.addEventListener("DOMContentLoaded", function () {
    // ========== ELEMENTOS GERAIS ==========
    const modalLogin = document.getElementById("modal-login");
    const btnCancelar = document.getElementById("btn-cancelar");
    const btnEntrar = document.getElementById("btn-entrar");
    const btnIrCadastro = document.getElementById("btn-ir-cadastro");
    const btnLogin = document.getElementById("btn-login");
    const mensagemErro = document.getElementById("mensagem-erro");
    const totalLikes = document.getElementById("total-likes");
    const totalDislikes = document.getElementById("total-dislikes");
    const perfilContainer = document.getElementById("perfil-container");

    // ========== ELEMENTOS OPCIONAIS ==========
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

    // Recupera usuário logado do localStorage (se existir)
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // Exibe o modal de login quando o botão "Login" for clicado
    btnLogin.addEventListener("click", () => {
        modalLogin.style.display = "block";
    });

    // Fecha o modal de login ao clicar em "Cancelar"
    btnCancelar.addEventListener("click", () => {
        modalLogin.style.display = "none";
        mensagemErro.textContent = ""; // limpa a mensagem de erro
    });

    // Redireciona o usuário para a página de cadastro
    btnIrCadastro.addEventListener("click", () => {
        window.location.href = "cadastro.html";
    });

    // Valida e realiza o login ao clicar em "Entrar"
    btnEntrar.addEventListener("click", () => {
        const nickname = document.getElementById("nickname").value.trim();
        const senha = document.getElementById("senha").value;

        // Busca a lista de usuários cadastrados
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verifica se o usuário existe com o nickname e senha informados
        const usuario = usuarios.find(u => u.nickname === nickname && u.senha === senha);

        if (usuario) {
            // Login bem-sucedido: salva o usuário no localStorage e recarrega a página
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            location.reload(); // recarrega para aplicar o login
        } else {
            // Erro de login
            mensagemErro.textContent = "Nickname ou senha incorretos.";
        }
    });

    // Se o usuário já estiver logado, mostra a foto de perfil e esconde os botões de login/cadastro
    if (usuarioLogado) {
        perfilContainer.style.display = "block";
        document.querySelector(".login").style.display = "none";
    }

    // Configura os botões de like e dislike para cada publicação
    document.querySelectorAll(".publicacao").forEach(pub => {
        const likeBtn = pub.querySelector(".like");
        const dislikeBtn = pub.querySelector(".dislike");
        const likesSpan = pub.querySelector(".likes");
        const dislikesSpan = pub.querySelector(".dislikes");

        // Ao clicar no like, incrementa o contador e atualiza o total
        likeBtn.addEventListener("click", () => {
            let count = parseInt(likesSpan.textContent);
            likesSpan.textContent = count + 1;
            atualizarTotais(); // atualiza contagem total
        });

        // Ao clicar no dislike, incrementa o contador e atualiza o total
        dislikeBtn.addEventListener("click", () => {
            let count = parseInt(dislikesSpan.textContent);
            dislikesSpan.textContent = count + 1;
            atualizarTotais(); // atualiza contagem total
        });
    });

    // Função para atualizar os totais de likes e dislikes no painel lateral
    function atualizarTotais() {
        let totalLike = 0;
        let totalDislike = 0;

        // Soma todos os likes das publicações
        document.querySelectorAll(".likes").forEach(span => {
            totalLike += parseInt(span.textContent);
        });

        // Soma todos os dislikes das publicações
        document.querySelectorAll(".dislikes").forEach(span => {
            totalDislike += parseInt(span.textContent);
        });

        // Atualiza os elementos no painel lateral
        totalLikes.textContent = totalLike;
        totalDislikes.textContent = totalDislike;
    }

    // Exibe ou oculta a área de comentários ao clicar no ícone de comentário
    document.querySelectorAll(".comentarios").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const container = document.querySelectorAll(".comentario-container")[index];
            container.style.display = container.style.display === "none" ? "block" : "none";
        });
    });

    // Adiciona comentários quando o usuário clica no botão "Enviar"
    document.querySelectorAll(".btn-comentar").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const input = document.querySelectorAll(".comentario-container input")[index];
            const texto = input.value.trim();

            // Só adiciona comentário se não estiver vazio
            if (texto) {
                const divLista = document.querySelectorAll(".comentarios-lista")[index];
                const p = document.createElement("p");
                p.textContent = texto;
                divLista.appendChild(p); // adiciona o comentário na lista

                input.value = ""; // limpa o campo

                // Atualiza contador de comentários
                const numSpan = document.querySelectorAll(".num-comentarios")[index];
                numSpan.textContent = parseInt(numSpan.textContent) + 1;
            }
        });
    });

    // ========== FORMULÁRIO DE CADASTRO ==========
    const formCadastro = document.getElementById("form-cadastro");
    const mensagemErroCadastro = document.getElementById("mensagem-erro-cadastro");

    // Escuta o envio do formulário de cadastro
    formCadastro.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        // Coleta os valores dos campos
        const nome = document.getElementById("nome-cadastro").value.trim();
        const email = document.getElementById("email-cadastro").value.trim();
        const nickname = document.getElementById("nickname-cadastro").value.trim();
        const senha = document.getElementById("senha-cadastro").value;

        // Verifica se os campos estão preenchidos
        if (!nome || !email || !nickname || !senha) {
            mensagemErroCadastro.textContent = "Todos os campos são obrigatórios.";
            return;
        }

        // Obtém usuários já cadastrados ou cria um array vazio
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verifica se o e-mail ou nickname já está em uso
        const emailJaExiste = usuarios.some(user => user.email === email);
        const nicknameJaExiste = usuarios.some(user => user.nickname === nickname);

        if (emailJaExiste || nicknameJaExiste) {
            mensagemErroCadastro.textContent = "E-mail ou nickname já cadastrado.";
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
        mensagemErroCadastro.textContent = "";
        window.location.href = "index.html"; // Redireciona para a página de login
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const publicacoes = document.querySelectorAll(".publicacao");

    // Carrega contadores totais do localStorage ou define como 0
    let totalLikes = parseInt(localStorage.getItem("totalLikes")) || 0;
    let totalDislikes = parseInt(localStorage.getItem("totalDislikes")) || 0;

    document.getElementById("total-likes").textContent = totalLikes;
    document.getElementById("total-dislikes").textContent = totalDislikes;

    publicacoes.forEach(pub => {
        const pubId = pub.dataset.publicacaoId;

        const likeBtn = pub.querySelector(".like");
        const dislikeBtn = pub.querySelector(".dislike");
        const likeCount = pub.querySelector(".likes");
        const dislikeCount = pub.querySelector(".dislikes");

        const comentarioIcon = pub.querySelector(".comentarios");
        const comentarioContainer = pub.querySelector(".comentario-container");
        const btnComentar = pub.querySelector(".btn-comentar");
        const comentariosLista = pub.querySelector(".comentarios-lista");
        const inputComentario = pub.querySelector("input");
        const numComentarios = pub.querySelector(".num-comentarios");

        // Estado local por publicação
        let dados = JSON.parse(localStorage.getItem(`pub-${pubId}`)) || {
            likes: 0,
            dislikes: 0,
            comentarios: [],
            interagiu: null // "like", "dislike" ou null
        };

        // Atualiza interface
        likeCount.textContent = dados.likes;
        dislikeCount.textContent = dados.dislikes;
        numComentarios.textContent = dados.comentarios.length;
        dados.comentarios.forEach(txt => {
            const p = document.createElement("p");
            p.textContent = txt;
            comentariosLista.appendChild(p);
        });

        // Curtir
        likeBtn.addEventListener("click", () => {
            if (dados.interagiu === "like") return; // já curtiu

            if (dados.interagiu === "dislike") {
                dados.dislikes--;
                totalDislikes--;
            }

            dados.likes++;
            totalLikes++;
            dados.interagiu = "like";

            atualizarUI();
        });

        // Descurtir
        dislikeBtn.addEventListener("click", () => {
            if (dados.interagiu === "dislike") return; // já descurtiu

            if (dados.interagiu === "like") {
                dados.likes--;
                totalLikes--;
            }

            dados.dislikes++;
            totalDislikes++;
            dados.interagiu = "dislike";

            atualizarUI();
        });

        // Mostrar/ocultar comentários
        comentarioIcon.addEventListener("click", () => {
            comentarioContainer.style.display =
                comentarioContainer.style.display === "none" ? "block" : "none";
        });

        // Adicionar comentário
        btnComentar.addEventListener("click", () => {
            const inputComentario = comentarioContainer.querySelector("input"); // <- CORRETO
            const texto = inputComentario.value.trim();

            if (texto !== "") {
                dados.comentarios.push(texto);

                const novoComentario = document.createElement("p");
                novoComentario.textContent = texto;
                comentariosLista.appendChild(novoComentario);

                inputComentario.value = "";
                numComentarios.textContent = dados.comentarios.length;

                salvarDados();
            }
        });

        // Atualiza visual e salva
        function atualizarUI() {
            likeCount.textContent = dados.likes;
            dislikeCount.textContent = dados.dislikes;
            document.getElementById("total-likes").textContent = totalLikes;
            document.getElementById("total-dislikes").textContent = totalDislikes;
            salvarDados();
        }

        // Salva os dados dessa publicação e totais
        function salvarDados() {
            localStorage.setItem(`pub-${pubId}`, JSON.stringify(dados));
            localStorage.setItem("totalLikes", totalLikes);
            localStorage.setItem("totalDislikes", totalDislikes);
        }
    });
});