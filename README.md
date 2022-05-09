<h1 align="center">PROJECT QUIZ SPA<project-name></h1>


## Índice 

* Sobre el proyecto
    * Objetivos
    * Instalación y despliegue
    * Tecnologías usadas
    

* Descripción del proyecto
    * Parte de HTML
    * Parte Bootstrap
    * Parte CSS
    * Parte Javascript
  
* Retos logrados
    * Resolución de conflictos en Git
        
    * Página web en SPA
        * Conocimiento de las clases d-none en Bootstrap
        * Separación del HTML  en diversas secciones: Inicio, Quiz y Resultados
        
    * Dificultades con API
        * Trabajar con axios para obtener datos de la API
        * Hacer la petición a la API correctamente
        * Hacer uso del parámetro de la función para poder utilizar los datos obtenidos en el resto del js
        * Trabajar con el operador spread y la desestructuración 
            * Desestructuración para coger los elementos del objeto que nos interesaban: Question, correct answer y array de incorrects answers
            * Uso del operador spread para aunar en un solo array las 4 respuestas
            * Uso de replaceAll para limpiar las questiones de &quots; y otros símbolos que no permitían la correcta lectura
    * Dificultades con Asíncronías 
        * Varios addEventListeners no funcionaban como requería la aplicación
        * Hacer asíncrona la función que se encargará de recoger todos los datos de la API
        
* Agradecimientos
* Autores

<project-description>

## Proyecto de SPA QUIZ

El proyecto consiste en desarrollar un cuestionario (quiz), de un total de 10 preguntas.
Cada pregunta tendrá 4 opciones y sólo una de ellas es la correcta. Este quiz además debe ser 
una SPA (single-page application), es decir, trabajamos en un html solamente. Las preguntas van a provenir de la API https://opentdb.com/. El objetivo de este proyecto es consolidar los conocimientos aprendidos tanto en HTML, como CSS y Javascript, además de obtener más experiencia en el manejo de git al trabajar en equipo como colaboradores del mismo repositorio. En nuestro caso, también hemos optado por trabajar con Bootstrap conjuntamente con nuestro CSS para unir lo aprendido en el proyecto anterior, y darle un poco más de dificultad al adjuntar un modal de Bootstrap para mostrar la respuesta correcta.

</br>

### Instalación y despliegue

Para instalar este proyecto debes hacer lo siguiente: primero acceder desde github al repositorio y proceder a clonártelo con el siguiente comando:
````
git clone https://github.com/vaneebg/PROJECT-QUIZ
````
 


## Tecnologías utilizadas

- HTML
- Javascript
- CSS
- Bootstrap


<h2 align="center"><b>Descripción del proyecto</b><phase-one></h2>

### Parte de HTML
El archivo de HTML consta de tres secciones diferenciadas:
- Sección HOME: Es la sección introductoria al Quiz. En ella tenemos el título principal: "Anime Quiz: Are you a real Otaku?" con su introducción y un elemento input que pedirá al usuario introducir su Nickname. Posteriormente, está el botón "take a quiz" con el que empezaremos el cuestionario:
![foto](/Assets/home.png)

- Sección QUIZ: Es la parte correspondiente al cuestionario en sí. Primero tendremos la pregunta y se dibujarán 4 respuestas abajo en forma de cards. Una vez el usuario pinche la card que considere, se abrirá un Modal diciéndole cuál era la respuesta correcta con un butón de siguiente cuestión. Así hasta el total de las 10 preguntas. Además arriba se irá rellenando una barra de progreso conforme avancemos por las preguntas:
![foto](/Assets/quiz.png)

- Sección RESULTS: nos mostrará nuestra puntuación y abajo tendremos una lista ordenada de mayor a menor puntuación con los usuarios anteriores que hayan hecho el quiz:
![foto](/Assets/results.png)

### Parte Bootstrap
Hemos utilizado Bootstrap para el diseño principal de nuestra SPA. Hemos elegido una card principal dentro de la cual hemos metido el resto de cards. Las 4 opciones de respuesta son 4 cards compuestas por una foto y un texto. Tendremos también un alert de la class "danger" que nos dirá durante un tiempo determinado que debemos introducir un usuario para poder comenzar el quiz y una barra de progreso de la class bar-striped con el color success.

### Parte CSS
Para no entorpecer a Bootstrap, sirviéndonos del conocimiento sobre la especificidad en CSS, hemos puesto diferentes ID a las partes que queríamos cambiar. Con ello lo que hacemos es utilizar esa ventaja, ya que el estilo de un ID se sobrepone al estilo de una clase.

