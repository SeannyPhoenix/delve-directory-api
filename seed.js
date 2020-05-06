const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);
const db = require(`./models`);
const zipData = require("./assets/data/us-zip-code-latitude-and-longitude-geo.json");

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
    },
    {
      screenName: `prÂxis`,
      email: `1@example.com`,
      password: `123456`
    },
    {
      screenName: `guyman`,
      email: `guy@example.com`,
      password: `guy`
    }
  ],
  games: [
    {
      name: `Dungeons & Dragons`
    },
    {
      name: `Pathfinder`
    },
    {
      name: `Star Wars RPG`
    },
    {
      name: `Shadowrun`
    },
    {
      name: `GURPS`
    },
    {
      name: `Savage Worlds`
    },
    {
      name: `Dungeon World`
    },
    {
      name: `FATE`
    },
    {
      name: `RISUS`
    },
    {
      name: `Apocalypse World`
    },
    {
      name: `Simple System`
    },
    {
      name: `Starfinder`
    }
  ]
};

async function seed() {
  let startTime = Date.now();
  try {
    let res = await db.Profile.deleteMany();
    console.log(`Deleted ${res.n} profiles.`);
    await Promise.all(
      seedData.profiles.map(profile =>
        bcrypt
          .hash(profile.password, saltRounds)
          .then(hashed => (profile.password = hashed))
      )
    );
    res = await db.Profile.create(seedData.profiles);
    console.log(`Created ${res.length} profiles.`);

    res = await db.Game.deleteMany();
    console.log(`Deleted ${res.n} games.`);
    res = await db.Game.create(seedData.games);
    console.log(`Created ${res.length} games.`);
    if (process.argv.includes("zip")) {
      await seedzip().catch(console.log);
    }
  } finally {
    await mongoose.connection.close();
    let timeCalc = Date.now() - startTime;
    let timeElapsed = {};
    timeElapsed.hours = Math.floor(timeCalc / 3600000);
    timeCalc -= timeElapsed.hours * 3600000;
    timeElapsed.minutes = Math.floor(timeCalc / 60000);
    timeCalc -= timeElapsed.minutes * 60000;
    timeElapsed.seconds = timeCalc / 1000;

    console.log(
      `Time elapsed: ${timeElapsed.hours}:${timeElapsed.minutes}:${timeElapsed.seconds}`
    );
  }
}

async function seedzip() {
  try {
    let count = await db.ZipData.deleteMany();
    console.log(`Deleted ${count.n} entries.`);

    let size = zipData.features.length;
    for (let i = 0; i < size; i += 1000) {
      let geoData = await db.ZipData.create(
        zipData.features.slice(i, i + 1000)
      );
      console.log(
        `Created ${geoData.length} zip code entries: ${i} to ${i + 999}`
      );
    }
    console.log(`Creating indexes`);
    await db.ZipData.createIndexes({ geometry: "2dsphere" });
  } catch (err) {
    console.log(err);
  }
}

seed().catch(console.log);
