const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Configurando o Express para utilizar o EJS como View Engine 
app.set('view engine', 'ejs');
//Configurando os arquivos estáticos
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let livros = [
    {
        numero: 01,
        titulo: 'Como fazer sentido e bater o martelo',
        autor: 'Alexandro Aolchique',
        ano: '2017',
        status: 'disponivel',
    },
    {
        numero: 02,
        titulo: 'Sejamos todos feministas',
        autor: 'Chimamanda Ngozi Adichie',
        ano: '2015',
        status: 'disponivel'
    },
    {
        numero: 03,
        titulo: 'Basquete 101',
        autor: 'Hortência Marcari',
        ano: '2010',
        status: 'disponivel'
    },
]

app.get('/', (req, res) => {
    res.render('index',{
        livros
    });
});

app.get('/doarLivro', (req, res) => {
    res.render('doarLivro');
});

app.post('/salvarLivro', (req, res) => {
    let { titulo, autor, ano } = req.body;

    let numero = livros.length + 1;

    livros.push({numero, titulo, autor, ano, status : 'disponivel'});

    res.redirect('/');
    
});

app.get('/livro/:id', (req, res) => {
    let { id } = req.params;
 
    let livro = livros.filter(item => item.numero == id);

    if(livro){
        res.render('retirarLivro', {
            livro
        });
    }

    res.redirect('/');
    
});

app.post('/salvarUsuario', (req, res) => {
    let { nome, numeroLivro } = req.body;

    livros[numeroLivro - 1].emprestadoPara = nome;
    livros[numeroLivro - 1].status = 'indisponivel';

    res.redirect('/');
});

app.post('/devolverLivro', (req, res) => {
    let { numeroLivro } = req.body;

    livros[numeroLivro - 1].emprestadoPara = '';
    livros[numeroLivro - 1].status = 'Disponivel';

    res.redirect('/');
});

app.get('/devolver/:id', (req, res) => {
    let { id } = req.params;
 
    let livro = livros.filter(item => item.numero == id);

    if(livro){
        res.render('devolverLivro', {
            livro
        });
    }

    res.redirect('/');
    
});

app.listen(3000);
