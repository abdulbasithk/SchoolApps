const { Subject, Sequelize } = require('../models/index.js')
class SubjectController {
    static showAll(req, res) {
        let msg = req.app.locals.success
        delete req.app.locals.success
        let search = req.query.search || ''
        Subject.findAll({
            where: {
                subject_name: {
                    [Sequelize.Op.iLike]: `%${search}%`
                }
            }
        })
            .then((subjects) => {
                res.render("subject/subject", { data: subjects, msg: msg })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static showAdd(req, res) {
        res.render('subject/add', {error: []})
    }

    static add(req, res) {
        let error = SubjectController.validator(req.body.subject_name)
        if(error.length > 0) {
            res.render('subject/add', { error })
        } else {
            Subject.create(req.body)
                .then(data => {
                    let msg = `SUCCESS ADD SUBJECT ${req.body.subject_name} TO SUBJECT LIST`
                    req.app.locals.success = msg
                    res.redirect('/subjects')
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static showEdit(req, res) {
        Subject.findAll({
            where: {
                id: +req.params.id
            }
        })
            .then(subjects => {
                req.app.locals.data = subjects[0]
                res.render('subject/edit', {data: subjects[0].dataValues, error:[]})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static edit(req, res) {
        let error = SubjectController.validator(req.body.subject_name)
        let data = req.app.locals.data
        if(error.length > 0) {
            res.render('subject/edit', {data: data, error: error})
        } else {
            Subject.update(req.body, {
                where: {
                    id: +req.params.id
                },
                order: ['id']
            })
            .then(data => {
                let msg = `SUCCESS EDIT ${req.body.subject_name} TO CORRECT VALUE`
                req.app.locals.success = msg
                res.redirect('/subjects')
            })
            .catch(err => {
                res.send(err)
            })
        }
    }

    static delete(req, res) {
        Subject.findAll({
            where: {
                id: +req.params.id
            }
        })
            .then(data => {
                Subject.destroy({
                    where: {
                        id: +req.params.id
                    }
                })
                .then(result => {
                    let msg = `SUCCESS DELETE DATA ${data[0].dataValues.subject_name} FROM DATABASE`
                    req.app.locals.success = msg
                    res.redirect('/subjects')
                    
                })
            })
    }

    static validator (subject_name) {
        let error = []
        if(first_name.length < 4) error.push(`First Name is required and must more than 4 character`)
        return error
    }
}

module.exports = SubjectController