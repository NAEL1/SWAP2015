# Práctica 5

## 1. Estructura de  maquinas

numero de la maquina|Nombre de la maquina | Dirección IP
-----------|------------ | -------------
Maquina1 | Ubuntuserver | 192.168.187.133
Maquina2 | Ubuntuserver2 | 192.168.187.135


## 2. Crear una BD e insertar datos

creo un archivo [querys.sql](https://github.com/NAEL1/SWAP2015/blob/master/practica5/querys.sql) donde gradare las consultas que hare sobre la base de datos con el siguinte contenido:

```sql

		create database contactos;
		use contactos;
		create table datos(nombre varchar(100),tlf int);
		insert into datos(nombre,tlf) values ("pepe",95834987);
		insert into datos(nombre,tlf) values ("josee",9588585);
```

luego hago la consulta en la maquina 1 `mysql -uroot -pXXXXXXXX <querys.sql ` donde las X's son la contraseña :eyes:
asi se ejecutara todo el script a la vez.

## 3. Replicar una BD MySQL con mysqldump

creamos un [script](https://github.com/NAEL1/SWAP2015/blob/master/practica5/sqlDump.sh) para automatizar la tarea  que nos crea una base de datos pasandole como argumentos el nombre de la base de datos, nombre de usuario y contraseña, que se conectara a la maquina 1 , haga una copia de seguridad local  y la traslada a la maquina2 y finalmente la restaura en la maquina2:


``` bash
	#!/bin/bash
	# sustituir XXXXXXX por el password de mysql

	EXPECTED_ARGS=3
	E_BADARGS=65
	MYSQL=`which mysql`
	 
	Q1="CREATE DATABASE IF NOT EXISTS $1;"
	Q2="GRANT ALL ON *.* TO '$2'@'localhost' IDENTIFIED BY '$3';"
	Q3="FLUSH PRIVILEGES;"
	SQL="${Q1}${Q2}${Q3}"
	 
	if [ $# -ne $EXPECTED_ARGS ]
	then
	  echo "Usage: $0 dbname dbuser dbpass"
	  exit $E_BADARGS
	fi
	# creamos la base de datos en la maquina actual
	$MYSQL -uroot -p -e "$SQL"
	#conectamos con la maquina 1 y bloqueamos  las tablas
	ssh root@192.168.187.133 'mysql -uroot -pXXXXXXX -e "FLUSH TABLES WITH READ LOCK;" '
	# hacemos la copia de seguridad 
	ssh root@192.168.187.133 'mysqldump contactos -u root -pXXXXXXXX > /root/contactos.sql'
	# desbloqueamos las tablas
	ssh root@192.168.187.133 'mysql -uroot -pXXXXXXX -e "UNLOCK TABLES;"'
	#copiamos la bd en la maquina2
	scp root@192.168.187.133:/root/contactos.sql /root/
	#abrimos bd local y restauramos los datos contenidos en contactos.sql
	mysql -uroot -pXXXXXXXX contactos < /root/contactos.sql

```


finalmente tendremos una copia exacta en la  maquina2

![imagen](https://github.com/NAEL1/SWAP2015/blob/master/practica5/captura1.png)



## 4. Replicación de BD mediante una configuración maestro-esclavo


Configuramos el archivo de configuracion del maestro (/etc/mysql/my.cnf) de la sieguiente manera:

	1. comentamos la linea:
		bind-address 127.0.0.1
	2. indicamos el archivo donde se almacenara el log de errores
		log_error = /var/log/mysql/error.log
	3. establecemos el id del servidor
		server-id = 1
	4. indicamos el archivo donde se almacenara  el registro de actualizaciones
		log_bin = /var/log/mysql/bin.log

Guardamos el archivo y reiniciamos el servicio.

Para elel archivo de configuracion del esclavo haremos lo mismo con la exepcion de que el server-id = 2 

ahora vamos al maestro y creamos en el un usuario 'esclavo' ,le damos priviligios  y bloqueamos las tablas, en mi caso todo dentro de un [script](https://github.com/NAEL1/SWAP2015/blob/master/practica5/esclavo.sql) llamado 'esclavo.sql':

``` sql
	GRANT REPLICATION SLAVE ON *.* TO 'esclavo'@'%' IDENTIFIED BY 'esclavo';
	FLUSH PRIVILEGES;
	FLUSH TABLES;
	FLUSH TABLES WITH READ LOCK;
```

y lo ejecuto en el maestro con el comando ` mysql -uroot -p < escalvo.sql`. para ver que todo ha ido bien entro en mysql y ejecuto `show master status`
![captura2](https://github.com/NAEL1/SWAP2015/blob/master/practica5/captura2.png)

ahora configuro el escalvo para ello creo otro [script](https://github.com/NAEL1/SWAP2015/blob/master/practica5/esclavo.sql) llamado maestro.sql y ejecuto en el esclavo:
`mysql -uroot -p <maestro.sql`
 despues vuelvo al maestro  y activo el maestro con `UNLOCK TABLES;`
 
 en la siguiente imagen se muestra que todo ha ido bien:

 ![captura3](https://github.com/NAEL1/SWAP2015/blob/master/practica5/captura3.png)
ahora añado una fila en la tabla datos del maestro:
 `insert into datos(nombre,tlf) values ("nas",95888888);`

y compruebo si se ha actualizado el escalvo:

 ![captura4](https://github.com/NAEL1/SWAP2015/blob/master/practica5/captura4.png)
 tal como se ve en la captura de patalla, la tabla datos se ha actualizado.