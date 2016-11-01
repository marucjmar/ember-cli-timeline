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
  canScroll: false,
  items: [],
  _mouseWheelListner: null,
  _scroolListner: null,

  didInsertElement: function(){
    this._mouseWheelListner = Ember.run.bind(this, this.scroll);
    this._scroolListner = Ember.run.bind(this, this.manageScroll);

    this.$().on('mousewheel',this._mouseWheelListner);
    Ember.$(document).scroll(this._scroolListner );
  },

  manageScroll(){
    var eTop = this.$().offset().top;

    if (eTop - Ember.$(window).scrollTop() < 0){
      Ember.$('html').css("overflow", "hidden");
      this.set('canScroll', true);
    }else{
      Ember.$('html').css("overflow", "auto");
      this.set('canScroll', false);
    }
  },

  scroll: function(e){
    if (this.get('canScroll')){
      var e = window.event || e; // old IE support
      var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      if (delta > 0){
        run.debounce(this, this.prev, 100, true);
      }else {
        run.debounce(this, this.next, 100, true);
      }
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
      this.get('items').pushObjects([4,5,6,7]);

    if (activeIndex<= 0){
      $('html').css("overflow", "auto");
    }
  }),

  willDestroyElement(){

    if (this._mouseWheelListner){
      this.$().off('mousewheel', this._mouseWheelListner);
      this.$().unbind('mousewheel', this._mouseWheelListner);
    }

    if (this._scroolListner) {
      Ember.$(window).off('scroll', this._scroolListner);
      Ember.$(window).unbind('scroll', this._scroolListner);
    }

  }



});
