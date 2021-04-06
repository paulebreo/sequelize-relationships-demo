const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'mydb.sqlite'
});

// ASSOCIATIONS ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

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


// MAGIC METHODS /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// create: m to m
async function createMtoM() {
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

  gardener1.addVegetable(pea)
  gardener1.addVegetable(carrot)
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
async function create1To1() {
try {
  
  const Gardener = db.define('gardener', {
    name: {type: Sequelize.STRING}
  }) 
  const Plot = db.define('plot', {
    name: {type: Sequelize.STRING}
  })

  Gardener.hasOne(Plot) 
  Plot.belongsTo(Gardener)

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
    const [plot1, wasCreated2] = await Plot.findOrCreate({
  where: {
    name: 'pea'
  }
  })

  gardener1.setPlot(plot1)
  const newGardener = await gardener1.save() 

  await db.sync();
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}

// create: 1-to-m
async function create1toM() {
try {
  
  const Vegetable = db.define('vegetable', {
    name: {type: Sequelize.STRING}
  })
  const Plot = db.define('plot', {
    name: {type: Sequelize.STRING}
  })


  Plot.hasMany(Vegetable) 
  Vegetable.belongsTo(Plot)

  // Create and save tables
  await db.authenticate();
  console.log('Connection has been established successfully.');
  await db.sync({force: true, logging: true});

  // Create items
  const [plot1, wasCreated1] = await Plot.findOrCreate({
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

  plot1.addVegetable(pea)
  plot1.addVegetable(carrot)

  const newPlot = await plot1.save() 

  await db.sync();
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}

// create: create in bulk
async function createBulkItems() {
try {
  
  const Vegetable = db.define('vegetable', {
    name: {type: Sequelize.STRING}
  })
  const Plot = db.define('plot', {
    name: {type: Sequelize.STRING}
  })


  Plot.hasMany(Vegetable) 
  Vegetable.belongsTo(Plot)

  // Create and save tables
  await db.authenticate();
  console.log('Connection has been established successfully.');
  await db.sync({force: true, logging: true});

  // Create items
  const [plot1, wasCreated1] = await Plot.findOrCreate({
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

  plot1.addVegetable(pea)
  plot1.addVegetable(carrot)

  const newPlot = await plot1.save() 

  await db.sync();
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}

// read: findAll
async function readFindAll() {
try {
  
  const Vegetable = db.define('vegetable', {
    name: {type: Sequelize.STRING}
  })
  const Plot = db.define('plot', {
    name: {type: Sequelize.STRING}
  })


  Plot.hasMany(Vegetable) 
  Vegetable.belongsTo(Plot)

  await db.authenticate();
  console.log('Connection has been established successfully.');
  await db.sync({force: true, logging: true});

  // Create items
  const [plot1, wasCreated1] = await Plot.findOrCreate({
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

  plot1.addVegetable(pea)
  plot1.addVegetable(carrot)

  const newPlot = await plot1.save() 
  // Find all vegetables
  const vegs = await Vegetable.findAll();
  console.log(vegs.every(veg => veg instanceof Vegetable)); // true
  console.log("All vegetabless:", JSON.stringify(vegs, null, 2));

  await db.sync();
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}

// read: findWhere
async function readFindWhere() {
try {
  
  const Vegetable = db.define('vegetable', {
    name: {type: Sequelize.STRING}
  })
  const Plot = db.define('plot', {
    name: {type: Sequelize.STRING}
  })


  Plot.hasMany(Vegetable) 
  Vegetable.belongsTo(Plot)

  await db.authenticate();
  console.log('Connection has been established successfully.');
  await db.sync({force: true, logging: true});

  // Create items
  const [plot1, wasCreated1] = await Plot.findOrCreate({
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

  plot1.addVegetable(pea)
  plot1.addVegetable(carrot)

  const newPlot = await plot1.save() 
  // Find carrot
  const vegs = await Vegetable.findAll({
    where: {
      name: 'carrot'
    }
  });
  console.log(vegs.every(veg => veg instanceof Vegetable)); // true
  console.log("All vegetabless:", JSON.stringify(vegs, null, 2));

  await db.sync();
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}

// read: findAll2 - many-to-many example
async function readFindAll2() {
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

  Gardener.belongsToMany(Vegetable, { through: GardenerVegetable })
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

    const [gardener2, wasCreated1b] = await Gardener.findOrCreate({
  where: {
    name: 'gardener2'
  }
  })
    const [onion, wasCreated2] = await Vegetable.findOrCreate({
  where: {
    name: 'onion'
  }
  })
  const [carrot, wasCreated3] = await Vegetable.findOrCreate({
  where: {
    name: 'carrot'
  }
  })
  const [tomato, wasCreated4] = await Vegetable.findOrCreate({
  where: {
    name: 'tomato'
  }
  })
  const [corn, wasCreated5] = await Vegetable.findOrCreate({
  where: {
    name: 'corn'
  }
  })
  
  gardener1.addVegetable(onion)
  gardener1.addVegetable(carrot)
  gardener1.addVegetable(tomato)

  gardener2.addVegetable(tomato)
  gardener2.addVegetable(corn)
  
  const newGardener1 = await gardener1.save() 
  const newGardener2 = await gardener2.save()
  
  const vegs = await Gardener.findAll({
    include:[{
      model: Vegetable
    }
    ]
  })

  const gardeners = await Vegetable.findAll({
    include:[{
      model: Gardener,
      attributes:['name']
    }]
  })
  
  console.log("All vegetables:", JSON.stringify(vegs, null, 2));

  console.log("All gardeners:", JSON.stringify(gardeners, null, 2));

  await db.sync();
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}

// update
async function updateDemo() {
try {
  
  const Vegetable = db.define('vegetable', {
    name: {type: Sequelize.STRING}
  })
  const Plot = db.define('plot', {
    name: {type: Sequelize.STRING}
  })


  Plot.hasMany(Vegetable) 
  Vegetable.belongsTo(Plot)

  await db.authenticate();
  console.log('Connection has been established successfully.');
  await db.sync({force: true, logging: true});

  // Create items
  const [plot1, wasCreated1] = await Plot.findOrCreate({
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

  plot1.addVegetable(pea)
  plot1.addVegetable(carrot)

  const newPlot = await plot1.save() 
  
  // Update
  await Vegetable.update({ name: 'onion' }, {
    where: {
      name: 'carrot'
    }
  });

  const vegs = await Vegetable.findAll()
  console.log(vegs.every(veg => veg instanceof Vegetable)); // true
  console.log("All vegetabless:", JSON.stringify(vegs, null, 2));

  await db.sync();
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}

// delete
async function deleteDemo() {
try {
  
  const Vegetable = db.define('vegetable', {
    name: {type: Sequelize.STRING}
  })
  const Plot = db.define('plot', {
    name: {type: Sequelize.STRING}
  })


  Plot.hasMany(Vegetable) 
  Vegetable.belongsTo(Plot)

  await db.authenticate();
  console.log('Connection has been established successfully.');
  await db.sync({force: true, logging: true});

  // Create items
  const [plot1, wasCreated1] = await Plot.findOrCreate({
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

  plot1.addVegetable(pea)
  plot1.addVegetable(carrot)

  const newPlot = await plot1.save() 
  
  // Update
  await Vegetable.destroy({
    where: {
      name: 'pea'
    }
  });

  const vegs = await Vegetable.findAll()
  console.log(vegs.every(veg => veg instanceof Vegetable)); // true
  console.log("All vegetabless:", JSON.stringify(vegs, null, 2));

  await db.sync();
  await db.close();
} 
catch (error) {
  console.error('Unable to connect to the database:', error);
  }
}


// Uncomment to run an example

// Assoctiation examples
//oneToone();
//oneTom();
//mTom();

// Magic method examples
//create1toM();
//create1To1();
//createMtoM();
//createBulkItems()
//readFindAll();
//readFindWhere();
readFindAll2();
//updateDemo();
//deleteDemo();