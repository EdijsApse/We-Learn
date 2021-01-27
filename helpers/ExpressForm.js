class ExpressForm {
    constructor(inputs = {}, errors = []) {
        this.inputs = inputs;
        this.errors = errors;
    }

    oldInput(key) {
        return this.inputs.hasOwnProperty(key) ? this.inputs[key] : '';
    }

    hasError(key) {
        return this.errors.findIndex(e => e.field === key) !== -1 ? true : false;
    }

    getError(key) {
        return this.errors.find(e => e.field === key).message;
    }
}

module.exports = ExpressForm;