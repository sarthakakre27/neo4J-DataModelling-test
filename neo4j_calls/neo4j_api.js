let neo4j = require('neo4j-driver');
let { creds } = require("./../config/credentials");
let driver = neo4j.driver("neo4j+s://c5e59cc8.databases.neo4j.io", neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw));

exports.get_num_nodes = async function () {
    let session = driver.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {
    });
    session.close();
    console.log("RESULT", (!num_nodes ? 0 : num_nodes.records.length));
    return (!num_nodes ? 0 : num_nodes.records.length);
};


exports.employees_orders_products = async function () {
    let session = driver.session();
    try {
        result = await session.run(`MATCH (e:Employee)-[rel:SOLD]->(o:Order)-[rel2:CONTAINS]->(p:Product) RETURN e, rel, o, rel2, p LIMIT 25;`, {
        });
        session.close();
    }
    catch (err) {
        console.error(err);
        return result;
    }
    console.log(result);
    return result;
}

exports.supplier_category = async function (product) {
    let session = driver.session();
    try {
        result = await session.run(`MATCH (s:Supplier)-[r1:SUPPLIES]->(p:Product {productName: '${product}'})-[r2:PART_OF]->(c:Category) RETURN s, r1, p, r2, c;`, {
        });
        session.close();
    }
    catch (err) {
        console.error(err);
        return result;
    }
    console.log(result);
    return result;
}

exports.manager_employee = async function (product) {
    let session = driver.session();
    try {
        result = await session.run(`MATCH (e:Employee)<-[:REPORTS_TO]-(sub) RETURN e.employeeID AS manager, sub.employeeID AS employee;`, {
        });
        session.close();
    }
    catch (err) {
        console.error(err);
        return result;
    }
    console.log(result);
    return result;
}