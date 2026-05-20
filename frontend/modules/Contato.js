const validator = require('validator');

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        if (!this.form) return;
        this.events();
    }

    events() {
        // Intercepta o envio do formulário
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });

        const telefoneInput = this.form.querySelector('input[name="telefone"]');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, ""); // Remove tudo o que não for número
                value = value.slice(0, 11); // Limita o tamanho para no máximo 11 números
                value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca os parênteses do DDD
                value = value.replace(/(\d)(\d{4})$/, "$1-$2"); // Coloca o hífen nos últimos 4 dígitos
                e.target.value = value;
            });
        }
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        let error = false;

        // Remove erros anteriores
        for(let errorText of el.querySelectorAll('.error-msg')) {
            errorText.remove();
        }

        // Validação do Nome
        if (!nomeInput.value) {
            this.criaErro(nomeInput, 'Nome é um campo obrigatório.');
            error = true;
        }

        // Validação: Pelo menos um contato
        if (!emailInput.value && !telefoneInput.value) {
            this.criaErro(emailInput, 'Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
            this.criaErro(telefoneInput, 'Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
            error = true;
        }

        // Validação do E-mail (se preenchido)
        if (emailInput.value && !validator.isEmail(emailInput.value)) {
            this.criaErro(emailInput, 'E-mail inválido.');
            error = true;
        }

        // Validação do Telefone (se preenchido)
        // Remove tudo que não é número (os parênteses, espaço, hífen) e checa se tem 10 ou 11 números
        if (telefoneInput.value && telefoneInput.value.replace(/\D/g, '').length < 10) {
            this.criaErro(telefoneInput, 'Telefone inválido (precisa ter DDD e o número).');
            error = true;
        }

        if (!error) el.submit();
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-msg', 'text-danger');
        campo.insertAdjacentElement('afterend', div);
    }
}
