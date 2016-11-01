import Ember from 'ember';
import layout from '../templates/components/timeline-item';
const {
  run,
  isEqual,
  observer,
  addObserver,
  removeObserver,
  computed,
  on
} = Ember;


export default Ember.Component.extend({
  layout,
  classNameBindings: ['isActive:active'],
  classNames: ['timeline-item'],
  tagName: 'section',
  activeIndex: 0,
  index: 0,

  setIsActive: on('didInsertElement',observer('activeIndex', 'index', function(){
    let {activeIndex, index} = this.getProperties("activeIndex", "index");
    this.set('isActive', activeIndex == index);
  })),

  setStyle: on('didInsertElement',observer('activeIndex', 'index', 'isActive', function(){
    let {activeIndex, index, isActive} = this.getProperties("activeIndex", "index", 'isActive');

      var zang = 400;

      if ((index - activeIndex)*600*-1 >= 600){
        zang = 600;
      }

      this.$().css('transform', `translate3d(0px, 0px, ${(index - activeIndex)*zang*-1}px)`);
      this.$().css('zIndex', index);

      if (!isActive){
        let op = index - activeIndex;

        if (index - 1 == activeIndex) {
          op = 5;
        }else if (index - 2 == activeIndex) {
          op = 1;
        }else {
          op = 0;
        }

        this.$().css('opacity', `.${op}`);
      }else {
        this.$().css('opacity', ".9");
      }
  })),

});
