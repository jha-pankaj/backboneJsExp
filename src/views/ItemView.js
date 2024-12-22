import Backbone from 'backbone';
import _ from 'underscore';

var ItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('vvvvname:<%- name %> status <%- done ? "Done" : "Not Done" %>'),

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
});

export default ItemView;
