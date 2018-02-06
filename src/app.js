import Canvas from './canvas';
import Polygon from './polygon';

window.onload = function () {
  const polygons = [];
  polygons.push(new Polygon(3, 30, 50, 50, 'blue'));
  polygons.push(new Polygon(4, 30, 50, 150, 'green'));
  polygons.push(new Polygon(5, 30, 50, 250, 'orange'));
  polygons.push(new Polygon(6, 30, 50, 350, 'gray'));
  polygons.push(new Polygon(7, 30, 50, 450, 'yellow'));
  const canvas = new Canvas(window.innerWidth, window.innerHeight, polygons);
  canvas.init();
  canvas.drawElements();
};