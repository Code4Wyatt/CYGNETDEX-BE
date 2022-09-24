import sequelize from "../index.js";

import s from "sequelize";

const { DataTypes } = s;

const Users = sequelize.define("Users", {
    userId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    legalName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    governmentId: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    userAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
});

export default Users;