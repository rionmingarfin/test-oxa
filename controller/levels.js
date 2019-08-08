'use strich'

const response = require('../response/response')
const connect = require('../database/connect')

exports.welcome = (req, res) => {
    response.ok('welocme', res)
}
exports.getAll = (req, res) => {
    connect.query(
        'SELECT * FROM levels',
        function (error, rows, field) {
            if (error) {
                res.status(400).json('error')
            } else {
                res.json(rows)
            }
        }
    )
}
exports.insert = (req, res) => {
    const level = req.body.level
    const check = req.body.check_in
    connect.query(
        'INSERT INTO levels SET level=?,check_in=?',
        [level,check],
        function (error, rows, field) {
            if (error) {
                res.status(400).json('error')
            } else {
                let Id = rows.insertId
                const data = {
                    status: 202,
                    message: 'insert data succesfully',
                    result: {
                        id: Id,
                        level: level,
                        check_in :check,
                    }
                }
                return res.status(202).json(data).end()
            }
        }
    )
}

exports.update = (req, res) => {
    const id = req.params.id
    const level = req.body.level
    const check = req.body.check_in

    connect.query(
        'UPDATE levels SET level=?,check_in=? WHERE id=?',
        [level,check,id],
        function (error, rows, field) {
            if (error) {
                res.status(202).res.json('error')
            } else {
                let data = {
                    status: 202,
                    message: 'update data succesfully',
                    result: {
                        id: parseInt(id),
                        level: level,
                        check_in :check,
                    }
                }
                res.status(202).json(data).end()
            }
        }
    )
}

exports.delete = (req, res) => {
    const id = req.params.id
    if (id === 0 || id === '') {
        response.error('error',res)
    } else {
        connect.query(
            'DELETE FROM levels WHERE id=?',
            [id],
            function (error, rows, field) {
                if (error) {
                    res.status(202).json('error')
                } else {
                    if (rows.affectedRows === 0 || rows.affectedRows ==='') {
                        response.error('error',res)
                    }else { 
                    const data = {
                        status : 202,
                        message : 'delete data succesfully',
                        result : {
                            id : id
                        }
                    }
                    return res.status(202).json(data).end()
                    }
                }
            }
        )
    }
}