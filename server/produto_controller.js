//definicao das rotas

var express = require('express');
var router_prod = express.Router();

//busca o modelo criado
var Produto = require('./produto');


router_prod.post('/', (req, res) => {
    let prod = new Produto({
        name: req.body.name
    });

    prod.save((err, p) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(p);
    })

});

//listar
router_prod.get('/', (req, res) => {
    Produto.find().exec((err, prods) => {

        if (err)
            res.status(500).send(err)
        else
            res.status(200).send(prods)
    })

});


//deletar
//usa como assincrona

router_prod.delete('/:id',async(req,res)=>{
    try{

        let id = req.params.id; //id capturado atravez da rota
        await Produto.deleteOne({_id:id}) //_id é do banco mongo
        res.status(200).send({})
    }catch(err){
        res.status(500).send({msg:'Internal error',error:err})
    }

})//delete


//editar
router_prod.patch('/:id',(req,res)=>{

    Produto.findById(req.params.id,(err,prod)=>{
        if(err)
            res.status(500).send(err);//erro servidor
        else if(!prod)
            res.status(404).send({}); //passa objeto vazio porq nao encontrou
        else{
            prod.name = req.body.name;
            prod.save()
            .then((p)=>res.status(200).send(p))    
            .catch((e)=>res.status(500).send(e))
        }
    })
})

module.exports = router_prod;