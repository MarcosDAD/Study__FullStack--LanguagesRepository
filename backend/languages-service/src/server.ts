import app from './app';
import database from 'lo-commons/data/db';

(async () => { //IIFE
    try{
        const port = parseInt(`${process.env.PORT}`);

        await database.sync () //sincroniza a daabase com o código
        console.log(`Running database ${process.env.MYSQL_DB}`);
        await app.listen(port);
        console.log(`Running on port ${port}`);
    }
    catch(error){
        console.log(error);
    }
})();