import Scene from './scene';

var startDemo = function(){
  const canvas = document.querySelector('.canvas');
  var demoScene = new Scene(canvas);
  demoScene.start();
};

startDemo();