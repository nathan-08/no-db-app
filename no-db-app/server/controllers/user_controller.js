// USER CONTROLLER //

user_array = [] //this is an array of users with properties name, favorites, id
userID = 1

module.exports = {

    create: (req, res) => {
        let { user } = req.body
        let userWithID = Object.assign({}, { id: userID }, user)
        user_array.push(userWithID)
        res.status(200).send(userWithID)
        console.log(`fav num: ${req.body.user.name}, id: ${userWithID.id}`)
    },

    read: (req, res) => {
        const userName = req.params.name
        let index = user_array.findIndex(user => user.name === userName)
        res.status(200).send(user_array[index])
        console.log('user data retrieved')
    },
    update: (req, res) => {
        const userName = req.params.name
        let index = user_array.findIndex(user => user.name === userName)
        user_array[index].pokemon.push(req.body.name)
        
        res.status(200).send(user_array[index])
        console.log(`updated user's pokemon: ${req.body.name}`)
    }



}
