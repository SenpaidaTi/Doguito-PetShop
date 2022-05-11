import { valida } from "./ValidaForm.js";
//pegando todos os inputs
const inputs = document.querySelectorAll('input');

inputs.forEach(input =>{
    input.addEventListener('blur',(evento) =>{
        valida(evento.target);
    })
})