import * as $ from 'jquery';
import 'bootstrap';

class SimpleTouch {
  x:number;
  when:number;
  constructor(x:number) {
    this.x = x;
    this.when = Date.now();
  }
}

enum SwipeDirection {
  RIGHT, LEFT
}

export class Swipe {

  aantal:number = 0;
  startx:number = 0;
  endx:number = 0;

  start:SimpleTouch = null;
  end:SimpleTouch = null;

  msg:string = 'nothing yet..';

  attached() {
    this.addSwipeListener();
  }

  gotoSlide() {
    $('#aurelia-swipe').carousel(2);
  }

  addSwipeListener() {

    let elems:HTMLCollectionOf<Element> = document.getElementsByClassName('carousel');
    for (let i=0;i<elems.length;i++) {
      let el:Element = elems.item(i);

      el.addEventListener('touchend', (e:TouchEvent) => {
        this.endx = e.changedTouches[0].clientX;
        this.aantal = e.touches.length;
        this.msg = `touchend -> aantal touches: ${e.touches.length}`;

        this.end = new SimpleTouch(this.endx);
        this.msg = 'are we detecting !??';
        switch (this.isSwipe(this.start.x, this.end.x)) {
          case SwipeDirection.LEFT:
            // document.getElementById('aurelia-swipe').carousel('next');
            $('#aurelia-swipe').carousel('next');
            break;
          case SwipeDirection.RIGHT:
            $('#aurelia-swipe').carousel('prev');
            break;
          default:
            console.log(`Unknown swipe direction. This shouldn't happen`);
            break;
        }
      });

      // el.addEventListener('touchmove', (e:TouchEvent) => {
      //   this.msg = `we've been moved..`;
      //   for(let i=0;i<e.touches.length;i++) {
      //     this.msg = `move x = ${e.touches.item(i).clientX}`;
      //   }
      // }, false);

      el.addEventListener('touchstart', (e:TouchEvent) => {
        e.preventDefault();
        this.aantal = e.touches.length;
        this.startx = e.touches[0].clientX;
        this.start = new SimpleTouch(e.touches[0].clientX); // don't care about your other fingers in e.touches
      }, false);

      el.addEventListener('touchcancel', e => {
        e.preventDefault();
        this.msg = 'touch cancelled..';
      });
    }
  }



  public isSwipe(pointA:number, pointB:number):SwipeDirection {

    if ( (this.end.when - this.start.when) > 500) {
      this.msg = `too slow`;
      return;
    }

    if (pointA == pointB) {
      this.msg = `That's impossible!?!`;
    } else if (pointA > pointB) { // swipe left
      this.msg = `Detected swipe LEFT!`;
      return SwipeDirection.LEFT;
    } else if (pointA < pointB) { // swipe right
      this.msg = `Detected swipe RIGHT!`;
      return SwipeDirection.RIGHT;
    }
  }
}
