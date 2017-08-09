/**
 * Created by chengluli on 08/08/2017.
 */
module.exports = function (sequelize, DataTypes) {
    var JobPost = sequelize.define("JobPost", {
        payAmount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            min: 1
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1,144]
        },
        hasCar: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    });

    JobPost.associate = function (db) {
        JobPost.belongsTo(db.User);
    };
    return JobPost;
};