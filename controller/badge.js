'use strich'

const response = require('../response/response')
const connect = require('../database/connect')

exports.welcome = (req, res) => {
    response.ok('welocme', res)
}
exports.getAll = (req, res) => {
    connect.query(
        'SELECT * FROM badge',
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
    const no = req.body.no_badge
    const name = req.body.name
    const level = req.body.level
    connect.query(
        'INSERT INTO badge SET no_badge=?,name=?,level=?',
        [no, name, level],
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
                        no_badge : no,
                        name: name,
                        level: level
                    }
                }
                return res.status(202).json(data).end()
            }
        }
    )
}

exports.update = (req, res) => {
    const id = req.params.id
    const no = req.body.no_badge
    const name = req.body.name
    const level = req.body.level
    connect.query(
        'UPDATE badge SET no_badge=?,name=?,level=? WHERE id=?',
        [no,name, level, id],
        function (error, rows, field) {
            if (error) {
                res.status(202).res.json('error')
            } else {
                let data = {
                    status: 202,
                    message: 'update data succesfully',
                    result: {
                        id: parseInt(id),
                        no_badge : no,
                        name: name,
                        level: level
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
        response.error('error', res)
    } else {
        connect.query(
            'DELETE FROM badge WHERE id=?',
            [id],
            function (error, rows, field) {
                if (error) {
                    res.status(202).json('error')
                } else {
                    if (rows.affectedRows === 0 || rows.affectedRows === '') {
                        response.error('error', res)
                    } else {
                        const data = {
                            status: 202,
                            message: 'delete data succesfully',
                            result: {
                                id: id
                            }
                        }
                        return res.status(202).json(data).end()
                    }
                }
            }
        )
    }
}