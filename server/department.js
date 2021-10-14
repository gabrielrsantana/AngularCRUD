// modelagem do banco
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//modelo dos dados no banco
var departmentSchema =  new Schema({
    name:String
});


//exportando , da o nome da tabela de Department
module.exports = mongoose.model("Department",departmentSchema);