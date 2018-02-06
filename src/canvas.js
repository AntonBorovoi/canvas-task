class Canvas {
  constructor(width, height, elements){
    this.canvas = document.getElementById('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.elements = elements;
  }

  init() {
    const rect = this.canvas.getBoundingClientRect();
    this.offsetX = rect.left;
    this.offsetY = rect.top;
    this.canvas.onmousedown = this.onMouseDown.bind(this);
    this.canvas.onmouseup = this.onMouseUp.bind(this);
    this.canvas.onmousemove = this.onMouseMove.bind(this);
  }

  onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    const mx = parseInt(e.clientX - this.offsetX);
    const my = parseInt(e.clientY - this.offsetY);

    this.elements.some((element, index) => {
      if(element.isPointInside(mx, my)){
        element.changeIsDraggingValue(true);
        this.elements.splice(0, 0, this.elements.splice(index, 1)[0]);
        this.isDragMode=true;
        return element;
      }
    });

    this.startX = mx;
    this.startY = my;
  };

  onMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragMode = false;

    this.elements.forEach((element, index) => {
      element.changeIsDraggingValue(false);
      let hasIntersectionElements = false;

      this.elements.find((comparingElement, innerIndex) => {
        if (index === innerIndex) return;
        if (element.isIntersectWith(comparingElement)) {
          return hasIntersectionElements = true;
        }
      });

      if (hasIntersectionElements) element.changeHasIntersectionsValue(true);
      else element.changeHasIntersectionsValue(false)
    });

    this.drawElements();
  };

  onMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.isDragMode){
      const mx = parseInt(e.clientX - this.offsetX);
      const my = parseInt(e.clientY - this.offsetY);

      const dx = mx - this.startX;
      const dy = my - this.startY;

      this.elements.forEach(element => {
        if(element.isDragging){
          element.move(dx, dy);
        }
      });

      this.startX = mx;
      this.startY = my;

      this.drawElements();
    }
  }

  clear() {
    this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawElements() {
    this.clear();
    this.elements.forEach((element) => {
      element.draw(this.canvas);
    })
  }
}

export default Canvas;