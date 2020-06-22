const express = require('express')
const {STS} = require('ali-oss');
const app = express()
const fs = require('fs');
const path = require('path');

const conf = require('./config');

const port = 3000
const basicAuth = require('express-basic-auth')

/**
 *
 * @type {*|}
 */
const staticUserAuth = basicAuth({
    users: {
        'admin': 'root'
    },
    challenge: true
})

app.use(staticUserAuth);
app.use(express.static('public'))

app.get('/sts', (req, res) => {
    console.log(conf);
    let policy;
    if (conf.PolicyFile) {
        policy = fs.readFileSync(path.resolve(__dirname, conf.PolicyFile)).toString('utf-8');
    }

    const client = new STS({
        accessKeyId: conf.AccessKeyId,
        accessKeySecret: conf.AccessKeySecret
    });

    client.assumeRole(conf.RoleArn, policy, conf.TokenExpireTime).then((aliResp) => {
        console.log(aliResp);
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-METHOD', 'GET');
        res.json({
            endpoint: conf.EndPoint,
            bucket: conf.Bucket,
            accessKeyId: aliResp.credentials.AccessKeyId,
            accessKeySecret: aliResp.credentials.AccessKeySecret,
            stsToken: aliResp.credentials.SecurityToken,
            expiration: aliResp.credentials.Expiration
        });
    }).catch((err) => {
        console.log(err);
        res.status(400).json(err.message);
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
