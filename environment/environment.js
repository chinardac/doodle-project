const env = {};

env.express = {
    protocol: "http",
    hostname: "localhost",
    port: "3030"
}

env.mongo = {
    protocol: "mongodb",
    hostname: "localhost",
    port: "27017",
    path: "/doodle"
}

env.webpack = {
    protocol: "http",
    hostname: "localhost",
    port: "52671"
}

env.getConfigUrl = (config) => {
    return `${config.protocol}://${config.hostname}:${config.port}${config.path ? `${config.path}` : ``}`;
}

module.exports = env;
