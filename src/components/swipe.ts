export class Swipe {

  aantal:number = 0;
  startx:number = 0;
  endx:number = 0;

  msg:string = 'nothing yet..';

  attached() {
    this.addSwipeListener();
  }

  addSwipeListener() {

    let elems:HTMLCollectionOf<Element> = document.getElementsByClassName('carousel');
    for (let i=0;i<elems.length;i++) {
      let el:Element = elems.item(i);

      el.addEventListener('touchend', (e:TouchEvent) => {
        this.endx = e.changedTouches[0].clientX;
        this.aantal = e.touches.length;
        this.endx = e.touches[1].clientX;
        this.msg = `touchend -> aantal touches: ${e.touches.length}`;
      });

      el.addEventListener('touchmove', (e:TouchEvent) => {
        this.msg = `we've been moved..`;
        for(let i=0;i<e.touches.length;i++) {
          this.msg = `move x = ${e.touches.item(i).clientX}`;
        }
      }, false);

      el.addEventListener('touchstart', (e:TouchEvent) => {
        e.preventDefault();
        this.aantal = e.touches.length;
        this.startx = e.touches[0].clientX;
        // for(let i=0;i<e.touches.length;i++) {
        //   this.msg = `start x = ${e.touches.item(i).clientX}`;
        // }
      }, false);

      el.addEventListener('touchcancel', e => {
        e.preventDefault();
        this.msg = 'touch cancelled..';
      });
    }
  }
}
