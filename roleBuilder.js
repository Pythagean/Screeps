var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
              creep.moveTo(15,20);
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES),
              structuresWithEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.energy >= creep.carryCapacity
              });
            
          var arrayOfAvailableEnergy = sources.concat(structuresWithEnergy),
            moveToObject = creep.pos.findClosestByPath(arrayOfAvailableEnergy);

          if(creep.harvest(moveToObject) == ERR_INVALID_TARGET) {
            if(creep.withdraw(moveToObject,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(moveToObject);
            }
          }
          if(creep.harvest(moveToObject) == ERR_NOT_IN_RANGE) {
              creep.moveTo(moveToObject);
          }
	    }
	}
};

module.exports = roleBuilder;