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

  setTranslate: observer('activeIndex', 'index', 'isActive', function(){
    let translateZ = this._calculateTranslate();

    if ((translateZ > -4000 && translateZ < 0 ) || (translateZ < 4000 && translateZ > 0 ) ){
      this.setTranslateZ(translateZ);
    }
  }),

  setDefaultStyle: on('didInsertElement', function(){
    let translateZ = this._calculateTranslate;
    this.setTranslateZ(translateZ);
  }),

  _calculateTranslate(){
    let {activeIndex, index} = this.getProperties("activeIndex", "index", 'isActive');

    var zang = 400;

    if ((index - activeIndex)*600*-1 >= 600){
      zang = 600;
    }

    let translateZ = (index - activeIndex)*zang*-1;

    return translateZ;
  },

  setTranslateZ: function(translate){
    let {activeIndex, index, isActive} = this.getProperties("activeIndex", "index", 'isActive');

    this.$().css('transform', `translate3d(0px, 0px, ${translate}px)`);
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
  }

});
