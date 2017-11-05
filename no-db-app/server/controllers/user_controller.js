// USER CONTROLLER //

user_array = [] //this is an array of users with properties name, favorites, id
userID = 1

module.exports = {

    create: (req, res) => {
        let { user } = req.body
        //check if username already exists, ifso send back error 
        user_array.map(e=>{
            if(e.name === user.name){
                res.status(200).send(false)
            }
        })
        let userWithID = Object.assign({}, { id: userID }, user)
        user_array.push(userWithID)
        res.status(200).send(userWithID)
        console.log(`fav num: ${req.body.user.name}, id: ${userWithID.id}`)
    },

    read: (req, res) => {
        const userName = req.params.name
        let index = user_array.findIndex(user => user.name === userName)
        //if returns -1, send false
        if(index===-1) res.status(200).send(false)
        res.status(200).send(user_array[index])
        console.log('user data retrieved')
    },
    update: (req, res) => {
        const userName = req.params.name
        let index = user_array.findIndex(user => user.name === userName)
        user_array[index].pokemon.push(req.body.name)
        
        res.status(200).send(user_array[index])
        console.log(`updated user's pokemon: ${req.body.name}`)
    },
    remove: (req, res) => {
        // user  // poke req.params
        const userName = req.params.user
        // find user in user_array
        let index = user_array.findIndex(user => user.name === userName)
        // splice given poke from user's pokemon array
        user_array[index].pokemon.splice( user_array[index].pokemon.indexOf(req.params.poke), 1 )
        res.status(200).send(user_array[index])
    }



}
