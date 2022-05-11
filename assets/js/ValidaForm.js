//validando o formulario
const dataNascimento = document.querySelector('#nascimento');
dataNascimento.addEventListener('blur', (evento)=>{
    validaDataNascimento(evento.target);
})


const validaDataNascimento = (input) =>{
    const dataRecebida = new Date(input.value);
    let mensagem = "";

    
    if(!maiorQue18(dataRecebida)){
        mensagem = 'voce deve ser maior que 18 para se cadastrar!.'
    }

    input.setCustomValidity(mensagem);
}


//formatando ele 
const validaCPF = (input) =>{
    const cpfFormatado = input.value.replice(/\D/g,'')
    let mensagem = '';

    if(!checaCPFRepetido(cpfFormatado)){
        mensagem ='O cpf digitado não e valido';
    }

    input.setCustomValidity(mensagem);
}

const checaCPFRepetido = (cpf) =>{
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];
    let cpfValido = true;

    valoresRepetidos.forEach(valor =>{
        if(valor == cpf){
            cpfValido = false;
        }
    })

    return cpfValido
}
const maiorQue18 = (data) =>{
    const dataAtual = new Date();
    const DataMais18 = new Date(data.getUTCFullYear()+18, data.getUTCMonth(), data.getUTCDate());


    /*Fazendo comparação  se pessoa tem 18 anos*/
    return DataMais18 <= dataAtual;
}



export const valida =(input) =>{
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
       input.parentElement.classList.remove('input-container--invalido');
       input.parentElement.querySelector('.input-mensagem-erro').innerHTML =''
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
    }

}

//vetor com tipos de erros

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patterMismatch',
    'customError'
];
const mensagemDeErro = {
    nome:{
        valueMissing:'O compo nome nao pode esta vazio'
    },
    email:{
        valueMissing: 'O campo de email nao pode esta vazio',
        typeMismatch: 'O emaail digitado nao e valido'
    },

    senha:{
        valueMissing: 'O campo de senha nao pode vazio.',
        patterMismatch:'A senha  deve conter entre 6 a 12 caracteres, deve  conter pelo menos uma letra maiúscula um número e nao deve conter simbolos'
    },

    dataNascimento:{
        valueMissing: 'o capo de data de nascimento nao pode esta vazio.',
        customError: 'voce deve ser maior que 18 anos para se cadastrar.'
    },
    cpf:{
        valueMissing: 'O campo de CPF não pode estar vazio',
        customError: 'O CPF digitado não é válido'
    }
}
//pegando os tipo de erro com um laço de repetição
const mostraMensagemDeErro = (tipoDeInput, input) =>{
    let mensagem ='';
    tiposDeErro.forEach(erro =>{
        if(input.validity[erro]){
            mensagem = mensagemDeErro[tipoDeInput][erro];
        }
    })
    return mensagem
}

const validadores =  {
    dataNascimento: input => validaDataNascimento(input),
    cpf:input =>validaCPF(input)
}
