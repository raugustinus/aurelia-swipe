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
        console.log('we have been touched..');
        this.msg = `can't touch this.`;
      }, false);
      // el.addEventListener('touchend', this.handleEnd);
      // el.addEventListener('touchcancel', this.handleCancel);
      el.addEventListener('touchmove', this.handleMove, false);
    }
  }

  handleEnd() {
    console.log(`We're done touching..`);
    this.msg = `touchend..`;
  }

  handleCancel() {
    console.log(`Cancelled touch?!`);
    this.msg = 'bla..';
  }

  handleMove() {
    this.msg = 'handling move..'
  }
}
