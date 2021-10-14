const express = require('express');
const cors = require('cors');
const mongoose= require('mongoose');
const department_controller = require('./department_controller');
const produto_controller = require('./produto_controller')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//mongodb.com, banco usado na biblioteca
mongoose.connect("mongodb+srv://gabriel_rocha:gabriel_rocha@cluster0.uucs8.mongodb.net/aplicacao_http?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });


//departamento
app.use('/departments',department_controller);
app.use('/produtos',produto_controller);


app.listen(3000);

//no inicio vai retornar [] no browzer, porque nao tem nada no banco