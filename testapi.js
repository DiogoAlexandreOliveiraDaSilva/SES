const Messages = require('./src/messages');
const AppConfig = require('./customize/application_config');
const App = require('./_build/worker.bundle');
const Http = require('node:http');


let start = ApiConfig => {
    App.start(ApiConfig, AppConfig, Keys);
};

let getApi = (file, cb) => {
    Http.get(`http://localhost:3000/api/${file}`, res => {
        let body = '';
        res.on('data', data => { body += data; });
        res.on('end', () => {
            try {
                cb(JSON.parse(body.slice(27,-5)));
            } catch (e) {
                console.error(e);
            }
        });
    });
};


getApi('config', ApiConfig => {
    getApi('broadcast', Broadcast => {
        App.start({
            ApiConfig, Broadcast, AppConfig, Messages
        });
    });
});
