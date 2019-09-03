const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/insdex.html');
});

app.listen(process.env.PORT || 4200);
