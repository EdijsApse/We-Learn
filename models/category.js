const categories = {
    list: ['Web Development', 'Programming languages', 'IT'],

    getCategoriesId: function() {
        return this.list.keys()
    },

    getCategoryName: function(key) {
        const category = this.list.find((name, index) => index === key);
        
        return category ? category : 'Unknonw';
    }
};

module.exports = categories;