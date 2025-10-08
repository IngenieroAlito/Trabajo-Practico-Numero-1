import promptSync from 'prompt-sync';
let numero1 = Number(prompt("Ingresa el primer número:"));
let numero2 = Number(prompt("Ingresa el segundo número:"));
let operador = prompt("Ingresa la operación (+, -, *, /):");
let resultado; 
if (operador === "+") {
  resultado = numero1 + numero2;
} else if (operador === "-") {
  resultado = numero1 - numero2;
} else if (operador === "*") {
  resultado = numero1 * numero2;
} else if (operador === "/") {
  resultado = numero1 / numero2;
} else {
  alert("Operador no valido")
}
if (resultado !== undefined) {
  alert("El resultado es: " + resultado)
}