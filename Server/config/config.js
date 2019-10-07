var config = {

    development: {
        //url to be used in link generation
        dbURI: "mongodb://jp:admin12345@52.14.226.1/uat",
        options: {
            useNewUrlParser: true,
        },

    },
    production: {
        dbURI: "mongodb://jp:admin12345@52.14.226.1/production",
        options: {
            useNewUrlParser: true,
        },

    }
};
module.exports = config;

