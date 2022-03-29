const express = require('express');
const controller = require('../controller/controller');



const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index');
});


// API
router.post('/api/user',controller.create)


module.exports = router;