// USER CONTROLLER //

user_array = [] //this is an array of users with properties name, favorites, id
userID = 0

module.exports = {

    create: (req, res) => {
        let { user } = req.body
        user_array.push( user )
        res.status(200).send( user_array )
        console.log(`user_array updated: ${user_array[0].name}`)
    }



}
