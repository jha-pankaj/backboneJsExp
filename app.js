import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import ItemView from './views/ItemView';
import Items from './collections/Items';

// Initialize the app router
var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'showList',
    },

    initialize: function () {
        this.items = new Items([
            { name: 'Item 1', done: false },
            { name: 'Item 2', done: true },
        ]);
    },

    showList: function () {
        // Define a custom list view
        var ListView = Backbone.View.extend({
            el: '#item-list',

            render: function () {
                this.$el.empty(); // Clear the element
                this.collection.each(function (item) {
                    var itemView = new ItemView({ model: item });
                    this.$el.append(itemView.render().el);
                }, this);
                return this;
            },
        });

        var listView = new ListView({
            collection: this.items,
        });

        listView.render();
    },
});

var appRouter = new AppRouter();
Backbone.history.start();
