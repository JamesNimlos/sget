(function () {
    var isNullOrUndef = function (val) { return val === undefined || val === null }
    var sget = function (instance, path) {
        return path.split('.').reduce(function (p, c) {
            return !isNullOrUndef(p) ? getValue(p, c) : undefined
        }, instance);
    }
    var findArrayOperator = /([^\[]*)\[([0-9]*)\]/
    //Get the child or get the element in the array if '[]' is present
    function getValue(parent, childProperty) {
        const matches = findArrayOperator.exec(childProperty)
        if (matches) { // The path includes accessing an element in an array
            const name = matches[1]
            const arrayIndex = matches[2]
            if (!isNullOrUndef(parent[name])) { return parent[name][arrayIndex] }
            else { return undefined }
        }
        else { return parent[childProperty] }
    }
    if (module) {
        module.exports = sget;
    }
    return sget;
})();
