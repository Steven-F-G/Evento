const express = require('express');
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");
const dotenv = require('dotenv');

const https = require('https');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/cipevento.live/privkey.pem', 'utf8'); // key
const certificate = fs.readFileSync('/etc/letsencrypt/live/cipevento.live/cert.pem', 'utf8'); // certificate
const ca = fs.readFileSync('/etc/letsencrypt/live/cipevento.live/chain.pem', 'utf8'); // chain
const credentials = {
   key: privateKey,
   cert: certificate,
   ca: ca
};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen('8443', () => {
    console.log('listening on https://cipevento.live:8443');
});

dotenv.config();


// db
mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {console.log("DB Connected")});

mongoose.connection.on('error', err => {
    console.log(`DB Connection Error: ${err.message}`);
});
//bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// api docs
app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        // parse data before sharing
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error: "Unauthorized!"});
    }
});


const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`A node JS API is listening on port: ${port}`)
});
