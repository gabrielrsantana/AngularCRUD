const express = require('express');
const cors = require('cors');
const mongoose= require('mongoose');
const department_controller = require('./department_controller');
const produto_controller = require('./produto_controller')
const app = express();

//configurações
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//CORS is a node.js package for providing a Connect/Express middleware 
//that can be used to enable CORS with various options.
app.use(cors());

//Conexão ao https://cloud.mongodb.com/, banco usado na biblioteca
//usuario e senha foram modificados para privacidade
//ga*****_****cha
mongoose.connect("mongodb+srv://usuario123:senha123@cluster0.uucs8.mongodb.net/aplicacao_http?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });


//departamento
app.use('/departments',department_controller);
app.use('/produtos',produto_controller);


app.listen(3000);

//no inicio vai retornar [] no browzer, porque nao tem nada no banco
