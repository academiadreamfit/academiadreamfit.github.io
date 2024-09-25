const url = "https://go-wash-api.onrender.com/api/user";

async function cadastro(event) {
    // Evita o envio do formulário
    event.preventDefault();

    // Obtém os valores dos inputs
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value.trim();
    const cpfCnpj = document.getElementById('cpf_cnpj').value.trim();
    const dataNascimento = document.getElementById('data').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('conf_senha').value;
    const termos = document.getElementById('terms').checked;

    // Exemplo de como usar os valores obtidos
    const resposta = document.getElementById('resposta');
    
    // Verifica se todos os campos estão preenchidos
    if (!nome || !email || !cpfCnpj || !dataNascimento || !senha || !confirmarSenha) {
        resposta.style.color = 'red'
        resposta.textContent = "Todos os campos devem ser preenchidos!";
        return;
    }

     // Verifica se o CPF/CNPJ é composto apenas por números
     if (isNaN(cpfCnpj)) {
        resposta.style.color = 'red';
        resposta.textContent = "O CPF/CNPJ deve conter apenas números!";
        return;
    }

    // Verifica se a idade é válida (máximo de 90 anos)
    const dataAtual = new Date();
    const anoNascimento = new Date(dataNascimento).getFullYear();
    const idade = dataAtual.getFullYear() - anoNascimento;

    if (idade < 0 || idade > 100) {
        resposta.style.color = 'red'
        resposta.textContent = "A idade deve ser válida e não pode ultrapassar 100 anos!";
        return;
    }

    // Valida as senhas
    if (senha !== confirmarSenha) {
        resposta.style.color = 'red'
        resposta.textContent = "As senhas não conferem!";
        return;
    } else if (!termos) {
        resposta.style.color = 'red'
        resposta.textContent = "Você precisa aceitar os termos!";
        return;
    }

    // Se tudo estiver correto
    resposta.style.color = 'green'
    resposta.textContent = "Cadastro realizado com sucesso!";

    // Api

    let api = await fetch(url,{
        method:"POST",
        body:JSON.stringify({
            "name":nome,
            "email":email,
            "user_type_id":1,
            "password": senha,
            "cpf_cnpj": cpfCnpj,
            "terms": 1,
            "birthday":dataNascimento    
        }),
        headers:{
            'Content-Type':'application/json'
        }
    });

    if(api.ok) {
        let resposta = await api.json();
        alert('Usuario cadastrado')
        console.log(resposta);
        return;
    }

    let respostaErro = await api.json();
    alert(respostaErro.data.errors.cpf_cnpj)

}

// Adiciona o evento de clique ao botão
document.getElementById('botao').addEventListener('click', cadastro);