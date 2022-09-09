import { string } from 'joi';
import Sequelize, { Model, Optional } from 'sequelize';
import database from 'lo-commons/data/db';
import {IAccount} from './account';

interface IAccountCreationAttributes extends Optional<IAccount, "id">{}

export interface IAccountModel extends Model<IAccount, IAccountCreationAttributes>, IAccount {}

export default database.define<IAccountModel>('account', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 100
    },
    native_language: {
        type: Sequelize.STRING,
        allowNull: false
    }
})