const express = require("express");
const app = express();


const pagamento = require("./models/Pagamento");
const usuario=require("./models/Usuario");
const path=require ('path');//enderço de cada rota
const router=express.Router();// trabalha com as rotas
const moment = require('moment')
const handlebars = require("express-handlebars");

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Rotas
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/pagamento', function(req, res){
    res.sendFile(path.join(__dirname+'/pagamento.html'));
});


router.post('/pagamento', function(req, res){
    
    pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(function(){
        res.redirect('/pagamento');
       
    }).catch(function(erro){
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro)
    })
     
});
router.get('/usuario', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});


router.post('/usuario', function(req, res){
    
    usuario.create({
        nome: req.body.nome,
        cpf: req.body.cpf
    }).then(function(){
        res.redirect('/pagamento');
       
    }).catch(function(erro){
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro)
    })
});
router.get('/lista', function(req, res){
    Pagamento.findAll().then(function(pagamentos){
        res.render('pagamento', {pagamentos: pagamentos});
    })
    
});

router.get('/lista', function(req, res){
    Pagamento.findAll().then(function(pagamentos){
        res.render('usuario', {pagamentos: pagamentos});
    })
    
});

app.use('/',router);
app.use('/pagamento',router);
app.use('/usuario',router);
app.listen(8080);