var spawnCounter =  {
    autoQueuer: function(a,b,c) {
        var counterActual = spawnCounter.countActual();
        var counterLimit = spawnCounter.create(a,b,c); 
        var counterDiff = spawnCounter.difference(counterLimit, counterActual);
        console.log('Following units added to spawn queue: ' + this.string(counterDiff));
        for (var key in counterDiff) {
            if (counterDiff[key] > 0) {
                for (var i = 0; i < counterDiff[key]; i++) {
                    Game.spawns['Spawn1'].memory.queue.push(key);
                }
            }
            
        }
    },
    create: function(numH_, numU_, numB_) {
        return {
            harvester: numH_,
            upgrader: numU_,
            builder: numB_
        };
    },
    string: function(counter) {
        var result = '';
        for (var item in counter) {
            result = result + item + ': ' + counter[item] + '; ';
        }
        return result;
    },
    countActual: function() {
        var counter = this.create(0,0,0);
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            counter[creep.memory.role]++;
        }
        for (var name in Game.spawns) {
            var spawn = Game.spawns[name];
            for (var item in spawn.memory.queue) {
               counter[spawn.memory.queue[item]]++; 
            }
        }
        return counter;
    },
    difference: function(c1, c2) {
        var result = this.create(0,0,0);
        for (var key in c1) {
            result[key] = c1[key] - c2[key];
        }    
        return result;
    }
    
};
module.exports = spawnCounter;
