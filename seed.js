const mongoose = require('mongoose');
const db = require(`./models`);

const

async function seed() {
  try {
    let res = null;
    res = await db.User.deleteMany();
    console.log(`Deleted `);
  }
  catch (err) {
    console.log(err);
  }
  finally {
    mongoose.connection.close();
  }
}

async function()

seed();