### Parte Javascript
Para empezar con el archivo Javascript, tenemos declaradas las diferentes variables que vamos a utilizar:
FOTO


Como se puede observar, hemos cogido las partes del DOM que vamos a necesitar, tanto las 3 secciones como los botones que harán diferentes tareas, además del modal en sí, y la declaración de dos últimas variables que usaremos en las funciones.


El resto de apartados del archivo JS los iremos explicando según van desarrollándose. Por ello, la primera función es la siguiente:
![foto](/Assets/questions%20api%201%20parte.png)

Esta función es asíncrona ya que necesitamos que los datos de la API estén cogidos desde el inicio. Declaramos una variable que denominamos arrayAPI, que esperará a tener los datos mediante la libería de Javascript de Axios. Para ello, cogemos la URL que nos proporciona la misma API y que hará referencia a las 10 cuestiones con sus respuestas.
Después declaramos un array vacío sobre el que haremos push más adelante. 

Lo que hacemos ahora es coger los datos que nos interesan, es decir, data.results, y hacer un bucle que, para cada elemento, haga las siguientes tareas:
* Primero desestructurar nuestro objeto, trayendo los 3 datos que nos interesan: questions, correct_answer y incorrect_answers (las dos últimas las hemos renombrado).
* Después unir la respuesta correcta con el array que lleva las otras 3 respuestas erróneas.
* Como tercer paso, hemos depurado la question inicial, ya que traía algunos símbolos que no permitían la lectura correcta de la pregunta.
* Por último, hemos creado la variable arrayQuestions1 donde hemos puesto la pregunta ya limpia,la respuesta correcta solamente y las respuestas previamente unidas. Y con esto, hemos hecho push para rellenar esa array vacía que habíamos declarado anteriormente.


Después hemos añadido los dos addEventListeners que tenemos y que irán recogiendo las funciones anidadas.
![foto](/Assets/addevent.png)
Por un lado, el de buttonStart, que activa una función anónima que se encarga de lo siguiente:
* Primero, preventDefault para cancelar los eventos que vienen predeterminados con la página. 
* Solucionará el condicional: si el input del usuario está vacío, saltará nuestra alerta avisando a la persona de que debe rellenar este campo, volviendo a su class "d-none cuando pasen 4 segundos; una vez relleno hará lo siguiente:  
* Inicializa nuestra variable del index y de respuestas correctas en 0.
* Llama a dos funciones, hideView que oculta las secciones:
![foto](/Assets/hideview.png)
    
    y nextQuestion:
![foto](/Assets/nestquestion.png)

Esta última función se encarga de llamar a la función showQuestion (cuyo parámetro sigue siendo data, añadiéndole nuestro index), y a resetState, cuya función es:
* Eliminar la clase de la sección quiz para que esté visible.
* Mientras haya respuestas escritas, se tienen que ir borrando.

![foto](/Assets/resetstate.png)


 En lo referente a showQuestion, se encarga de:
![foto](/Assets/showquestion.png)
* Definir la variable progreso, que será el número del current index por 10, para así sacar el porcentaje de la barra de progreso que nos interesa según se avance.
* Se pinta la pregunta en el espacio que le hemos dado en el html (questionTitle)
* Después empieza un bucle de la posición 2 del array que es donde están las 4 respuestas, donde para cada respuesta (answer), nos va a pintar una card, teniendo al final un total de 4 cards (4 posibles respuestas). También posee un índice para que, en nuestro array de imágenes, vaya rotando por las 4 que hay, así cada card tendrá una imagen diferente.
    - Estas mismas cards, tienen un addEventListener que se activará cuando el usuario elija una de ellas, independientemente de cuál sea, y llamará a la función selectAnswer, que se encargará de:
    ![foto](/Assets/selectanswer.png)

    * Crear una array con las 4 respuestas y un bucle que las recorra, donde se llama a la función setSatatusClass, cogiendo de parámetro la propia card, y añadiéndoles el atributo correct.
    ![foto](/Assets/setstatusclas.png)
        * Esta función evaluará si el atributo está, y si es el caso, pintará la respuesta de verde, mientras que si es incorrecta, se pintará de rojo.
    * Pintará la respuesta correcta en el modal.
    * Activará la función de abrir modal.
    * Si la respuesta corresponde con la correcta, nuestro contador rightAnswers sumará 1.
    * Le decimos además que card estará como hijo de la sección answerOptions.
    * Y por último, si es la respuesta válida, su atributo correct va a ser verdadero (=true).


