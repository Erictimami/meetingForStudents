var require_1 = require('../controllers/control.js');
module.exports = function(app){
    // app.get('/eric', function(request, response){
    //     //about mysql
    //     require_1.testEric(request,response);  
    // })
    app.get('/route/users', function(request, response){
        require_1.findAllUsers(request, response);
    })
    app.get('/route/sessions', function(request, response){
        require_1.findAllSessions(request, response);
    })
    app.get('/route/sessions_2', function(request, response){
        require_1.findAllSessions_2(request, response);
    })

    app.get('/route/users/:id', function(request, response){
        require_1.findOneUser(request, response);
    })
    app.post('/route/users/username/:username', function(request, response){
        //console.log('request.params '+request.params.username)
        console.log('request.body password in routes.js '+request.body.password)
        console.log('request.body username in routes.js '+request.body.username)
        console.log('response.body data message: '+response.body)
        require_1.findOneUsername(request, response);
    })

    app.get('/route/sessions/:id', function(request, response){
        require_1.findOneSession(request, response);
    })
    app.post('/route', function(request, response){
        console.log("passing to routes: "+request);
        require_1.createUser(request, response);
    })
    app.post('/route/sessions/:id', function(request, response){
        console.log("Here in routes.js processing creation session: "+request.body);
        require_1.createSession(request, response); 
    })

    app.get('/route/mySessions/:id', function(request, response){
        require_1.findMySessions(request, response);
    })
 
    app.put('/route/sessions/:id', function(request, response){
        require_1.updateSession(request, response)
    })

    app.delete('/route/removeSession/:id', function(request, response){
        require_1.removeSession(request, response);
    })

    app.delete('/route/leaveSession/:id/:session_id', function(request, response){
        require_1.leaveSession(request, response);
    })
    app.post('/route/requestToSession', function(request, response){
        require_1.requestToSession(request, response);
    })
    app.put('/route/acceptToSession', function(request, response){
        require_1.acceptToSession(request, response);
    })
    app.get('/route/messages/:id', function(request, response){
        require_1.findMessageForSession(request, response);
    })
    app.post('/route/messages/:id/:session_id', function(request, response){
        console.log("Here in routes.js processing creation Message: "+request.body);
        require_1.createMessage(request, response);
    })
    app.get('/route/users_in_sessions', function(request, response){
        require_1.findUsers_in_Sessions(request, response);
    })
}