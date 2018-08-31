const express = require('express');
const https = require('https');
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/encomendas/:remetente/:destinatario', (req, res) => {

    https.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${req.params.remetente}&destinations=${req.params.destinatario}&mode=driving&language=pt-BR&sensor=false`, resp => {
        let body = '';
        resp.on('data', data => body += data);
        resp.on('end', () => {
            // JSON.parse(body);
            let resposta = JSON.parse(body);
            let encomenda = {};
            let destinatario = {};
            let remetente = {};

            destinatario.endereco = resposta.destination_addresses[0];
            remetente.endereco = resposta.origin_addresses[0];

            encomenda.destinatario = destinatario;
            encomenda.remetente = remetente;
            encomenda.distancia = resposta.rows[0].elements[0].distance.value;
            let diasCorridos = resposta.rows[0].elements[0].duration.value;
            diasCorridos = diasCorridos / 3600;
            diasCorridos = diasCorridos / 8;

            encomenda.dataDeEntrega = calcularDataDeEntrega(diasCorridos);
            encomenda.frete = (encomenda.distancia/1000) * 1.2;

            if (req.params.remetente.substring(0, 1) !== req.params.destinatario.substring(0, 1)) {
                encomenda.frete = encomenda.frete * 1.3;
            }

            console.log(encomenda);
            console.log(diasCorridos);


            res.send(encomenda)
        });
    });
});


const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`Ouvindo na porta ${porta}...`));

function calcularDataDeEntrega(diasCorridos) {
    const hoje = new Date();
    let amanha = new Date(hoje.getTime() + 24*60*60*1000);
    if (amanha.getDay() === 0) {
        amanha =  new Date(amanha.getTime() + 24*60*60*1000);
    }

    let dataDeEntrega = amanha;

    for(var days = 1; days <= diasCorridos; days++) {
        dataDeEntrega = new Date(amanha.getTime() + (days *24*60*60*1000));
        if(dataDeEntrega.getDay() === 0) {
            diasCorridos++;
        }
    }
    return dataDeEntrega;
}

