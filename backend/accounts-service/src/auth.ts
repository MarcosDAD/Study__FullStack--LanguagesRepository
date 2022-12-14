import bcrypt from 'bcryptjs';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import fs from 'fs';
import authCommons, {Token} from 'lo-commons/api/auth'
import path, { dirname } from 'path';

const privateKey = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'), 'utf-8');
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
const jwtAlgorithm = 'RS256';

function hashPass(password: string){
    return bcrypt.hashSync(password, 10)
}

function comparePass(password: string, hashPassword: string){
    return bcrypt.compareSync(password, hashPassword);
}

function sign(accountId: number){
    const token : Token =  {accountId}
    return jwt.sign(token, privateKey, {expiresIn: jwtExpires, algorithm: jwtAlgorithm})
}

async function verify(token: string){
    return authCommons.verify(token);
}

export default {hashPass, comparePass, sign, verify}