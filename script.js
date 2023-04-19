//Take the big element
const allContainer = document.getElementById("game-container");

//Tomando por DOM los botones y los textos de score  & bestScore
const startButton = document.getElementById("start-game");
const resetButton = document.getElementById("reset-game");
const scoreDisplay = document.getElementById("score");
const bestScoreDisplay = document.getElementById("best-score");

//Aclara las variables principales
let card1 = null;
let card2 = null;
let cartaVolteadas = 0;
let noClik = false;

//Score & bestScore
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

//Poniendo eventos en los botones
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

function startGame(){

    hideStartButton();


//Los elementos son colores 12 elementos 6 colores
const arcoiris = ["red","blue","green","orange","purple","brown",
                "red","blue","green","orange","purple","brown"];

//Esta funcion lo que ara es barajar los elementos es decir que tomara el indice y los mescvlara en randum                
function barajando(array) {
  let contando = array.length;

  // Siempre y cuando aiga algun elemento en el areglo
  while (contando > 0) {
    // Tomara un elemento(indice) randum con la medida de el indice.
    let index = Math.floor(Math.random() * contando);

    contando--;

    //Intercambian de valor
    let auxiliar = array[contando];
    array[contando] = array[index];
    array[index] = auxiliar;
  }

  return array;
}

//Aplicamos la funcion de baraja en el areglo arcoiris para que sea un array randum.
let shuffledColors = barajando(arcoiris);

//Esta funcion creara elementos y les ponmtra un evento de clik a cada uno, recuerda que para eso necesitamos hacer bucles
function createDivsForColors(colorArray) {
    //Tomaremos la cantidad de elementos de ekl areglo y lo guardandamos en variable color
  for (let color of colorArray) {
    //Varable que contendra un elemento nuevo (<div>)
    const newDiv = document.createElement("div");
    //Le pondremos un atributo classe y el atributo tendra como valor un nombre de un ekemento de el areglo, ocea un color
    newDiv.classList.add(color);
    //Que el elemento sea gris por ahora 
    newDiv.style.backgroundColor = "#d1dced";
    //Le pondremos un event tipo clik que ara la funcion de detectar clik en la card
    newDiv.addEventListener("click", detectClik);
    //Cuando se cree con todo y el atributo lo bamos a poner dentro de el div game-container
    allContainer.append(newDiv);
  }
}

// function updateBestScore(){
//   if (score < bestScore || bestScore === 0){
//       bestScore = score;
//       localStorage.setItem("bestScore", bestScore);
//       bestScoreDisplay.textContent = `20`;
//       console.log('Is worcking?');
//   }
//   else{
//     console.log('Goooo?');
//   }

// }

//Con esta funcion detectaremos los cliks de cada carta es el testeo de los clik.
function detectClik(e) 
{
    //Si noclick es falso regresa el valor 
  if (noClik) //noClik = false;
    {
    return;
    }
    //
  if (e.target.classList.contains("flipped"))//Si al que le dio clik tiene atributo flipped regrese valor.
    {
     return;
    }

    //La carta actualizada es decir esta variable tendra el valor de la card que acavamos de dar clik(temporalmente)
  let cartaActual = e.target;
  //El color de la card sera la de el elemento pero tomaremos el color por el nombre de la clasee de el elemnto(recuerda que tiene nombre de color)
  cartaActual.style.backgroundColor = cartaActual.classList[0];

  //Si carta1 o carta2 no son null
  if (!card1 || !card2) {
    //carta actual se le anadira como atributo flipped
    cartaActual.classList.add("flipped");
    //carta1 sera igual a carta1 o a carta actual
    card1 = card1 || cartaActual;
    //carta2 es igual a carta actuall si es igual a carta1 si esto es igual entonces carta2 es igual a carta actual.
    card2 = cartaActual === card1 ? null : cartaActual;
  }

  //Si carta1 y carta2 son iguales
  if (card1 && card2) 
    {
        //se activara a true el no agas clik mas
    noClik = true;
    // Aremos unas variables mas a estas variables les daremos el nombre atributo de cada elemnto si son iguales.
    let match1 = card1.className;
    let match2 = card2.className;

    //si estos dos class name son iguales
    if (match1 === match2) 
    {
        //Se suma dos a esta variable, lo cual indica la cantidad de elementos bolteadas
      cartaVolteadas += 2;

      //Ambas carta bolteadas se les eliminara el event click
      card1.removeEventListener("click", detectClik);
      card2.removeEventListener("click", detectClik);

      //reset variables
      card1 = null;
      card2 = null;
      noClik = false;
    } 
    else //Si ambas cartas bolteadas no son iguales de la class name
    {
        //Pondremos un tiempo de 1 segundo para que buelvan a boltearse normal
      setTimeout(function() 
      {
        //Como no son iguales cuando buelva a su valor orijinal el elemento sera otra vez gris por ahora
        card1.style.backgroundColor = "#d1dced";
        card2.style.backgroundColor = "#d1dced";

        //Como no son iguales bamos a remover el class name flipped de estos elementos
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");

        //Llamamos a la funcion de incremento score.
        updateScore();
  

        //reset variables
        card1 = null;
        card2 = null;
        noClik = false;
      }, 1000);//1s
    }
  }

  //Si todas las cartas an sido volteadas que nos muetre una alerta de game over por ahora.
  if (cartaVolteadas === arcoiris.length) {
    //Aqui ba la parte de updateScore cuando el juego se termina es decir cuando las cartas todas ahigan sido bolteadas.
    bestScore = score;
      localStorage.setItem("bestScore", bestScore);
      bestScoreDisplay.textContent = bestScore;
      console.log('Is worcking?');
    alert("You found the pair of all colors");
    alert("Press reset game for play again");
  };
}

//Con este comando creamos los divs y pondremos las funciones que acavamos de implementar.
createDivsForColors(shuffledColors);
}


function updateScore(){
    score++;
    scoreDisplay.textContent = score;
}



function resetGame(){
    score = 0;
    scoreDisplay.textContent = score;

    allContainer.innerHTML = '';
    
    // newDiv.style.backgroundColor = "black";

    showStartButton();
}


function hideStartButton(){
    document.getElementById('start-game').style.display = 'none';//el elmento estara none
    document.getElementById('reset-game').style.display = 'block';
}

function showStartButton(){
    document.getElementById('start-game').style.display = 'block';//el elemento bolvera a aparecer.
    document.getElementById('reset-game').style.display = 'none';
}
