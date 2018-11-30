import * as $ from 'jquery';
import 'bootstrap';

class PointInTime {
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

  start:PointInTime = null;
  end:PointInTime = null;

  msg:string = 'nothing yet..';

  dragEnd: PointInTime;
  dragStart: PointInTime;

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

        this.end = new PointInTime(this.endx);
        switch (this.isSwipe(this.start.x, this.end.x)) {
          case SwipeDirection.LEFT:
            $('#aurelia-swipe').carousel('next');
            break;
          case SwipeDirection.RIGHT:
            $('#aurelia-swipe').carousel('prev');
            break;
          default:
            console.log(`Unknown swipe direction. This shouldn't happen`);
            break;
        }
        e.stopPropagation();
      });

      el.addEventListener('dragstart', (e:MouseEvent) => {
        this.dragStart = new PointInTime(e.screenX);
        e.stopPropagation();
      });

      el.addEventListener('dragend', (e:MouseEvent) => {
        this.dragEnd = new PointInTime(e.screenX);
        switch (this.isMouseSwipe(this.dragStart.x, this.dragEnd.x)) {
          case SwipeDirection.LEFT:
            $('#aurelia-swipe').carousel('next');
            break;
          case SwipeDirection.RIGHT:
            $('#aurelia-swipe').carousel('prev');
            break;
          default:
            console.log(`Unknown swipe direction. This shouldn't happen`);
            break;
        }
        e.stopPropagation();
      });

      el.addEventListener('touchstart', (e:TouchEvent) => {
        e.preventDefault();
        this.aantal = e.touches.length;
        this.startx = e.touches[0].clientX;
        this.start = new PointInTime(e.touches[0].clientX); // don't care about your other fingers in e.touches
      }, false);

      el.addEventListener('touchcancel', e => {
        e.preventDefault();
        this.msg = 'touch cancelled..';
      });
    }
  }

  public isMouseSwipe(pointA:number, pointB:number):SwipeDirection {

    if ( (this.dragEnd.when - this.dragStart.when) > 500) {
      this.msg = 'Dragged too slow..';
    }

    if (pointA == pointB) {
      this.msg = 'no movement..?!';
    } else if (pointA > pointB) {
      this.msg = 'Detected drag left';
      return SwipeDirection.LEFT;
    } else if (pointA < pointB) {
      this.msg = 'Detected drag right';
      return SwipeDirection.RIGHT;
    }
  }

  testButton(val:string) {
    console.log(`test button ${val}`);
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
