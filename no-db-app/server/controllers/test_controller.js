// TEST CONTROLLER //

test_array = []

module.exports = {

    create: (req, res) => {
        let { user } = req.body
        test_array.push( user.name )
        res.status(200).send( test_array )
        console.log(`test_array updated: ${test_array}`)
    }



}

