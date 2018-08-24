const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {

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

router.get('/:id', (req, res) => {

    const encomenda = encomendas.find(encomenda => encomenda.id === parseInt(req.params.id));
    if (!encomenda) res.status(404).send('Encomenda não encontrada!');
    res.send(encomenda);
});

module.exports = router;