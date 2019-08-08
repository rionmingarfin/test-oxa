'use strich'

module.exports  = function (app){
    const badge = require('../controller/badge')
    const level = require('../controller/levels')
    const user = require('../controller/user')
    const level_user = require('../controller/level_user')
    const auth = require('../controller/auth')

    //routes badge
    app.get('/',badge.welcome)
    app.post('/api/v1',badge.insert)
    app.get('/api/v1',badge.getAll)
    app.patch('/api/v1/:id',badge.update)
    app.delete('/api/v1/:id',badge.delete)

    //levels
    app.get('/',level.welcome)
    app.post('/api/v2',level.insert)
    app.get('/api/v2',level.getAll)
    app.patch('/api/v2/:id',level.update)
    app.delete('/api/v2/:id',level.delete)

    //user
    app.post('/api/v3',user.insert)
    app.post('/api/v3/login',user.login)
    app.delete('/api/v3/:id',user.delete)

    //level_user
    app.get('/api/v4',level_user.getAll)
    app.get('/api/v4/:id',level_user.getIdUser)
    app.patch('/api/v4',auth,level_user.update)
}