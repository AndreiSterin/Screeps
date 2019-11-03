var spawnCounter = require('spawnCounter');
var spawnBehavior = {
    setter: function(role) {
        var creep_body;
        var creep_memory;
        switch (role) {
            case 'harvester':
                creep_memory = {role: 'harvester'};
                creep_body = [MOVE, CARRY, WORK];
                break;
            case 'upgrader':
                creep_memory = {role: 'upgrader'};
                creep_body = [MOVE, CARRY, WORK];
                break;
            case 'builder':
                creep_memory = {role: 'builder'};
                creep_body = [MOVE, CARRY, WORK];
                break;
            default:
                console.log('WARNING: unknown role  '+ role);
                creep_memory = {role: 'harvester'};
                creep_body = [MOVE, CARRY, WORK];
                break;
        };
        
        var obj = {
            body: creep_body,
            mem: creep_memory
        };
        return obj;
    },
    run: function(spawn) {
        if (!spawn.memory.queue) {
            spawn.memory.queue = [];
        }
        if (spawn.memory.queue.length > 0) {
            if (!spawn.memory.id) {
                spawn.memory.id = 0;
            } 
            var creepname = spawn.memory.queue[0] + spawn.memory.id;
            var obj = this.setter(spawn.memory.queue[0]);
            if (spawn.spawnCreep(obj.body, creepname, {memory: obj.mem}) == 0) {
                console.log('spawning nice dude with the name ' + creepname);
                spawn.memory.queue.shift();
                spawn.memory.id++;
            }
        }
    }
};

module.exports = spawnBehavior;