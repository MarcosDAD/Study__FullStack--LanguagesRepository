import bcrypt from 'bcryptjs';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import fs from 'fs';

const privateKey = fs.readFileSync('./keys/private.key', 'utf-8');
const publicKey = fs.readFileSync('./keys/public.key', 'utf-8');

const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
const jwtAlgorithm = 'RS256';

function hashPass(password: string){
    return bcrypt.hashSync(password, 10)
}

function comparePass(password: string, hashPassword: string){
    console.log(password, hashPassword)
    return bcrypt.compareSync(password, hashPassword);
}

type Token = {accountId: number};

function sign(accountId: number){
    const token : Token =  {accountId}
    return jwt.sign(token, privateKey, {expiresIn: jwtExpires, algorithm: jwtAlgorithm})
}

async function verify(token: string){
    try{
        const decodedToken : Token = await jwt.verify(token, publicKey, {algorithm: [jwtAlgorithm]} as VerifyOptions) as Token;
        return {account: decodedToken.accountId};
    }
    catch(error){
        console.log(`Verify: ${error}`);
        return null;
    }
}

export default {hashPass, comparePass, sign, verify}