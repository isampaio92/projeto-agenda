const Contatos = require('../models/ContatosModel');

exports.index = (req, res) => {
    res.render('contatos', {
        contatos: {}
    });
};

exports.register = async (req, res) => {
    try {
    const contatos = new Contatos(req.body);
    await contatos.register();

    if(contatos.errors.length > 0) {
        req.flash('errors', contatos.errors);
        req.session.save(() => res.redirect('back'));
        return;
    }

    req.flash('success', 'Contato salvo com sucesso!');
    req.session.save(() => res.redirect(`/contatos/${contatos.contatos._id}`));
    return;

    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contatos = await Contatos.buscaPorId(req.params.id)
    if(!contatos) return res.render('404');

    res.render('contatos', { contatos });
};

exports.edit = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        const contatos = new Contatos(req.body);
        await contatos.edit(req.params.id);

        if(contatos.errors.length > 0) {
            req.flash('errors', contatos.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contato editado com sucesso!');
        req.session.save(() => res.redirect(`/contatos/${contatos.contatos._id}`));
        return;

    } catch(e) {
        console.log(e);
        return res.render('404')
    }
}
