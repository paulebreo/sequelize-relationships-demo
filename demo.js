const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'mydb.sqlite'
});

// 1 to 1
async function oneToone() {
try {
	const Gardener = db.define('gardener', {
    name: {type: Sequelize.STRING}
  })
  const Plot = db.define('plot', {
    name: {type: Sequelize.STRING}
  })
  Gardener.hasOne(Plot)
  Plot.belongsTo(Gardener)

  await db.authenticate();
  console.log('Connection has been established successfully.');
  await db.sync({force: true, logging: true});
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}


// 1 to m
async function oneTom() {
try {
	const Vegetable = db.define('vegetable', {
    name: {type: Sequelize.STRING}
  })
  const Plot = db.define('plot', {
    name: {type: Sequelize.STRING}
  })
  Plot.hasMany(Vegetable)
  Vegetable.belongsTo(Plot) // optional

  await db.authenticate();
  console.log('Connection has been established successfully.');
  await db.sync({force: true, logging: true});
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}

// m to m
async function mTom() {
try {
	const Vegetable = db.define('vegetable', {
  name: {type: Sequelize.STRING}
  })
  const Gardener = db.define('gardener', {
    name: {type: Sequelize.STRING}
  })

  const GardenerVegetable =db.define('gardenervegetable', {
    name: {type: Sequelize.STRING}
  })

  Gardener.hasMany(Vegetable) 
  Vegetable.belongsToMany(Gardener, { through: GardenerVegetable })

  await db.authenticate();
  console.log('Connection has been established successfully.');
  await db.sync({force: true, logging: true});
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}

// create: m to m
async function create() {
try {
  
  const Vegetable = db.define('vegetable', {
    name: {type: Sequelize.STRING}
  })
  const Gardener = db.define('gardener', {
    name: {type: Sequelize.STRING}
  })

  const GardenerVegetable =db.define('gardenervegetable', {
    name: {type: Sequelize.STRING}
  })

  Gardener.hasMany(Vegetable) 
  Vegetable.belongsToMany(Gardener, { through: GardenerVegetable })

  // Create and save tables
  await db.authenticate();
  console.log('Connection has been established successfully.');
  await db.sync({force: true, logging: true});

  // Create items
  const [gardener1, wasCreated1] = await Gardener.findOrCreate({
  where: {
    name: 'gardener1'
  }
  })
    const [pea, wasCreated2] = await Vegetable.findOrCreate({
  where: {
    name: 'pea'
  }
  })
  const [carrot, wasCreated3] = await Vegetable.findOrCreate({
  where: {
    name: 'carrot'
  }
  })

  gardener1.setVegetable(pea)
  gardener1.setVegetable(carrot)
  const gardenerVegetable = await GardenerVegetable.create({
    gardenerId: gardener1.gardenerId,
    vegetableId: pea.vegetableId,
  })
  const newGardener = await gardener1.save() 

  await db.sync();
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}

// create: 1-to-1

// create: 1-to-m

// read: one

// read: many

// update: one

// update: many

// delete


//oneToone();
//oneTom();
//mTom();

create();
//read();
//update();
//del();