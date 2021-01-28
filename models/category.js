const categories = {
    list: ['Web Development', 'Programming languages', 'IT'],

    getCategoriesId: function() {
        return this.list.keys()
    }
};

module.exports = categories;