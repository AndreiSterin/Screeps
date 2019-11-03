var spawnCounter = require('spawnCounter');
module.exports = {
    report: function() {
        var counter = spawnCounter.countActual();
        var report = spawnCounter.string(counter);
        console.log(report);
    },
    spawn: function(a,b,c) {
        spawnCounter.autoQueuer(a,b,c);
    }
};