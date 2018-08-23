const express = require('express');
const app = express();

const encomendas = [
    {
        id: 1,
        remetente: {
            nome: 'Edionay',
            cep: '68.625.480'
        },
        destinatario: {
            nome: 'Pablo',
            cep: '74710-190'
        }
    },
    {
        id: 2,
        remetente: {
            nome: 'David',
            cep: '68.625.480'
        },
        destinatario: {
            nome: 'Pedro',
            cep: '74710-190'
        }
    }
    ,
    {
        id: 2,
        remetente: {
            nome: 'Antonio',
            cep: '68.625.480'
        },
        destinatario: {
            nome: 'Marcelo',
            cep: '74710-190'
        }
    }
];

app.get('/', (req, res) => res.send('Olá, mundo!!'));

app.get('/api/encomendas', (req, res) => {
    res.send(encomendas);
});

app.get('/api/encomendas/:id', (req, res) => {
    const encomenda = encomendas.find(encomenda => encomenda.id === parseInt(req.params.id));
    if (!encomenda) res.status(404).send('Encomenda não encontrada!');
    res.send(encomenda);
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`Ouvindo na porta ${porta}...`));
