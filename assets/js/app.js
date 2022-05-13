import { valida } from "./ValidaForm.js";
//pegando todos os inputs
const inputs = document.querySelectorAll('input');

inputs.forEach(input =>{

    if(input.dataset.tipo==='preco'){
        SimpleMaskMoney.setMask(input,{
            prefix: 'R$ ',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'move'  
        })
    }


    input.addEventListener('blur',(evento) =>{
        valida(evento.target);
    })
})