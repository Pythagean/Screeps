var balanceRoles = {

    /** @param {roleToChange} roleToChange **/
    run: function(roleToChange, secondRole, thirdRole, roleToChangeDiff, secondRoleDiff, thirdRoleDiff) {
      if (roleToChangeDiff<0) {
        console.log('removing creeps')
      //If secondRole also need be added
      if (secondRoleDiff>0){
        for (i = 0; i < -(roleToChangeDiff); i++){
          roleToChange[i].memory.role = secondRole[0].memory.role;
        }
      } 
      //If thirdRole also need be added
      if (thirdRoleDiff>0){
        for (i = 0; i < -(roleToChangeDiff); i++){
          roleToChange[i].memory.role = thirdRole[0].memory.role;
        }
      } 
      //Otherwise just destroy 
      else {
        for (i = 0; i < -(roleToChangeDiff); i++){
          roleToChange[i].suicide();
        }
      }
    //If roleToChange need to be added
    } else if (roleToChangeDiff>0) {
      console.log('adding creeps')
      //If secondRole also need be reduced
      if (secondRoleDiff<0){
        for (i = 0; i < roleToChangeDiff; i++){
          secondRole[i].memory.role = roleToChange[0].memory.role;
        }
      } 
      //If thirdRole also need be reduced
      if (thirdRoleDiff<0){
        for (i = 0; i < roleToChangeDiff; i++){
          thirdRole[i].memory.role = roleToChange[0].memory.role;
        }
      } 
      //Otherwise just add 
      else {
        for (i = 0; i < roleToChangeDiff; i++){
          var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: roleToChange[0].memory.role});
        }
      }
    }
	}
};

module.exports = balanceRoles;