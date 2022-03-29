const axios = require('axios');

exports.homeRout = (req,res)=>{
    axios.get('http://localhost:8080/icladdis/viewresult/6242b79c7d6c05ba7cee2ebb')
    .then(function(response){
        res.render('index',{user:response.data});
    }).catch(err =>{
        res.send('note found');
    })
}