const express = require('express')
const router = express.Router()
const axios = require('axios')
const registry = require('./registry.json')
let model = require('../user/user')
const { createJWT, checkJWT, createRefreshToken } = require('../modules/jwt')



router.all('/:apiName/*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (registry.services[req.params.apiName]) {
        axios({
            method: req.method,
            url: registry.services[req.params.apiName].url + req.params[0],
            headers: req.headers,
            data: req.body
        }).then((response) => {
            res.send(response.data)
        }).catch((error) => {
            res.send(error)
        })
    } else {
        res.send("API name doesn't exist")
    }

})

router.post('/authenticate', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const mail = req.body.email
    const password = req.body.password
    
    if(typeof(req.params.token) !== 'undefined'){
        let token = req.params.token
    } 

    model.user.findOne({
        where:
        {
            email: mail,
            password: password
        },
        include : [{model : model.refresh_token}]
    }).then(user => {

        if (!user) {
            return res.status(550).send('Utilisateur inconnu')
        }
      
        if(typeof(req.params.token) !== 'undefined'){
            let checkJwt = checkJWT(token)
            if (checkJwt == 'renew'){
                 token = createJWT({ id: user.id, role: user.id_role, nom : user.nom , prenom : user.prenom })
            }

        }else{
             token = createJWT({ id: user.id, role: user.id_role, nom : user.nom , prenom : user.prenom })
         
        }

     

        res.status(200).json({ isConnected: true, token: token })
    }).catch((error) => {
        console.log(error)
        res.status(500).json({ isConnected: false })
    })
})



module.exports = router