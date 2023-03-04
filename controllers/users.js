//get all users

const {connectDB} = require('../db/db-connect')

const createUser = ((req, res) => {
    let userObj = req.body;
    connectDB((err, connection) => {
        if(err){
            console.log('failed to connect')
            return res.status(500).send(err)
        }
        let query = "insert into users set ?;"
        connection.query({
            sql:query,
            values:[userObj],
            timeout:3000
        }, function(err, rows) {
            if(err){
                console.log(err)
                return res.status(500).send(err)
            }
            rows = JSON.parse(JSON.stringify(rows))
            if(rows.affectedRows == 1){
                return res.status(200).json({msg: 'user created'})
            }
            return res.status(400).json({msg: 'failed to create user'})
        })
    })
})

const getAllUsers = ((req, res) => {
        connectDB((err, connection) => {
            if(err){
                console.log('failed to connect')
                return res.status(500).send(err)
            }
            let query = "select * from users;"
            connection.query({
                sql:query,
                values:[],
                timeout:3000
            }, function(err, rows) {
                if(err){
                    console.log(err)
                    return res.status(500).send(err)
                }
                if(rows.length == 0){
                    return res.status(400).json({msg: 'No users found'})
                }
                if(rows.length > 0){
                    console.log(rows)
                    return res.status(200).send(rows)
                }
            })
        })
})

const getSingleUser = ((req, res) => {
    const id = req.params.id
    connectDB((err, connection) => {
        if(err){
            console.log('failed to connect')
            return res.status(500).send(err)
        }
        let query = "select * from users where id = ?;"
        connection.query({
            sql:query,
            values:[id],
            timeout:3000
        }, function(err, rows) {
            if(err){
                console.log(err)
                return res.status(500).send(err)
            }
            if(rows.length == 0){
                return res.status(400).json({msg: 'user not found'})
            }
            if(rows.length > 0){
                return res.status(200).send(rows[0])
            }
        })
    })
})

const deleteUser = ((req, res) => {
    const id = req.params.id
    connectDB((err, connection) => {
        if(err){
            console.log('failed to connect')
            return res.status(500).send(err)
        }
        let query = "delete from users where id = ?;"
        connection.query({
            sql:query,
            values:[id],
            timeout:3000
        }, function(err, rows) {
            if(err){
                console.log(err)
                return res.status(500).send(err)
            }
            rows = JSON.parse(JSON.stringify(rows))
            if(rows.affectedRows == 1){
                return res.status(200).json({msg: 'Deleted'})
            }
            return res.status(400).json({msg: 'failed to delete'})
        })
    })
})

const updateUser = ((req, res) => {
    let id = req.body.id
    let userObj = {...req.body}
    connectDB((err, connection) => {
        if(err){
            console.log('failed to connect')
            return res.status(500).send(err)
        }
        let query = "update users set ? where id = ?;"
        connection.query({
            sql:query,
            values:[userObj,id],
            timeout:3000
        }, function(err, rows) {
            if(err){
                console.log(err)
                return res.status(500).send(err)
            }
            console.log(rows)
            rows = JSON.parse(JSON.stringify(rows))
            if(rows.affectedRows == 1){
                return res.status(200).json({msg: 'Updated'})
            }
            return res.status(400).json({msg: 'failed to update'})
        })
    })
})


module.exports = {getAllUsers, getSingleUser, deleteUser, updateUser, createUser}