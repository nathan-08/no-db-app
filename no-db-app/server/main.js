const   app = require('express')(),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        port = 3001;

        app.use(bodyParser.json())
        app.use(cors());
app.get('/test', ( req, res )=> {
    res.status(200).send('working')
})
/*==+==+==END_SERVER_SETUP==+==+==+==+==+==+==+==+==+==+==+==*/





