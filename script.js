const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect('mongodb://localhost/testdb', () => {
    console.log('connected');
}, e => console.log(e));

// Schema - defines what the structure of your database looks like 
// Model - it is basically a schema in the actual form that you can use in your codebase 
// Query - it is a query that you make to the database to create/update/delete anything 


const createUser = async () => {
    try {
        // till now, we have not saved the user to the database...we only have a local copy in our js program 
        const user = new User({
            name: 'Aman',
            age: 21,
            email: 'abc@email.com',
            hobbies: ['cricket', 'music'],
            address: {
                street: 'main street',
                city: 'delhi'
            }
        });
    
        // save method is required to add the user permanently to the database 
        await user.save();
    
        // another syntax to create a new user 
        // const user = await User.create({name: 'Rajat', age: 21});
    
        console.log(user);

    } catch (error) {
        console.log(error.message);
    }
}

createUser();