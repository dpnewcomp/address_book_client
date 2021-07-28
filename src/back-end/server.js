const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/middlewareUserGeneration", async (req, res) => {

    try {

        let result = await queryData()
        res.status(200).send(result)

    } catch (err) {

        res.status(500).send(err.toLocaleString())

    }

    function queryData() {

        // promise for control of async
        return new Promise((resolve, reject) => {

            // import axios library
            const axios = require('axios');

            // send get request and handle response
            axios.get('https://randomuser.me/api/?results=5').then((response) => {

                resolve(response.data.results); // resolve promise with data

            }).catch((error) => {

                reject(error); // reject promise if error

            })

        })

    }

})


const server = app.listen(8080, () => {

    const port = server.address().port;
    console.log(`Example app listening at http://localhost:${port}`);

});



module.exports = app;
