export class Swipe {

  swipeTrack;
  msg:string = 'nothing yet..';

  attached() {
    this.addSwipeListener();
  }

  addSwipeListener() {

    let elems:HTMLCollectionOf<Element> = document.getElementsByClassName('carousel');
    for (let i=0;i<elems.length;i++) {

      let el:Element = elems.item(i);

      el.addEventListener('touchstart', (e:TouchEvent) => {
        e.preventDefault();
        this.msg = `can't touch this.`;
        for(let i=0;i<e.touches.length;i++) {
          this.msg = `x = ${e.touches.item(i).clientX}`;
        }
      }, false);

      el.addEventListener('touchend', e => {
        e.preventDefault();
        this.msg = `touchend..`;
      });

      el.addEventListener('touchcancel', e => {
        e.preventDefault();
        this.msg = 'touch cancelled..';
      });

      el.addEventListener('touchmove', (e:TouchEvent) => {
        this.msg = `we've been moved..`;
        for(let i=0;i<e.touches.length;i++) {
          this.msg = `x = ${e.touches.item(i).clientX}`;
        }
      }, false);
    }
  }
}
