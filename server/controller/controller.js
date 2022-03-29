var userdb = require('../model/model');

const pdf = require('html-pdf');
const option = {format:'A4',orientation:'landscape'};
const fs = require('fs');

exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: 'user cannot be emity'});
    }
    const user = new userdb({
        fullName:req.body.fullName,
        passportNum:req.body.passportNum,
        collectedDate:req.body.collectedDate,
        dbo:req.body.dbo,
        phone:req.body.phone,
        resultDate:req.body.resultDate,
        reviewedBy:req.body.reviewedBy,
        sampleId:req.body.sampleId,
        sex:req.body.sex,
    });

    user.save(user)
    .then(data =>{
        res.send(data._id);
    }).catch(err =>{
        res.status(500).send({message:'error while saving'});
    })

}

exports.find = (req,res) =>{
    if(!req.body){
        res.status(400).send({message: 'user cannot be emity'});
    }
    const id = req.params.id;
    userdb
    .findById(id)
    .then(data =>{
        res.render('index',{user:data});
    }).catch(err =>{
        res.status(500).send({message:'error while finding'});
    })
} 

exports.detail = (req,res) =>{
    if(!req.body){
        res.status(400).send({message: 'user cannot be emity'});
    }
    const id = req.params.id;
    userdb
    .findById(id)
    .then(data =>{
        // res.render('detail',{user:data});

        res.render('detail',{user:data},function(err,html){
            pdf.create(html, options).toFile('../public/detail.pdf', function(errr, result) {
                if (errr) {
                    return console.log(err);
                }else{
                    console.log(res);
                    var datafile = fs.readFileSync('../public/detail.pdf');
                    res.header('content-type','application/pdf');
                    res.send(datafile); 
                }
              });
        })
    }).catch(err =>{
        res.status(500).send({message:'error while finding'});
    })
} 
