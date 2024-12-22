
import Backbone from 'backbone';

var Item = Backbone.Model.extend({
    defaults: {
        name: '',
        done: false,
    },
});

export default Item;
