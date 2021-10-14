//definicao das rotas

var express = require('express');
var router = express.Router();

//busca o modelo criado
var Department = require('./department');


router.post('/', (req, res) => {
    let dep = new Department({
        name: req.body.name
    });

    dep.save((err, d) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(d);
    })

});

//listar
router.get('/', (req, res) => {
    Department.find().exec((err, deps) => {

        if (err)
            res.status(500).send(err)
        else
            res.status(200).send(deps)
    })

});


//deletar
//usa como assincrona

router.delete('/:id',async(req,res)=>{
    try{

        let id = req.params.id; //id capturado atravez da rota
        await Department.deleteOne({_id:id}) //_id é do banco mongo
        res.status(200).send({})
    }catch(err){
        res.status(500).send({msg:'Internal error',error:err})
    }

})//delete


//editar
router.patch('/:id',(req,res)=>{

    Department.findById(req.params.id,(err,dep)=>{
        if(err)
            res.status(500).send(err);//erro servidor
        else if(!dep)
            res.status(404).send({}); //passa objeto vazio porq nao encontrou
        else{
            dep.name = req.body.name;
            dep.save()
            .then((d)=>res.status(200).send(d))    
            .catch((e)=>res.status(500).send(e))
        }
    })
})

module.exports = router;