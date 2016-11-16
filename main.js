var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var balanceRoles = require('balanceRoles');

module.exports.loop = function () {
  
  var harvestersNumber = 5,
    buildersNumber = 3,
    upgradersNumber = 2;

    var tower = Game.getObjectById('2fca61e55fdc529c0e13e8b7');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    var harvestersChange = harvestersNumber - harvesters.length,
      buildersChange = buildersNumber - builders.length,
      upgradersChange = upgradersNumber - upgraders.length;
      
    //console.log('harvestersChange('+harvestersChange+'), buildersChange('+buildersChange+'), upgradersChange('+upgradersChange+')')
    
    balanceRoles.run(harvesters,builders,upgraders,harvestersChange,buildersChange,upgradersChange);
    balanceRoles.run(builders,harvesters,upgraders,buildersChange,harvestersChange,upgradersChange);
    balanceRoles.run(upgraders,builders,harvesters,upgradersChange,buildersChange,harvestersChange);
    
    
    
    /*if(harvesters.length < 4 && Game.rooms['sim'].energyAvailable >= 300) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    if(builders.length < 4 && Game.rooms['sim'].energyAvailable >= 300) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    if(upgraders.length < 3 && Game.rooms['sim'].energyAvailable >= 300) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }*/
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}