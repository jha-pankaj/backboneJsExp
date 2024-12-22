
import ItemsCollection  from '../collections/Items.js';
import ItemView from '../views/ItemView.js';

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'showList'
    },

    initialize: function() {
        this.items = new ItemsCollection([
            { name: 'Item 1', done: false },
            { name: 'Item 2', done: true }
        ]);
    },

    showList: function() {
        console.log("showList",document.getElementById('item-list'))
        var listView = new Backbone.View({
            el: '#item-list'
        });
        console.log("" ,listView)

        this.ItemsCollection.each(function(item) {
            var itemView = new ItemView({ model: item });
            listView.$el.append(itemView.render().el);
        });
    }
});

module.exports = AppRouter;
