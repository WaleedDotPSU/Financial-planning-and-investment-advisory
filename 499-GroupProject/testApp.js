require('dotenv').config(); 
const mongoose = require('mongoose');
const fs = require('fs');
const faker = require('faker');
const Card = require('./models/Card'); 
const Transaction = require('./models/Transaction');
const User = require('./models/User'); 

// Establish a connection to the database
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Successfully connected to the database server.`);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit if cannot connect to database
    }
}

// Create users with random data
const createUsers = async () => {
    for (let i = 0; i < 10; i++) {
        const newUser = new User({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        });
        await newUser.save();
    }
};

// Create cards with random data
const createCards = async () => {
    for (let i = 0; i < 10; i++) {
        const newCard = new Card({
            name: faker.name.findName(),
            number: faker.finance.creditCardNumber(),
            date: faker.date.future().toLocaleDateString(),
            cvv: faker.finance.creditCardCVV()
        });
        await newCard.save();
    }
};

// Create transactions with random data
const createTransactions = async () => {
    const users = await User.find();
    for (let i = 0; i < 10; i++) {
        const newTransaction = new Transaction({
            userId: users[i % users.length]._id,
            bankAccount: faker.finance.account(),
            description: faker.finance.transactionDescription(),
            date: faker.date.recent(),
            amount: faker.finance.amount(),
            category: faker.commerce.productMaterial()
        });
        await newTransaction.save();
    }
};

// Fetch all data and write to JSON files
const fetchData = async () => {
    const cards = await Card.find();
    fs.writeFileSync('cards.json', JSON.stringify(cards, null, 2));
    console.log('Cards:', cards);

    const transactions = await Transaction.find();
    fs.writeFileSync('transactions.json', JSON.stringify(transactions, null, 2));
    console.log('Transactions:', transactions);

    const users = await User.find();
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    console.log('Users:', users);
};

// Run all functions in sequence and handle errors
const run = async () => {
    await connectToDatabase();
    try {
        await createUsers();
        await createCards();
        await createTransactions();
        await fetchData();
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Database connection closed.');
    }
};

run().catch(console.error);


// // OLD Implementation 
// // const fetchData = async () => {
// //     const cards = await Card.find();
// //     console.log('Cards:', cards);

// //     const transactions = await Transaction.find();
// //     console.log('Transactions:', transactions);

// //     const users = await User.find();
// //     console.log('Users:', users);

// //     await mongoose.disconnect();
// //     console.log('Database connection closed.');
// // };

// // const run = async () => {
// //     await createUsers();
// //     await createCards();
// //     await createTransactions();
// //     await fetchData();
// // };

// // // run is now called in the .then() block of the mongoose.connect()