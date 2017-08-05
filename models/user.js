module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            isIn: [['employee', 'employer']]
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 25]
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // skills: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         len: [1, 144]
        //     }
        // },
        // jobLocation: {
        //     type: DataTypes.STRING
        // },
        // hasCar: {
        //     type: DataTypes.BOOLEAN
        // }
    })
    return User;
}