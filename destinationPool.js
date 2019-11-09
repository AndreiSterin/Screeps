var destinationPool =  {
    flag: {x: 21, y:23},
    alive_list: function(type) {
        var result = [];
        for (var name in Game.creeps) {
            result.push(Game.creeps[name].id);
        }
        return result;
    },
    destination_list : function(type) {
        return Game.spawns['Spawn1'].room.find(type);
    },
    empty_sources_map: function(destination_list) {
        var sources_map = {};
        for (var dest_idx in destination_list) {
            var source_id= destination_list[dest_idx].id;
            sources_map[source_id] = 0;
        }
        return sources_map;
    },
    cleanup_dead_creeps: function(type) {
        var alive_list = this.alive_list(type);
        var names_to_delete = [];
        for (var name in Memory.m_creep_destination) {
            var id = Game.creeps[name].id;
            if (!alive_list.findIndex(id)) {
                names_to_delete.append(name);
            }
        }
        for (var name in names_to_delete) {
            this.free(type, name);
        }
    },
    create_sources_map_from_scratch: function(type) {
        var destination_list = this.destination_list(type);
        // this.cleanup_dead_creeps(type);
        // TODO compare destination_list with creep_destination (update)

        // Build destination object now.
        var sources_map = this.empty_sources_map(destination_list);
        for (id in Memory.m_creep_destination) {
            var destination = Memory.m_creep_destination[id];
            sources_map[destination] = sources_map[destination] + 1;
        }
        return sources_map;
    },
    init_destinations: function(type) {
        var destination_list = this.destination_list(type);
        Memory.destination = this.create_sources_map_from_scratch();
        Memory.temp = destination_list;
        Memory.m_creep_destination = {};
    },
    get: function(type, name) {
        if (Memory.m_creep_destination[name]) {
            var id = Memory.m_creep_destination[name];
            return Game.getObjectById(id);
        }
        var destinations = this.destination_list(type);
        for (var dest_idx in destinations) {
            var id = destinations[dest_idx].id;
            if (!Memory.destination[id]) {
                Memory.destination[id] = 0;
            } else if (Memory.destination[id] < 1) {
                Memory.destination[id] = Memory.destination[id] + 1;
            } else {
                continue;
            }
            console.log(Memory.destination[id]);
            Memory.m_creep_destination[name] = id;
            return Game.getObjectById(id);
        }
    },
    free: function(type, name) {
        if (Memory.m_creep_destination[name]) {
            var id = Memory.m_creep_destination[name];
            delete Memory.m_creep_destination[name];
            Memory.destination[id] = Memory.destination[id] - 1;
        }
    }
};
module.exports = destinationPool;