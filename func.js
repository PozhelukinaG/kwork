//1-Евклидова, 2-Манхэттенская, 3-Минковского

 var metrics=1;   //выбираем метрику, она влияет на форму получаемых изображений на диаграмме
 
 function Metrics1(k){
   metrics=k;}

 function Metrics2(k){
   metrics=k;}

 function Metrics3(k){
   metrics=k;}


 var numPoints = 0;//номера точек
 var X=new Array(), Y=new Array(), C=new Array(); //создание массивов
				//X-координаты точки по х, Y-координаты точки по у, C- нетронутые точки
 var canvas=document.getElementById("diagramCanvas");//ищет элемент по id
 var context=canvas.getContext("2d");//Этот метод генерирует контекст рисования, который будет связан с указанным холстом

 function randomNumber (max) { //Случайное число [0;max-1]
  return Math.floor(Math.random()*max)
 }

 function randomColor() { //Случайный цвет с интенсивностью компонент не ниже 33hex
  return "#"+
   ("00"+(51+randomNumber(205)).toString(16)).slice(-2)+
   ("00"+(51+randomNumber(205)).toString(16)).slice(-2)+
   ("00"+(51+randomNumber(205)).toString(16)).slice(-2)
 }

 function Metric (x, y) { //форма изображений на диаграмме определяются следующими мат.выражениями 
  if (metrics==1) { return Math.sqrt(x*x + y*y); }
  if (metrics==2) { return Math.abs(x) + Math.abs(y); }
  if (metrics==3) { return(Math.pow(Math.pow(Math.abs(x),3) + Math.pow(Math.abs(y),3),0.33333)); }
 }


 function Diagram() { //Диаграмма
  var width=canvas.width,  //присваиваем значения с канвы
      height=canvas.height;
  var dist1=dist0=j=0, //начальное расстояние принимаем равным 0
      width1=width, 
      height1=height;
  context.fillStyle="white"; //fillStyle определяет цвет заливки
  context.fillRect(0,0,width,height);//fillRect(x, y, ширина, высота) Рисует закрашенный прямоугольник
  for (var y=0; y<height1; y++) {
   for (var x=0; x<width1; x++) {
    dist0=Metric (height1,1); 
    j = -1;
    for (var i=0; i<numPoints; i++) {
     dist1 = Metric (X[i]-x, Y[i]-y);
     if (dist1 < dist0) { dist0=dist1; j=i; }
    }
    context.fillStyle=C[j]; 
    context.fillRect(x,y,1,1);
   }
  }
  context.fillStyle="black";
  for (var i=0; i<numPoints; i++) {
   context.fillRect (X[i], Y[i], 3, 3);
  }
 }

 canvas.onclick = function (event) { //Обработчик кликов
   var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;//координаты точки в canvas
    var y = event.clientY - rect.top;
   for (var i=0; i<X.length; i++) {
   if (Math.sqrt(Math.pow(X[i]-x,2)+Math.pow(Y[i]-y,2))<5) {
    context.fillStyle="red"; //точка будет обрамлена красным цветом, если будет повторное попадание по ней
    context.fillRect (X[i]-2, Y[i]-2, 7, 7);
    context.fillStyle="black";//а внутри останется черной
    context.fillRect (X[i], Y[i], 3, 3);
    return; //Подчеркнём, что "слишком близко" и не добавляем
   }
  }
  X[numPoints] = x;
  Y[numPoints] = y;
  C[numPoints] = randomColor();
  numPoints++;
  Diagram();

 }

