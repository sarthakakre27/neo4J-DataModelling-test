const express = require('express');
const router = express.Router();
const neo4j_calls = require('./../neo4j_calls/neo4j_api');

router.get('/', async function (req, res, next) {
    res.status(200).send("Root Response from :8080/test_api")
    return 700000;
})

router.get('/neo4j_get', async function (req, res, next) {
    let result = await neo4j_calls.get_num_nodes();
    console.log("RESULT IS", result)
    res.status(200).send({ result })   
    return { result };
})

router.get('/neo4j_q1', async function (req, res, next) {
    let result = await neo4j_calls.employees_orders_products();
    console.log(result);
    res.status(200).send({ result })    
    return { result };
})

router.get('/neo4j_q2', async function (req, res, next) {
    let result = await neo4j_calls.supplier_category(req.body.product);
    console.log(result);
    res.status(200).send({ result })    
    return { result };
})

router.get('/neo4j_q3', async function (req, res, next) {
    let result = await neo4j_calls.manager_employee();
    console.log(result);
    res.status(200).send({ result })    
    return { result };
})


module.exports = router;