function Tracer(name) {
    this.module = this.constructor;
    this.capsule = tm.allocate(this);
    $.extend(this, this.capsule);
    this.setName(name);
    return this.new;
}

Tracer.prototype = {
    constructor: Tracer,
    _setData: function () {
        var args = Array.prototype.slice.call(arguments);
        tm.pushStep(this.capsule, {type: 'setData', args: toJSON(args)});
        return this;
    },
    _clear: function () {
        tm.pushStep(this.capsule, {type: 'clear'});
        return this;
    },
    _wait: function () {
        tm.newStep();
        return this;
    },
    processStep: function (step, options) {
        switch (step.type) {
            case 'setData':
                this.setData.apply(this, fromJSON(step.args));
                break;
            case 'clear':
                this.clear();
                break;
        }
    },
    setName: function (name) {
        var $name;
        if (this.new) {
            $name = $('<span class="name">');
            this.$container.append($name);
        } else {
            $name = this.$container.find('span.name');
        }
        $name.text(name || this.defaultName);
    },
    setData: function () {
        var data = toJSON(arguments);
        if (!this.new && this.lastData == data) return true;
        this.new = this.capsule.new = false;
        this.lastData = this.capsule.lastData = data;
        return false;
    },
    resize: function () {
    },
    refresh: function () {
    },
    clear: function () {
    },
    attach: function (tracer) {
        if (tracer.module == LogTracer) {
            this.logTracer = tracer;
        }
        return this;
    },
    mousedown: function (e) {
    },
    mousemove: function (e) {
    },
    mouseup: function (e) {
    },
    mousewheel: function (e) {
    }
};