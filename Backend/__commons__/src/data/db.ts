import {Sequelize} from 'sequelize';

const dbName = process.env.MYSQL_DB!;
const dbUser = process.env.MYSQL_USER!;
const dbPassword = process.env.MYSQL_PASSWORD;
const dbHost = process.env.MYSQL_HOST!;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mysql',
    host: dbHost,
    logging: false
})

export default sequelize;