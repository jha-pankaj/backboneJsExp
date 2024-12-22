import Backbone from 'backbone';
import Item from '../models/Item';

var Items = Backbone.Collection.extend({
    model: Item,
});

export default Items;
