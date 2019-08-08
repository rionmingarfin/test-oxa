'use strich'

const response = require('../response/response')
const connect = require('../database/connect')
const moment = require('moment')

exports.welcome = (req, res) => {
    response.ok('welocme', res)
}

exports.getAll = (req, res) => {
    connect.query(
        `SELECT level_user.id AS id,level_user.id_user AS id_user,level_user.total_level AS total_level,level_user.no_badge AS no_badge,badge.name AS name,levels.level AS level,level_user.total_check_in AS total_check_in,badge.level AS total_level_badge
        FROM level_user 
        JOIN user ON level_user.id_user = user.id
        JOIN levels ON level_user.total_level = levels.level
        JOIN badge ON level_user.no_badge =badge.id`,
        function (error, rows, field) {
            if (error) {
                res.status(400).json('error')
            } else {
                res.json(rows)
            }
        }
    )
}
exports.getIdUser = (req, res) => {
    const id = req.params.id
    connect.query(
        `SELECT level_user.id AS id,level_user.id_user AS id_user,level_user.total_level AS total_level,level_user.no_badge AS no_badge,badge.name AS name,levels.level AS level,level_user.total_check_in AS total_check_in,badge.level AS total_level_badge
        FROM level_user 
        JOIN user ON level_user.id_user = user.id
        JOIN levels ON level_user.total_level = levels.level
        JOIN badge ON level_user.no_badge =badge.id WHERE id_user=?`, [id],
        function (error, rows, field) {
            if (error) {
                res.status(400).json('error')
            } else {
                res.json(rows)
            }
        }
    )
}
exports.update = (req, res) => {
    var dateNow = new Date()
    var tgl = dateNow.getDate()
    var mont = dateNow.getMonth()
    var th = dateNow.getFullYear()
    var sql = `SELECT level_user.id AS id,level_user.id_user AS id_user,level_user.total_level AS total_level,level_user.no_badge AS no_badge,badge.name AS name,levels.level AS level,level_user.total_check_in AS total_check_in,levels.check_in AS check_in,badge.level AS total_level_badge
    FROM level_user 
    JOIN user ON level_user.id_user = user.id
    JOIN levels ON level_user.total_level = levels.level
    JOIN badge ON level_user.no_badge =badge.id WHERE id_user=${req.user.rows[0].id}`
    connect.query(
        `SELECT * FROM level_user WHERE id_user=${req.user.rows[0].id}`,
        function (error, rows, field) {
            if (error) {
                return res.status(400).json('error ambil')
            } else {
                let date = rows[0].date
                // console.log(date)
                let dateConvert = moment(date).format('YYYY-MM-DD')
                month = (mont.toString().length == 1) ? '0' + mont : mont
                tglNow = (tgl.toString().length == 1) ? '0' + tgl : tgl
                var str = th + "-" + month + "-" + tglNow
                // console.log(str)
                // console.log("date cek" + dateConvert)
                if (dateConvert == str) {
                    return res.status(202).json(`can't check_in,please come back tomorrow`)
                } else {
                    connect.query(
                        `UPDATE level_user SET total_check_in=total_check_in+1,date='${str}' WHERE id_user=${req.user.rows[0].id}`,
                        function (error, rows, field) {
                            if (error) {
                                return res.status(400).json('error update')
                            } else {
                                connect.query(
                                    sql,
                                    function (error, rows, field) {
                                        if (error) {
                                            return res.status(400).json('error from')
                                        } else {
                                            let check_in = parseInt(rows[0].check_in)
                                            let total_check_in = parseInt(rows[0].total_check_in)
                                            if (total_check_in >= check_in) {
                                                connect.query(
                                                    `UPDATE level_user SET total_level=total_level+1 WHERE id_user=${req.user.rows[0].id}`,
                                                    function (error, rows, field) {
                                                        if (error) {
                                                            return res.status(400).json('error update level')
                                                        } else {
                                                            connect.query(
                                                                sql,
                                                                function (error, rows, field) {
                                                                    if (error) {
                                                                        res.status(400).json('error update no_badge')
                                                                    } else {
                                                                        let level = rows[0].level
                                                                        let total_level_badge = rows[0].total_level_badge
                                                                        console.log(rows)
                                                                        console.log("total" + total_level_badge)
                                                                        if (level >= total_level_badge) {
                                                                            connect.query(
                                                                                `UPDATE level_user SET no_badge=no_badge+1 WHERE id_user=${req.user.rows[0].id}`,
                                                                                function (error, rows, field) {
                                                                                    if (error) {
                                                                                        return res.status(400).json('error')
                                                                                    } else {
                                                                                        const data = {
                                                                                            status: 202,
                                                                                            message: 'update data succesfully',
                                                                                        }
                                                                                        res.status(202).json(data).end()
                                                                                    }
                                                                                }
                                                                            )
                                                                        } else {
                                                                            const data = {
                                                                                status: 202,
                                                                                message: 'update data succesfully',
                                                                            }
                                                                            res.status(202).json(data).end()
                                                                        }
                                                                    }
                                                                })
                                                        }
                                                    }
                                                )
                                            } else {
                                                const data = {
                                                    status: 202,
                                                    message: 'update data succesfully',
                                                }
                                                res.status(202).json(data).end()
                                            }
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        }
    )
}