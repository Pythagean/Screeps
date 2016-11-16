var balanceRoles = {

    /** @param {roleToChange} roleToChange **/
     
  run: function(arrayOfCreeps, roleToChangeLimit, roleString) {

    var roleToChangeDiff = roleToChangeLimit - arrayOfCreeps.length;

    if (roleToChangeDiff < 0) {
      for (i = 0; i < -(roleToChangeDiff); i++){
        arrayOfCreeps[i].suicide();
      }
    } else if (roleToChangeDiff > 0) {
        for (i = 0; i < roleToChangeDiff; i++){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: roleString});
      }
    }
  }
  
};

module.exports = balanceRoles;