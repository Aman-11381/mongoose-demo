const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type:Number,
        min: 1,
        max: 100
    },
    email: {
        type: String,
        required: true,
        // this converts the data entered into lowercase automatically 
        lowercase: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        // the below function passed as the default value is run every time the object is created 
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        // the below function passed as the default value is run every time the object is created 
        default: () => Date.now(),
    },
    // the below data type basically represents another user that is the friend of this user 
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        // this ref property is used to tell mongoose which Schema's object we are referencing here 
        ref: "User"
    },
    hobbies: [String],
    address: {
        street: String,
        city: String
    }
});

// this method 'sayHi' will be applied to every instance of the model 
// remember we cannot use arrow functions here because we are using the 'this' keyword 
userSchema.methods.sayHi = function() {
    console.log(`Hi my name is ${this.name}!`);
}

// the functions defined using statics are defined for the Model instead of the individual objects 
userSchema.statics.findByName = function(name) {
    return this.where({name: new RegExp(name, 'i')});
}

// here we are defining a virtual property that will not be stored in the database but will be available in the code 
userSchema.virtual('namedEmail').get(function() {
    return `${this.name} <${this.email}>`;
})

// mongoose allows us to define middlewares that can run after/before actions like save, update, delete 
// where we are defining a middleware which will run before (pre) the 'save' action and update the attribute 
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
})

// the first argument to the model method is the name of the collection that we will see inside the db 
module.exports = mongoose.model('User', userSchema);