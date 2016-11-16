var balanceRoles = {

    /** @param {roleToChange} roleToChange **/
     
  run: function(arrayOfCreeps, roleToChangeLimit, roleString) {

    var roleToChangeDiff = roleToChangeLimit - arrayOfCreeps.length;

    if (roleToChangeDiff < 0) {
      for (i = 0; i < -(roleToChangeDiff); i++){
        console.log('removed 1 ' + roleString);
        arrayOfCreeps[i].suicide();
      }
    } else if (roleToChangeDiff > 0) {
      for (i = 0; i < roleToChangeDiff; i++){
        console.log('added 1 ' + roleString);
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: roleString});
      }
    }
  }
  
};

module.exports = balanceRoles;