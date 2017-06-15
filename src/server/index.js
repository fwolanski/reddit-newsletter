import compression from 'compression';
import express from 'express';

const WEB_PORT = process.env.PORT || 8000;
const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.use(compression());

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(WEB_PORT, () => {

    console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
        '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
});