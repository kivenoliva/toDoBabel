# toDoBabel
Aplicación que gestiona los proyectos y tareas en una empresa. Implementada con Angular.js en la parte de FRONT, y con Node.js y express en la parte de BACK.



## Setup de entorno de desarrollo

Debes tener instalado [nodejs](http://nodejs.org/en/) y con *npm* instalar *express* utilizando:

```
$ sudo npm install -g express
```

A continuación clona el repositorio e instala las dependencias correspondientes descritas en el package.json con:

```
$ sudo npm install 
```

```
$ sudo bower install 
```

Antes de utilizar tu servidor, lanza un script que reinicia la base de datos y precarga ejemplos:

```
$ npm run installDB
```

Lanza grunt para que tu código se concatene correctamente, para ello instala grunt y less:


```
$ sudo npm install -g grunt-cli less
```

Y después lanza grunt en tu terminal utilizando "grunt".


Ahora puedes empezar a utilizar tu servidor lanzando:
```
$ nodemon
```





