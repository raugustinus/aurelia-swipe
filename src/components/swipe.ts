import * as $ from 'jquery';

export class Swipe {

  msg:string = 'nothing yet..';

  attached() {
    console.log(`Swiping shizzle: `);
    this.addSwipeListener();
  }

  addSwipeListener() {

    let elems:HTMLCollectionOf<Element> = document.getElementsByClassName('carousel');
    for (let i=0;i<elems.length;i++) {

      let el:Element = elems.item(i);
      console.log(`found one.. > ${el.id}`);

      el.addEventListener('touchstart', e => {
        e.preventDefault();
        this.msg = `can't touch this.`;
      }, false);

      el.addEventListener('touchend', e => {
        e.preventDefault();
        this.msg = `touchend..`;
      });

      el.addEventListener('touchcancel', e => {
        e.preventDefault();
        this.msg = 'touch cancelled..';
      });

      el.addEventListener('touchmove', e => {
        this.msg = `we've been moved..`;
      }, false);
    }
  }

  handleEnd() {
    console.log(`We're done touching..`);

  }

  handleCancel() {
    console.log(`Cancelled touch?!`);
    this.msg = 'bla..';
  }

  handleMove() {
    this.msg = 'handling move..'
  }
}
