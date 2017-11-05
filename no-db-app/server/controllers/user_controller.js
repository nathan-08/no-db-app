// USER CONTROLLER //

user_array = [] //this is an array of users with properties name, favorites, id
userID = 1

module.exports = {

    create: (req, res) => {
        let { user } = req.body
        let userWithID = Object.assign({}, {id: userID}, user )
        user_array.push( userWithID )
        res.status(200).send( userWithID )
        console.log(`fav num: ${req.body.user.name}, id: ${userWithID.id}`)
    }



}
