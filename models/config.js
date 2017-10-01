const mongoose = require('mongoose');

//Configuration Schema

const configSchema = mongoose.Schema ({
    entry_name : {
        type : String
    },
    first_name: {
        type : String
    },
    last_name: {
        type : String
    },
    number: {
        type : String
    },
    email: {
        type : String
    },
    use: {
        type : String
    },
    ram: {
        type : Number
    },
    os_volume: {
        type : Number
    },
    data_volume: {
        type : Number
    },
    log_volume: {
        type : Number
    },
    selected_platform: {
        type : String
    },
    management: {
        type : String
    },
    location_name: {
        type : String
    },
    host_purpose: {
        type : String
    },
    host_type: {
        type : String
    },
    host_cores: {
        type : Number
    },
    host_os: {
        type : String
    },
    host_designation: {
        type : String
    },
    basic_monitoring: {
        type : String
    },
    additional_monitoring: {
        type : String
    },
    load_balancing: {
        type : String
    },
    other_comments: {
        type : String
    },
    other_volumes: {
        type : String
    },
    applications: {
        type : String
    }
});

const Config = module.exports = mongoose.model('Config',configSchema);

// Get Configurations
module.exports.getConfigs = (callback, limit) => {
    Config.find(callback).limit(limit);
};

// Get specific configuration
module.exports.getConfigById = (id, callback) => {
    Config.findById(id, callback);
};

// Add configuration
module.exports.addConfig = (config, callback) => {
    Config.create(config, callback);
};
