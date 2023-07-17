"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const con = require('../connections/connection');
const Authentication = require('../services/Authentication');
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 400;
    try {
        const auth = new Authentication();
        const { email, password } = req.body;
        if (!email || !password) {
            statusCode = 401;
            throw new Error('Preencha os campos');
        }
        const [user] = yield con('promo_prime_users').where({
            email
        });
        if (!user) {
            statusCode = 404;
            throw new Error('Usuário não encontrado');
        }
        const compare = auth.compare(password, user.password);
        const token = auth.token(user.id);
        if (!compare) {
            statusCode = 404;
            throw new Error('Usuário não encontrado');
        }
        res.status(200).send({ token, user: user.user });
    }
    catch (e) {
        res.status(statusCode).send(e.message || e.sqlMessage);
    }
});
module.exports = login;
