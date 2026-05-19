const mongoose = require('mongoose');
const validator = require('validator');

const ContatosSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
});

const ContatosModel = mongoose.model('Contatos', ContatosSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    };

    async register() {
        this.valida();
        if(this.errors.length > 0) return;
        this.contato = await ContatosModel.create(this.body);
    };

    valida() {
        this.cleanUp();
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');
        if(!this.body.nome) this.errors.push('Nome é um campo obrigatório!');
        if(!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone!');
    };

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        };
    };

    static async buscaPorId(id) {
        if(typeof id !== 'string') return;
        const contatos = await ContatosModel.findById(id);
        return contatos;
    };
    
    static async buscaContatos() {
        const contatos = await ContatosModel.find()
            .sort({ criadoEm: -1 });
        return contatos;
    };

    async edit(id) {
        if(typeof id !== 'string') return;
        this.valida();
        if(this.errors.length > 0) return;
        this.contato = await ContatosModel.findByIdAndUpdate(id, this.body, { new: true });
    };

    static async delete(id) {
        if(typeof id !== 'string') return;
        const contato = await ContatosModel.findByIdAndDelete(id);
        return contato;
    };    
};

module.exports = Contato;
