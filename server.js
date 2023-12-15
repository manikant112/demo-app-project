const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;


app.get('/api/v1/test', (request, response, next) => {
    response.send({ success: false });
});
app.get('/api/v2/test',(req,res) => {
    res.send({message : "v2 version is working fine")
}
server.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
