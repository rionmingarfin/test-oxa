'use strich'
require('dotenv/config')
const crypto = require('crypto')
const algorithm = process.env.ALGORTIHM
const password = process.env.PASSWORD_ALGORITHM
const connect = require('../database/connect')
const jwt = require('jsonwebtoken')


function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}
exports.insert = (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = encrypt(req.body.password)

    connect.query(
        `SELECT * from user where username=\'${username}\' LIMIT 1`,
        function (error, rows, field) {
            if (error) {
                res.status(400).json('error')
            } else {
                if (rows != '') {
                    return res.send({
                        message: 'Username is exist'
                    })
                } else {
                    connect.query(
                        `SELECT * from user where email=\'${email}\' LIMIT 1`,
                        function (error, rowss, field) {
                            if (error) {
                                res.status(400).json('email error')
                            } else {
                                if (rowss != '') {
                                    return res.send({
                                        message: 'Email has been registered'
                                    })
                                } else {
                                    connect.query(
                                        `INSERT INTO user SET username=?,email=?,password=?`,
                                        [username, email, password],
                                        function (error, rows, field) {
                                            if (error) {
                                                res.status(400).json('insert error')
                                            } else {
                                                let id_user = rows.insertId
                                                connect.query(
                                                    `INSERT INTO level_user SET id_user=${id_user},total_level=1,no_badge=1,total_check_in=0,date=0000-00-00`,
                                                    function(error,rows,field){
                                                        if (error) {
                                                            res.status(400).send('insert level_user error')
                                                        }else{
                                                            connect.query(
                                                                `SELECT *  FROM user ORDER BY id DESC LIMIT 1`, function (error, rowssss, field) {
                                                                    if (error) {
                                                                        console.log(error);
                                                                    } else {
                                                                        return res.send({
                                                                            data: rowssss,
                                                                            message: "Data has been saved"
                                                                        })
                                                                    }
                                                                }
                                                            )
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
            'DELETE FROM user WHERE id=?',
            [id],
            function (error, rows, field) {
                if (error) {
                    res.status(400).json('error')
                } else {
                    connect.query(
                        `DELETE FROM level_user WHERE id_user=${id}`,
                        function(error,rows,field){
                            if (error) {
                                res.status(400).json('level_user error')
                            }else{
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
        )
    }
}

exports.login = function (req, res) {
    const username = req.body.username || '';
    const password = req.body.password || '0';
    let encrypted = encrypt(password)
    const query = `SELECT * FROM user WHERE username='${username}' AND password='${encrypted}'`;
    connect.query(
        query,
        function (error, rows, field) {
            console.log(query)
            if (error) {
                return res.send({
                    status: 403,
                    message: 'forbidden',
                })
            }
            else {
                if (rows != '') {
                    jwt.sign({ rows }, "secretKey", (err, token) => {
                        // console.log("token" + token)
                        return res.send({
                            status: 200,
                            data: rows,
                            token: token
                        })
                    });
                }
                else {
                    return res.send({
                        status: 403,
                        message: 'Incorrect username or password',
                    })
                }
            }
        }
    )
}