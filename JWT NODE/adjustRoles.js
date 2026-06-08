const mongoose = require('mongoose');
const User = require('./src/models/user');

mongoose.connect("mongodb://127.0.0.1:27017/studentDB").then(async () => {
    const users = await User.find();
    if (users.length > 0) {
        const user = users[0];
        user.role = 'admin';
        await user.save();
        console.log(`SUCCESS: Account [${user.email}] has been upgraded to an Admin!`);
        
        // Ensure at least one customer exists
        if (users.length > 1) {
            const customer = users[1];
            customer.role = 'customer';
            await customer.save();
            console.log(`INFO: Account [${customer.email}] is set as a Customer.`);
        }
    } else {
        console.log("ERROR: No users found in the database. Please sign up first.");
    }
    process.exit();
}).catch(err => {
    console.error(err);
    process.exit(1);
});
