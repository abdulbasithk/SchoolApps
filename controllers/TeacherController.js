const { Teacher, Sequelize } = require('../models/index.js')
class TeacherController {
    static showAll(req, res) {
        let msg = req.app.locals.success
        delete req.app.locals.success
        let search = req.query.search || ''
        Teacher.findAll({
            where: {
                first_name: {
                    [Sequelize.Op.iLike]: `%${search}%`
                }
            }, 
            order: ['id']
        })
            .then((teachers) => {
                res.render("teacher/teacher", { data: teachers, msg: msg })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static showAdd(req, res) {
        res.render('teacher/add', {error: []})
    }

    static add(req, res) {
        let error = TeacherController.validator(req.body.first_name, req.body.email, req.body.gender)
        if(error.length > 0) {
            res.render('teacher/add', { error })
        } else {
            Teacher.create(req.body)
                .then(data => {
                    let msg = `SUCCESS ADD TEACHER ${req.body.first_name} TO TEACHER LIST`
                    req.app.locals.success = msg
                    res.redirect('/teachers')
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static showEdit(req, res) {
        Teacher.findAll({
            where: {
                id: +req.params.id
            }
        })
            .then(teachers => {
                req.app.locals.data = teachers[0]
                res.render('teacher/edit', {data: teachers[0].dataValues, error:[]})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static edit(req, res) {
        let error = TeacherController.validator(req.body.first_name, req.body.email, req.body.gender)
        let data = req.app.locals.data
        if(error.length > 0) {
            res.render('teacher/edit/', {data: data, error: error})
        } else {
            Teacher.update(req.body, {
                where: {
                    id: +req.params.id
                }
            })
            .then(data => {
                let msg = `SUCCESS EDIT ${req.body.first_name} TO CORRECT VALUE`
                req.app.locals.success = msg
                res.redirect('/teachers')
            })
            .catch(err => {
                res.send(err)
            })
        }
    }

    static delete(req, res) {
        Teacher.findAll({
            where: {
                id: +req.params.id
            }
        })
            .then(data => {
                Teacher.destroy({
                    where: {
                        id: +req.params.id
                    }
                })
                .then(result => {
                    let msg = `SUCCESS DELETE DATA ${data[0].dataValues.first_name} FROM DATABASE`
                    req.app.locals.success = msg
                    res.redirect('/teachers')
                    
                })
            })
    }

    static validator (first_name, email, gender) {
        let error = []
        if(first_name.length < 4) error.push(`First Name is required and must more than 4 character`)
        let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!email.match(emailValidator)) error.push(`Email is required and must like example@example.com`)
        if(gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female') error.push(`Invalid Gender`)

        return error
    }
}

module.exports = TeacherController