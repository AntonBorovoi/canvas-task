class Polygon {
  constructor(numberOfSides, size, Xcenter, Ycenter, color) {
    this.numberOfSides = numberOfSides;
    this.size = size;
    this.Xcenter = Xcenter;
    this.Ycenter = Ycenter;
    this.color = color;
    this.isDragging = false;
    this.hasIntersections = false;
    this._calculatePoints();
  }

  _calculatePoints() {
    this.points = [];
    for (let i = 0; i < this.numberOfSides; i += 1) {
      let point = {
        x: this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides),
        y: this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides)
      };

      this.points.push(point);
    }
  }

  draw(canvas) {
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'destination-over';
    context.beginPath();

    this.points.forEach((point, index) => {
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });

    context.fillStyle = this.hasIntersections ? 'red' : this.color;
    context.fill();
  }

  changeIsDraggingValue(value) {
    this.isDragging = value;
  }

  changeHasIntersectionsValue(value) {
    this.hasIntersections = value;
  }

  move(coordinateX, coordinateY) {
    this.points.forEach(point => {
      point.x += coordinateX;
      point.y += coordinateY;
    })
  }

  isIntersectWith(polygon) {
    let axis = {x: 0, y: 0};
    let tmp, minA, maxA, minB, maxB;
    let side;

    for (side = 0; side < this.numberOfSides; side++) {
      if (side === 0) {
        axis.x = this.points[this.numberOfSides - 1].y - this.points[0].y;
        axis.y = this.points[0].x - this.points[this.numberOfSides - 1].x;
      } else {
        axis.x = this.points[side - 1].y - this.points[side].y;
        axis.y = this.points[side].x - this.points[side - 1].x;
      }

      tmp = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
      axis.x /= tmp;
      axis.y /= tmp;

      minA = maxA = this.points[0].x * axis.x + this.points[0].y * axis.y;
      this.points.forEach(point => {
        tmp = point.x * axis.x + point.y * axis.y;
        if (tmp > maxA) maxA = tmp;
        else if (tmp < minA) minA = tmp;
      });

      minB = maxB = polygon.points[0].x * axis.x + polygon.points[0].y * axis.y;
      polygon.points.forEach(point => {
        tmp = point.x * axis.x + point.y * axis.y;
        if (tmp > maxB) maxB = tmp;
        else if (tmp < minB) minB = tmp;
      });

      if (maxA < minB || minA > maxB) return false;
    }

    for (side = 0; side < polygon.numberOfSides; side++) {
      if (side === 0) {
        axis.x = polygon.points[polygon.numberOfSides - 1].y - polygon.points[0].y;
        axis.y = polygon.points[0].x - polygon.points[polygon.numberOfSides - 1].x;
      } else {
        axis.x = polygon.points[side - 1].y - polygon.points[side].y;
        axis.y = polygon.points[side].x - polygon.points[side - 1].x;
      }

      tmp = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
      axis.x /= tmp;
      axis.y /= tmp;

      minA = maxA = this.points[0].x * axis.x + this.points[0].y * axis.y;

      this.points.forEach(point => {
        tmp = point.x * axis.x + point.y * axis.y;
        if (tmp > maxA) maxA = tmp;
        else if (tmp < minA) minA = tmp;
      });

      minB = maxB = polygon.points[0].x * axis.x + polygon.points[0].y * axis.y;
      polygon.points.forEach(point => {
        tmp = point.x * axis.x + point.y * axis.y;
        if (tmp > maxB) maxB = tmp;
        else if (tmp < minB) minB = tmp;
      });

      if (maxA < minB || minA > maxB) return false;
    }

    return true
  }

  isPointInside(pointX, pointY) {
    let c = false;
    for( let  i = -1, l = this.points.length, j = l - 1; ++i < l; j = i)
      ((this.points[i].y <= pointY && pointY< this.points[j].y) || (this.points[j].y <= pointY && pointY < this.points[i].y))
      && (pointX < (this.points[j].x - this.points[i].x) * (pointY - this.points[i].y) / (this.points[j].y - this.points[i].y) + this.points[i].x)
      && (c = !c);
    return c;
  };
}

export default Polygon;