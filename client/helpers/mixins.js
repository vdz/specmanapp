/**
 * generates a bound function collection, using an object's bind array property
 * @class utils.Bind
 * @constructor
 */
function Bind(){
    var i,fn;

    /**
     * holds the generated bound function collection
     * @property bound
     * @protected
     * @type object
     */
    this.bound = function(name){
        if (!this.bound[name]){
            try {
                this.bound[name] = this[name].bind(this);
            } catch (e) {
                console.warn("Trying to bind undefined method " + name);
                return;
            }
        }

        return this.bound[name];
    };

    if (!this.bind) return;

    for (i=0; fn = this.bind[i]; i++){
        this.bound(fn);
    }
}

/**
 *  A simple mixin for managing an options argument. Mixin uses the defaultOptions property to identify default options.
 *  Mixin also automatically identify on* properties as events and assigns them
 *
 *  @class utils.Options
 *  @constructor
 *
 */

function Options(){
    var key;
    this.options = {};

    for (key in this.defaultOptions) if (this.defaultOptions.hasOwnProperty(key)) {
        this.options[key] = this.defaultOptions[key];
    }

    /**
     * @method setOptions
     * @param {object} options
     * @chainable
     */
    this.setOptions = function(options){
        var key;
        if (typeof options !== 'object' || options === null) return this;
        for (key in options) if (options.hasOwnProperty(key)){
            if (key in this.options) this.options[key] = options[key];
        }

        return this;
    };
}
/**
 * this method acts like merge, only that it only merges properties of the original object
 *
 * _Creates a new object rather than actually merge_
 *
 * @method setOptions
 * @static
 * @param {Object} defaults a map of default properties
 * @param {Object} options a map of values to merge
 *
 * @return {Object} new merged object
 */
Options.setOptions = function(defaults, options){
    var opts = {}, key;

    for (key in defaults) if (options[key]){
        opts[key] = options[key];
    }else{
        opts[key] = defaults[key];
    }

    return opts;
};

export {
    Options,
    Bind
};
