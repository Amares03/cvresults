const axios = require('axios');

exports.homeRout = (req,res)=>{
    axios.get('http://localhost:8080/icladdis/viewresult/')
    .then(function(response){
        res.render('index',{user:response.data});
    }).catch(err =>{
        res.send('note found');
    })
}