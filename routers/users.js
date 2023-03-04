const express = require('express')
const router = express.Router()

const {getAllUsers, getSingleUser, deleteUser, updateUser, createUser} = require('../controllers/users')

router.post('/createUser', createUser)
router.get('/getAllUsers', getAllUsers)
router.get('/getUser/:id', getSingleUser)
router.delete('/deleteUser/:id', deleteUser)
router.put('/updateUser', updateUser)


module.exports = router