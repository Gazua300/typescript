"use strict";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const { config } = require('dotenv');
config();
class Authentication {
    constructor() {
        this.generateId = () => {
            return v4();
        };
        this.hash = (text) => {
            const rounds = 12;
            const salt = bcrypt.genSaltSync(rounds);
            const cypher = bcrypt.hashSync(text, salt);
            return cypher;
        };
        this.compare = (text, hash) => {
            return bcrypt.compareSync(text, hash);
        };
        this.token = (payload) => {
            return jwt.sign({ payload }, process.env.JWT_KEY, { expiresIn: '1h' });
        };
        this.tokenData = (token) => {
            return jwt.verify(token, process.env.JWT_KEY);
        };
    }
}
module.exports = Authentication;
