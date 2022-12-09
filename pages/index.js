import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {

  const [operation, setOperation] = useState('')
  const [result, setResult] = useState()

  function calculate(expression) {
    // Déclarer un tableau pour stocker les nombres et les opérateurs
    let numbers = [];
    let operators = [];
  
    // Déclarer une variable pour stocker le nombre en cours de traitement
    let currentNumber = "";
  
    // Parcourir chaque caractère dans l'expression
    for (let i = 0; i < expression.length; i++) {
      let char = expression[i];
  
      // Si le caractère est un chiffre, ajouter le chiffre au nombre en cours de traitement
      if (/[0-9]/.test(char)) {
        currentNumber += char;
      } else {
        // Sinon, si le nombre en cours de traitement n'est pas vide, ajouter le nombre au tableau des nombres
        if (currentNumber !== "") {
          numbers.push(parseInt(currentNumber, 10));
          currentNumber = "";
        }
  
        // Si le caractère est un opérateur, ajouter l'opérateur au tableau des opérateurs
        if (/[+-/*]/.test(char)) {
          operators.push(char);
        }
      }
    }
  
    // Si le dernier caractère de l'expression est un chiffre, ajouter le nombre au tableau des nombres
    if (currentNumber !== "") {
      numbers.push(parseInt(currentNumber, 10));
    }
  
    // Initialiser le résultat de l'expression à la première valeur du tableau des nombres
    let result = numbers[0];
  
    // Parcourir le tableau des opérateurs et des nombres
    for (let i = 0; i < operators.length; i++) {
      let operator = operators[i];
      let number = numbers[i + 1];
  
      // Appliquer l'opérateur courant au nombre courant et au résultat de l'expression
      if (operator === "+") {
        result += number;
      } else if (operator === "-") {
        result -= number;
      } else if (operator === "*") {
        result *= number;
      } else if (operator === "/") {
        result /= number;
      }
    }
  
    // Retourner le résultat de l'expression
    return result;
  }

  return (
   <div>
    <input onChange={(e) => setOperation(e.target.value)} value={operation} type="text"/>
    <button onClick={() => setResult(calculate(operation))}>Calculer</button>
    <p>{result}</p>
   </div>
  )
}
