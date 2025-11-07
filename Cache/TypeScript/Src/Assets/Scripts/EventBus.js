
if (!global.EventBus) {
    global.EventBus = {
        events: {},

        on: function (name, callback) {
            if (!this.events[name]) this.events[name] = [];
            this.events[name].push(callback);
        },

        off: function (name, callback) {
            if (!this.events[name]) return;
            var i = this.events[name].indexOf(callback);
            if (i >= 0) this.events[name].splice(i, 1);
        },

        emit: function (name, data) {
            if (!this.events[name]) return;
            this.events[name].forEach(function (cb) { cb(data); });
        }
    };
}