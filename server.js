'use strict';

require('dotenv').config();

const express = require('express');
const morgan = require('morgan')
const url = require('url');
const app = express();
const crlUrl = url.parse(process.env.CA_CRL_URL);
const aiaUrl = url.parse(process.env.CA_AIA_URL);

if (crlUrl.port !== aiaUrl.port) {
  console.error('CRL and AIA ports must match!');
  return;
}

app.use(morgan('combined'));
app.use(crlUrl.path, express.static(process.env.CERT_AUTHORITY_HOME + '/crl'));
app.use(aiaUrl.path, express.static(process.env.CERT_AUTHORITY_HOME + '/certs'));
console.log('Starting CA Web Server for CRL/AIA...');
app.listen(process.env.PORT);
console.log(process.env.PORT);
console.log('\t' + crlUrl.href);
console.log('\t' + aiaUrl.href);
console.log('Hit CTRL-C to stop the server');
