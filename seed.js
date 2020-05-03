const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);
const db = require(`./models`);

const saltRounds = 10;

const seedData = {
  profiles: [
    {
      screenName: `DrakonPhoenix`,
      email: `seannyphoenix@gmail.com`,
      password: `Testing`
    },
    {
      screenName: `Mister Caboose!`,
      email: `funkyboy@example.com`,
      password: `REDcaboose`
    }
  ]
};

async function seed() {
  try {
    let res = await db.Profile.deleteMany();

    await Promise.all(
      seedData.profiles.map(profile =>
        bcrypt
          .hash(profile.password, saltRounds)
          .then(hashed => (profile.password = hashed))
      )
    );

    for (let profile of seedData.profiles) {
      profile.password = await bcrypt.hash(profile.password, saltRounds);
    }

    res = await db.Profile.create(seedData.profiles);
  } finally {
    await mongoose.connection.close();
  }
}

seed().catch(console.log);
