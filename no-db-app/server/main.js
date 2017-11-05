const   app = require('express')(),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        port = 3001;
        test_controller = require('./controllers/test_controller.js')
        user_controller = require('./controllers/user_controller.js')

        app.use(bodyParser.json())
        app.use(cors());

/*==+==+==END_SERVER_SETUP==+==+==+==+==+==+==+==+==+==+==+==*/

app.listen(port, ()=>console.log(`Listening on port: ${3001}`))

app.get('/test', ( req, res )=> {
    res.status(200).send('working')
})

app.post('/test', test_controller.create)

app.post('/api/users', user_controller.create)
app.get('/api/users/:name', user_controller.read)
app.put('/api/users/:name', user_controller.update)
app.put('/api/users/:user/:poke', user_controller.remove)



