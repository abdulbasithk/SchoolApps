const router = require('express').Router()
const Controller = require('../controllers/StudentController')

router.get('/', Controller.showAll)

router.get('/add', Controller.showAdd)
router.post('/add', Controller.add)

router.get('/edit/:id', Controller.showEdit)
router.post('/edit/:id', Controller.edit)

router.get('/delete/:id', Controller.delete)

module.exports = router
