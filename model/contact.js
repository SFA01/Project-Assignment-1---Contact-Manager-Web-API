//importing the modules mongoose 
const mongoose = require('mongoose');

//listing the contacts fields 
const objDef={
    FirstName : {
        type: String,
        require: true,
    },

    MiddleName : {
        type: String,
        require: false,
    },

    LastName : {
        type: String,
        require: true,
    },

    EmailAddress : {
        type: String,
        require: true,
    },

    PhoneNumber : {
        type: String,
        require: false,
    },

    AddressOne : {
        type: String,
        require: false,
    },

    AddressTwo : {
        type: String,
        require: false,
    },

    Province : {
        type: String,
        require: false,
    },

    PostalCode : {
        type: String,
        require: false,
    },

    Country : {
        type: String,
        require: false,
    },
}

//creating a schema from the contacts fields 
const ContactSchema = new mongoose.Schema(objDef);

//exporting the model for use elsewhere in the code
module.exports = mongoose.model('ContactList',ContactSchema)