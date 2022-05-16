
# Proyecto Final
Adrián Ramos Colón                                 
 1ºDAM
## 
Realiza un proyecto con replit.com.  **Atención al nombre del proyecto que se llamará como se indica abajo**.

Responde a esta tarea con la url del proyecto que tiene esta estrucrtura: **[https://replit.com/@<usuarioReplit>/<ASIR/DAM_PFINAL_apellido1apellido2nombre>](https://replit.com/@%3CusuarioReplit%3E/%3CASIR/DAM_PFINAL_apellido1apellido2nombre%3E);**.

El proyecto tendrá un archivo **README.md**  con el nombre del alumno y unas explicaciones básicas del proyecto.

El proyecto consiste en una aplicación que se ejecute en el entorno web de replit.com con nodejs, lenguaje typescript y módulo mongoose para el acceso a una base de datos en **[Mongo Atlas](https://educacionadistancia.juntadeandalucia.es/centros/sevilla/mod/page/view.php?id=481496 "Mongo Atlas")**.  

La aplicación se usará directamente en el entrono Replit y en modo línea de comando con menús.

Se utilizarán al menos dos colecciones que estarán conectadas por campos con el criterio PK-FK de Bases de Datos Relacionales, que nos permitirán utilizar el  [operador $lookup](https://educacionadistancia.juntadeandalucia.es/centros/sevilla/mod/page/view.php?id=18390 "Operador $lookup")  del método aggretate. Estas dos colecciones servirán para hacer persistentes las clases correspondientes, aunque podría haber, y esto representa un nivel más complejo, una sola clase asociada a dos colecciones, con un campo que sería un array de documentos de la otra colección.

Se programarán opciones de menú que devuelvan información que necesite la ejecución de métodos aggregate aplicados a las colecciones que formen el modelo de datos del proyecto que diseñes.

Para algunos requisitos de información se usarán filtros a partir de datos solicitados por teclado.

Las colecciones y las clases deberán tener campos de distintos tipos: cadenas de caracteres, números, tipo documento, tipo array, booleanos, fecha... y el suficiente juego de datos para que las consultas tengan sentido y se aprecie la utilidad de los operadores usados.  

Se deberán utilizar los operadores más significativos de mongoDB vistos en las clases presenciales y/o en esta plataforma. Hay operadores muy importantes para los cálculos como es $group.  

El proyecto tendrá una conexión con algún aspecto del mundo real y un nivel de complejidad en la estructura de los documentos similar a lo visto en la segunda evaluación.

Se valorará la aportación personal: diseño de clases y colecciones, consultas con el uso de tipos arrays,  [fechas](https://educacionadistancia.juntadeandalucia.es/centros/sevilla/mod/page/view.php?id=329705 "Fechas"), la lógica de la unión entre las colecciones y las operaciones que involucren datos de más de una colección.

La fecha de entrega es inamovible, no se admitirán proyectos fuera de la fecha de entrega.

El alumno defenderá su proyecto en clase y se valorará la presentación y las respuestas a cuestiones planteadas por el profesor.

Para la presentación, que será de unos 15 minutos, se usará el entorno replit.com (por lo que el código debe escribirse con claridad, con comentarios aclaratorios, evitando el scroll lateral) se dará una explicación introductoria del proyecto, la estructura de las clases y documentos de las colecciones y se mostrarán las funciones asociadas a las opciones de menú más elaboradas que se hayan realizado.


# Files

## src

La carpeta *src* contiene los fuentes de todo el código aplicado para la aplicación

- **classes**: Se encuentran los objetos que se utilizan en al app con sus declaraciones y atributos
- **helpers**: Un paquete orientado a procesos donde se encuentra todo el crudo de la aplicación.
- **schemas**: Un paquete donde se declaran los esquemas que deben seguir los objetos de nuestra aplicación a la hora de interactuar con la base de datos
- **database**: Un paquete donde se encuentra la instancia que representa nuestra base de datos y su conexión
- **routes**: Un paquete que actúa como controlador, redirigiendo el flujo de actuación de la aplicación

## index

La clase *main* de la aplicación donde comienza el flujo y la encargada de hacer las llamadas oportunas para encauzar el flujo de ejecución

# Descripción
El proyecto realizado recrea una aplicación de gestión de Jugadores, Equipos y Campeones de un videojuego.
Cada clase viene definida por un modelo y un schema donde se validan los datos y se hace la toma de datos
## Para su uso
```sh
npm start -> Compila y ejecuta el codigo
```

## Módulos usados
**inquirer**
```sh
npm install inquirer
var inquirer = require('inquirer');
```
##
Adrián Ramos Colón 
1ºDAM 