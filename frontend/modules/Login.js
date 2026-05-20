const validator = require('validator');

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    };

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    };

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const senhaInput = el.querySelector('input[name="senha"]');
        let error = false;

        // Remove todas as mensagens de erro antigas deste formulário antes de validar novamente
        for(let errorText of el.querySelectorAll('.error-msg')) {
            errorText.remove();
        }

        if (!emailInput || !senhaInput) {
            console.error('Campos de e-mail ou senha não encontrados no HTML deste formulário.');
            return; // Impede que o código quebre tentando ler .value de null
        }

        if(!validator.isEmail(emailInput.value)) {
            this.criaErro(emailInput, 'E-mail inválido');
            error = true;
        }
        
        if(senhaInput.value.length < 8 || senhaInput.value.length > 24) {
            this.criaErro(senhaInput, 'A senha precisa ter entre 8 e 24 caracteres!');
            error = true;
        }

        if(!error) el.submit();
    };

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-msg', 'text-danger'); // 'text-danger' deixa vermelho no Bootstrap
        campo.insertAdjacentElement('afterend', div); // Insere a div logo após o input
    }
};
