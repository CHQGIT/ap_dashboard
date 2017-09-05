//binding methods in react components:

function Wizard(){
  this.castSpell = function(){return "KABOOM"}
};

var merlin = new Wizard();
console.log("usando patrón constructor para invocación de funciones ", merlin.castSpell());

//Aplicar patrón de invocación: en este caso modifica el valor de x del obj1, usando una función con parámetros. Se usa call para realizar esta modificación.
// Se puede usar (y es lo mismo que) apply.  addAndSetX.apply(obj1,[1,1]);
function addAndSetX(a,b){

  this.x += a+b;
  console.log(a,b,this.x);
}

var obj1 = {x: 1, y: 2};

addAndSetX.call(obj1,1,1);
addAndSetX.apply(obj1,[1,1]);

console.log("usando apply como patrón de invocación",obj1);


//Funciones bind: se puede usar bind con una funcion mas un objeto (o this).

function add(x,y){
  this.result += x + y;
}

var computation1 = {result: 0};
//se une la funcion add con computation1 que tiene a result como propiedad.
var boundedAdd = add.bind(computation1);

//Ahora result tiene el valor 0 por defecto (según computation1)
console.log("valor por defecto de computation1", computation1);
//se modifica el valor de result desde boundedAdd.

boundedAdd(1,2);
console.log(computation1.result);

var boundedAddPlusTwo = add.bind(computation1, 2); // 3 +  2) = 5
boundedAddPlusTwo(4);
console.log(computation1.result); //5 (valor actual  + 4 (nuevo valor)) = 9

//la funcion bind no puede ser cambiada manualmente por call o apply. Ej:
var obj = {boundedPlusTwo: boundedAddPlusTwo}  // 9 + 2
obj.boundedPlusTwo(4); // 11 + 4
console.log(computation1); // = 15

var computation2 = { result: 0 };
var x = add.bind(computation2);
x(1,2);

console.log("valores bind no se pueden heredar con call");
console.log(computation1);
console.log(computation2);

  //var obj2 = add.bind(computation2);
  //obj2(4,2)
  //console.log(computation2);
