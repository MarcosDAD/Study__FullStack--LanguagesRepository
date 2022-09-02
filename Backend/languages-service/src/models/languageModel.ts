import Sequelize, { Model, Optional } from 'sequelize';
import database from 'lo-commons/data/db';
import {ILanguage} from './language';

interface ILanguageCreationAttributes extends Optional<ILanguage, "id">{}

export interface ILanguageModel extends Model<ILanguage, ILanguageCreationAttributes>, ILanguage {}

export default database.define<ILanguageModel>('language', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    accountId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    label: {
        type: Sequelize.STRING,
        allowNull: false
    },
    proficiency: {
        type: Sequelize.STRING,
        allowNull: true
    },
    studying: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})