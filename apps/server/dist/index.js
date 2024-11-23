import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get('/', function (_, res) {
    return res.json({ ok: true });
});
var port = process.env.PORT || 5001;
app.listen(port, function () {
    console.log("Server API running on http://localhost:".concat(port));
});
