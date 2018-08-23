const https = require('https');
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {

    https.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=74663-520&destinations=40296000&mode=driving&language=pt-BR&sensor=false', resp => {
        let body = '';
        resp.on('data', data => body += data);
        resp.on('end', () => {
            let encomenda = JSON.parse(body);
            console.log(encomenda.destination_addresses);
            res.send(body)
        });
    });
});

app.get('/api/encomendas/:id', (req, res) => {

    const encomenda = encomendas.find(encomenda => encomenda.id === parseInt(req.params.id));
    if (!encomenda) res.status(404).send('Encomenda não encontrada!');
    res.send(encomenda);
});


app.post('/api/encomendas', (req, res) => {

    const modelo = {
        id: Joi.number().required(),
        remetente: {
            nome: Joi.string(),
            cep: Joi.string()
        },
        destinatario: {
            nome: Joi.string(),
            cep: Joi.string()
        }
    };

    const resultado = Joi.validate(req.body, modelo);
    console.log(resultado);

    if (resultado.error) {
        res.status(400).send(resultado.error.details[0].message);
        return;
    }

    const encomenda = req.body;
    encomendas.push(encomenda);
    console.log(encomendas);
    res.send(encomenda);
});


const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`Ouvindo na porta ${porta}...`));
