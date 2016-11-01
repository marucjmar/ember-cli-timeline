import Ember from 'ember';
import layout from '../templates/components/timeline-content';

const {
  run,
  isEqual,
  observer,
  addObserver,
  removeObserver
} = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['timeline-content'],
  tagName: 'section',

  activeIndex: 0,
  items: [],

  didInsertElement: function(){
    var selfs = this;
    this.$().on('mousewheel', function(e){
      selfs.scroll(e);
    });
  },

  scroll: function(e){
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (delta > 0){
      run.debounce(this, this.prev, 100, true);
    }else {
      run.debounce(this, this.next, 100, true);
    }
  },

  next: function(){
    let length = this.get('items.length');
    let activeIndex = this.get('activeIndex');

    if (activeIndex < length)
      this.incrementProperty('activeIndex', 1);
  },

  prev: function(){
    let activeIndex = this.get('activeIndex');

    if (activeIndex > 0)
      this.decrementProperty('activeIndex', 1);
  },

  obser: observer('activeIndex', function(){
    let length = this.get('items.length');
    let activeIndex = this.get('activeIndex');

    if (activeIndex >= length-3)
      this.get('items').pushObjects([4,5,6,7])
  })





});
