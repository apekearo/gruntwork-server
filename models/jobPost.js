const constants = require('../constants');

module.exports = function (sequelize, DataTypes) {
    var JobPost = sequelize.define("JobPost", {
        payAmount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            min: 1,
            defaultValue: constants.jobPost.payAmount
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1,144],
            defaultValue: constants.jobPost.description,
        },
        hasCar: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: constants.jobPost.hasCar
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            isIn: [['employee', 'employer']]
        },
        locationZip: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: constants.jobPost.locationZip
        }
    });

    JobPost.associate = function (db) {
        JobPost.belongsTo(db.User);
    };

    JobPost.prototype.hasFinishedCreation = function () {
        return this.payAmount !== constants.jobPost.payAmount &&
            this.description !== constants.jobPost.description &&
            this.locationZip !== constants.jobPost.locationZip
    };
    
    return JobPost;
};