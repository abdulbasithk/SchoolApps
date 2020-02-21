const router = require('express').Router()
const StudentRoute = require('./student')
const TeacherRoute = require('./teacher')
const SubjectRoute = require('./subject')
router.get('/', (req, res) => {
    res.render('home')
})

router.use('/students', StudentRoute)
router.use('/teachers', TeacherRoute)
router.use('/subjects', SubjectRoute)

module.exports = router