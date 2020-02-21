const { Student, Sequelize } = require('../models/index.js')
class StudentController {
    static showAll(req, res) {
        let msg = req.app.locals.success
        delete req.app.locals.success
        let search = req.query.search || ''
        Student.findAll({
            where: {
                first_name: {
                    [Sequelize.Op.iLike]: `%${search}%`
                }
            },
            order: ['id']
        })
            .then((students) => {
                let data = students.map(e => {
                    let birthdate = new Date(e.dataValues.birthdate)
                    birthdate = `${birthdate.getFullYear()}-${(birthdate.getMonth() + 1 < 10 ? '0': '') + (birthdate.getMonth() + 1)}-${(birthdate.getDay() < 10 ? '0': '') + (birthdate.getDay())}`
                    e.dataValues.birthdate = birthdate
                    return e
                })
                res.render("student/student", { data: data, msg: msg })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static showAdd(req, res) {
        res.render('student/add', { error: [] })
    }

    static add(req, res) {
        let error = StudentController.validator(req.body.first_name, req.body.email, req.body.birthdate, req.body.gender)
        if(error.length > 0) {
            res.render('student/add', { error })
        } else {
            Student.create(req.body)
                .then(data => {
                    let msg = `SUCCESS ADD STUDENTS ${data.first_name} TO STUDENTS LIST`
                    req.app.locals.success = msg
                    res.redirect('/students')
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static showEdit(req, res) {
        Student.findAll({
            where: {
                id: +req.params.id
            }
        })
            .then(students => {
                let data = students.map(e => {
                    let birthdate = new Date(e.dataValues.birthdate)
                    birthdate = `${birthdate.getFullYear()}-${(birthdate.getMonth() + 1 < 10 ? '0': '') + (birthdate.getMonth() + 1)}-${(birthdate.getDay() < 10 ? '0': '') + (birthdate.getDay())}`
                    e.dataValues.birthdate = birthdate
                    return e
                })
                req.app.locals.data = data[0]
                res.render('student/edit', { data: data[0], error: [] })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static edit(req, res) {
        let error = StudentController.validator(req.body.first_name, req.body.email, req.body.birthdate, req.body.gender)
        let data = req.app.locals.data
        if(error.length > 0) {
            res.render('student/edit', {data: data, error})
        } else {
            Student.update(req.body, {
                where: {
                    id: +req.params.id
                }
            })
            .then(data => {
                let msg = `SUCCESS EDIT ${req.body.first_name} TO CORRECT VALUE`
                req.app.locals.success = msg
                res.redirect('/students')
            })
            .catch(err => {
                res.send(err)
            })
        }
    }

    static delete(req, res) {
        Student.findAll({
            where: {
                id: +req.params.id
            }
        })
            .then(data => {
                Student.destroy({
                    where: {
                        id: +req.params.id
                    }
                })
                .then(result => {
                    let msg = `SUCCESS DELETE DATA ${data[0].dataValues.first_name} FROM DATABASE`
                    req.app.locals.success = msg
                    res.redirect('/students')
                    
                })
            })
    }

    static validator (first_name, email, birthdate, gender) {
        let error = []
        if(first_name.length < 4) error.push(`First Name is required and must more than 4 character`)
        let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!email.match(emailValidator)) error.push(`Email is required and must like example@example.com`)
        birthdate = new Date(birthdate)
        if(isNaN(birthdate.getFullYear())) error.push(`Input valid date`)
        if(gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female') error.push(`Invalid Gender`)

        return error
    }
}

module.exports = StudentController