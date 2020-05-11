const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);
require("dotenv").config();
const db = require(`./models`);
const zipData = require("./assets/data/us-zip-code-latitude-and-longitude-geo.json");

const saltRounds = 10;

const seedData = {
  profiles: [
    {
      screenName: `DrakonPhoenix`,
      email: `seannyphoenix@gmail.com`,
      password: `Testing`,
      zip: `94105`
    },
    {
      screenName: `Mister Caboose!`,
      email: `funkyboy@example.com`,
      password: `REDcaboose`,
      zip: `94104`
    },
    {
      screenName: `amadigan`,
      email: `amadigan@gmail.com`,
      password: `amadigan`,
      zip: `94105`
    },
    {
      screenName: `MUNI_luvr`,
      email: `muni_luvr@example.com`,
      password: `muni_luvr`,
      zip: `94102`
    },
    {
      screenName: `Angela`,
      email: `angela@example.com`,
      password: `angela`,
      zip: `14610`
    },
    {
      screenName: `demperdall`,
      email: `demperdall@example.com`,
      password: `demperdall`,
      zip: `94546`
    },
    {
      screenName: `falochu`,
      email: `falochu@example.com`,
      password: `falochu`,
      zip: `94546`
    },
    { screenName: `BJ`, email: `BJ@example.com`, password: `BJ`, zip: `14607` },
    {
      screenName: `crazyBoy`,
      email: `crazyBoy@example.com`,
      password: `crazyBoy`,
      zip: `14607`
    },
    {
      screenName: `Professor Plum`,
      email: `profplum@example.com`,
      password: `profplum`,
      zip: `14607`
    },
    {
      screenName: `She's All That`,
      email: `jane@example.com`,
      password: `jane`,
      zip: `14607`
    },
    {
      screenName: `Megan the Great`,
      email: `MtG@example.com`,
      password: `MtG`,
      zip: `14607`
    },
    {
      screenName: `5318008`,
      email: `5318008@example.com`,
      password: `5318008`,
      zip: `14607`
    },
    {
      screenName: `Jay Party`,
      email: `jpartika@example.com`,
      password: `jayparty`,
      zip: `14605`
    },
    {
      screenName: `Eric`,
      email: `eric@example.com`,
      password: `eric`,
      zip: `14605`
    },
    {
      screenName: `Goldenrod`,
      email: `brock@example.com`,
      password: `javascript`,
      zip: `94104`
    }
  ],
  games: [
    { name: `Dungeons & Dragons` },
    { name: `Pathfinder` },
    { name: `Star Wars RPG` },
    { name: `Shadowrun` },
    { name: `GURPS` },
    { name: `Savage Worlds` },
    { name: `Dungeon World` },
    { name: `FATE` },
    { name: `RISUS` },
    { name: `Apocalypse World` },
    { name: `Simple System` },
    { name: `Starfinder` }
  ],
  tables: [
    {
      name: `Just another game`,
      owner: `MUNI_luvr`,
      game: `Savage Worlds`,
      zip: `94105`,
      published: true,
      info: `Lets kill some fuckers!`,
      seats: [
        { role: `Game Master` },
        { role: `Player` },
        { role: `Player` },
        { role: `Player` },
        { role: `Player` },
        { role: `Player` }
      ],
      requests: [{ profile: `DrakonPhoenix` }, { profile: `demperdall` }]
    },
    {
      name: `March of Madness`,
      owner: `DrakonPhoenix`,
      game: `Starfinder`,
      zip: `94104`,
      published: true,
      info: `Held in the General Assembly `,
      seats: [
        { profile: `DrakonPhoenix`, role: `Game Master` },
        { profile: `DrakonPhoenix`, role: `Player` },
        { profile: `demperdall`, role: `Player` },
        { profile: `falochu`, role: `Player` },
        { role: `Player` },
        { role: `Player` }
      ],
      requests: [{ profile: `MUNI_luvr` }, { profile: `Goldenrod` }]
    },
    {
      name: `Screams in the Night`,
      owner: `DrakonPhoenix`,
      game: `Pathfinder`,
      zip: `94105`,
      published: true,
      info: `399 Fremont St\nUnit 2802\nFridays at 6pm`,
      seats: [
        { profile: `DrakonPhoenix`, role: `Game Master` },
        { profile: `amadigan`, role: `Player` },
        { profile: `demperdall`, role: `Player` },
        { profile: `falochu`, role: `Player` },
        { role: `Player` },
        { role: `Player` }
      ],
      requests: [{ profile: `MUNI_luvr` }]
    },
    {
      name: `D&D at the Tiny House`,
      owner: `demperdall`,
      game: `Dungeons & Dragons`,
      zip: `94546`,
      published: true,
      info: `Using 5th Edition`,
      seats: [
        { profile: `demperdall`, role: `Game Master` },
        { profile: `falochu`, role: `Player` },
        { profile: `DrakonPhoenix`, role: `player` },
        { role: `Player` },
        { role: `Player` }
      ],
      requests: [{ profile: `amadigan` }]
    },
    {
      name: `GURPS @ Wilson Commons`,
      owner: `BJ`,
      game: `GURPS`,
      zip: `14620`,
      published: true,
      info: `Wilson Commons, every 2nd and 4th thursday at 5pm\nDON'T BE A DICK\n\nHappy Birthday Professor Plum!`,
      seats: [
        { profile: `BJ`, role: `Game Master` },
        { profile: `Professor Plum`, role: `Player` },
        { profile: `She's All That`, role: `Player` },
        { profile: `Megan the Great`, role: `Player` },
        { profile: `crazyBoy`, role: `Player` }
      ],
      requests: []
    },
    {
      name: `Agents of S.H.I.E.L.D.`,
      owner: `BJ`,
      game: `Starfinder`,
      zip: `14620`,
      published: true,
      info: ``,
      seats: [
        { role: `Game Master` },
        { profile: `BJ`, role: `Player` },
        { profile: `She's All That`, role: `Player` },
        { profile: `Megan the Great`, role: `Player` }
      ],
      requests: [{ profile: `Angela` }]
    },
    {
      name: `Rise of the Runelords`,
      owner: `DrakonPhoenix`,
      game: `Pathfinder`,
      zip: `94105`,
      published: false,
      info: ``,
      seats: [
        { profile: `DrakonPhoenix`, role: `Game Master` },
        { profile: `Jay Party`, role: `Player` },
        { profile: `Eric`, role: `Player` }
      ],
      requests: [{ profile: `Angela` }]
    },
    {
      name: "Table 1",
      owner: `Goldenrod`,
      game: `FATE`,
      zip: `94607`,
      published: true,
      info: `Looking for a game master with ideas!`,
      seats: [
        { role: `Game Master` },
        { profile: `DrakonPhoenix`, role: `Player` },
        { profile: `MUNI_luvr`, role: `Player` },
        { profile: `Goldenrod`, role: `Player` },
        { Profile: `5318008`, role: `Player` }
      ],
      requests: []
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
      await seedzip();
    }

    res = await db.Table.deleteMany();
    console.log(`Deleted ${res.n} tables.`);

    let newTables = [];
    for (let i = 0; i < seedData.tables.length; i++) {
      newTables.push(seedData.tables[i]);

      // update owner with profile id
      let owner = await db.Profile.findOne({
        screenName: newTables[i].owner
      });
      newTables[i].owner = owner._id;

      // update game with game id
      let game = await db.Game.findOne({ name: newTables[i].game });
      newTables[i].game = game._id;

      // update requests with profile ids
      for (let j = 0; j < newTables[i].requests.length; j++) {
        let profile = await db.Profile.findOne({
          screenName: newTables[i].requests[j].profile
        });
        newTables[i].requests[j] = profile._id;
      }

      // update seats with profile ids
      for (let j = 0; j < newTables[i].seats.length; j++) {
        let tableSeat = newTables[i].seats[j];
        let profile = await db.Profile.findOne({
          screenName: tableSeat.profile
        });
        if (profile) {
          tableSeat.profile = profile._id;
        }
        newSeat = await db.Seat.create(tableSeat);
        newTables[i].seats[j] = newSeat._id;
      }

      // update coordinates from zipcode
      let zipData = await db.ZipData.findOne({
        "properties.zip": newTables[i].zip
      });
      newTables[i].coordinates = zipData.properties.geopoint;
    }
    res = await db.Table.create(newTables);
    console.log(`Created ${res.length} tables.`);
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
    await db.ZipData.createIndexes();
  } catch (err) {
    console.log(err);
  }
}

seed().catch(console.log);