Para finalizar, tenemos el siguiente addEventListener puesto junto al segundo para evitar problemas de asíncronía. En este evento del botón Next, se activa una función que, si aún quedasen preguntas, es decir, si la longitud de nuestra arrayQuestions (data) siga siendo mayor que nuestro index, entonces sumará uno a ese mismo index y llamará a la función que hemos explicado antes, nextQuestion. Dentro de ese mismo condicional, si la pregunta ya fuese la novena, cambiamos el texto del botón a "check results".
![foto](/Assets/buttonnext.png)

Sin embargo, si ya no quedasen más preguntas, lo que hará será:
* Llamar a la función saveData: ésta crea un objeto con nuestro nobmre de usuario y nuestra puntuación. Posteriormente se hace push sobre el array declarado arriba del archivo js como vacío en caso de que no haya nada en localStorage, y finalmente guarda este array en él.
![foto](/Assets/savedata.png) 
* Llamar a la función printData: en ella primero se declara la variable usersBack que serán los datos recogidos mediante JSON.parse de localStorage.
Después ordena de mayor a menor las puntuaciones de los usuarios y, por último, pinta en el HTML el resultado del último usuario. Posteriormente, recorre el bucle de todos los usuarios anteriores guardados en localStorage y los va pintando dentro de cards.
* Llamar a la función closeModal, que cerrará nuestro modal además de la función que vimos anteriormente hideView, y por último, haremos visible la sección resultados.
     

</br>

## Retos logrados
- Resolución de conflictos en Git:
Al trabajar en equipo, tenemos que lidiar con diversas dificultades, como por ejemplo, al hacer push y que el otro miembro del equipo hiciese git pull para bajarse el proyecto, surgían diferentes errores. Uno muy común era tener que aceptar los cambios que nos interesaban realmente, aprendiendo la metodología de aceptarlos y después crear un commit informando de ello, para solucionar el estado MERGING en el que nos encontrábamos en Git.
        

- Página web en SPA
    * Conocimiento de las clases d-none en Bootstrap: Como nos propusimos crear el proyecto en base a estilos de Bootstrap, tuvimos que familiarizarnos con la forma que tienen de mostrar el display mediante la clase d-none.
    * Separación del HTML  en diversas secciones: Como sólo nos debemos servir de un único HTML, hay que estructurarlo de forma diferente. En nuestro caso, creamos varias secciones, visualizando las 3 diferentes partes en las que queríamos hacer funcionar al Quiz. Por un lado, el apartado Home, que sería como la bienvenida al usuario, después el cuerpo en sí de la página, que es el propio Quiz, y finalmente la sección resultados.
        
- Dificultades con API
    * Trabajar con axios para obtener datos de la API: Puesto que nos han explicado a hacer este paso mediante fetch y axios, hemos resuelto hacerlo en este último, y para ello tenemos que copiar la siguiente línea de código:
    FOTO

    * Hacer la petición a la API correctamente
    * Hacer uso del parámetro de la función para poder utilizar los datos obtenidos en el resto del js: Como hemos descrito anteriormente, al consumir la promesa con .then, los datos sólo eran utilizables aquí dentro, por lo que, dentro de los addEventListeners, hemos llamado a las funciones que seguían con el parámetro data.
    * Trabajar con el operador spread y la desestructuración:
        * Desestructuración para coger los elementos del objeto que nos interesaban: hemos tenido que poner en práctica los conocimientos de estas acciones para poder sacar de nuestros datos las partes que nos interesaban y poderlas unir en un array cómodo para trabajar. 
            * Uso del operador spread para aunar en un solo array las 4 respuestas
            * Uso de replaceAll para limpiar las questiones de &quots; y otros símbolos que no permitían la correcta lectura
    * Dificultades con Asíncronías 
        * Hacer asíncrona la función que se encargará de recoger todos los datos de la API: hemos aprendido a usar async para la función, siempre unido de await.
        * Varios addEventListeners no funcionaban como requería la aplicación: Si utilizábamos los addEventListeners fuera de la asincronía, los datos muchas veces no llegaban a la función que estábamos llamando. También se producían otros errores como en el addEventListener del botón Next, ya que el índice empezaba a comportarse de forma errática, sumando mal por la pregunta que va el usuario.
        





## Vista previa Responsive

<br>









## Autores


- [Fran](https://github.com/franpd8)

- [Vanesa Beltrán](https://github.com/vaneebg)


## Agradecimientos
-[Germán](https://github.com/GeerDev)



