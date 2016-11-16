var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var balanceRoles = require('balanceRoles');

module.exports.loop = function () {
  
  var harvestersNumber = 2,
    buildersNumber = 2,
    upgradersNumber = 2;
    
    //Make harvesters if running low on energy
    if (Game.rooms['sim'].energyAvailable == 0){
      harvestersNumber = harvestersNumber + 2;
    }
    //Remove builders if nothing to build
    if (Game.rooms['sim'].find(FIND_CONSTRUCTION_SITES) == 0){
      buildersNumber = 0;
    }
    
    

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

    console.log('harvesters: ' + harvesters.length + '/' + harvestersNumber + '|builders: ' + builders.length + '/' + buildersNumber+'|upgraders: ' + upgraders.length + '/' + upgradersNumber)
    
    
    balanceRoles.run(harvesters, harvestersNumber, 'harvester')
    balanceRoles.run(builders, buildersNumber, 'builder')
    balanceRoles.run(upgraders, upgradersNumber, 'upgrader')
    
    
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