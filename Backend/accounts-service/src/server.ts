import app from './app';

(async () => {
    try{
        const port = parseInt(`${process.env.PORT}`);

        const server = await app.listen(port);
        console.log(`Running on port ${port}`);
    }
    catch(error){
        console.log(error);
    }
})();