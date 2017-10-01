const mongoose = require('mongoose');


const costSchema = mongoose.Schema ({
    entry_name : {
        type : String,
    },
    cpu_cost : {
        type : Number,
    },
    ram_cost : {
        type : Number,
    },
    network_cost : {
        type : Number,
    },
    bandwidth_cost : {
        type: Number,
    },
    vmware_cost : {
        type: Number,
    }
});

const Cost = module.exports = mongoose.model('Cost',costSchema);

// Get Cost Estimates
module.exports.getCosts = (callback, limit) => {
    Cost.find(callback).limit(limit);
};

// Get specific cost estimate entry
module.exports.getCostsById = (id, callback) => {
    Cost.findById(id, callback);
};

// Add cost estimate entries
module.exports.addCost = (cost, callback) => {
    Cost.create(cost, callback);
};