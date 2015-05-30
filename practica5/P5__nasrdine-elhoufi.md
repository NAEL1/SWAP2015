# Práctica 5

## 1. Estructura de  maquinas

numero de la maquina|Nombre de la maquina | Dirección IP
-----------|------------ | -------------
Maquina1 | Ubuntuserver | 192.168.187.133
Maquina2 | Ubuntuserver2 | 192.168.187.135


## 2. Crear una BD e insertar datos

creo un archivo [querys.sql](https://github.com/NAEL1/SWAP2015/blob/master/practica5/querys.sql) donde gradare las consultas que hare sobre la base de datos con el siguinte contenido:

 	```SQL
	 	
		create database contactos;
		use contactos;
		create table datos(nombre varchar(100),tlf int);
		insert into datos(nombre,tlf) values ("pepe",95834987);
		insert into datos(nombre,tlf) values ("josee",9588585);

	```

luego hago la consulta en la maquina 1 `mysql -uroot -pXXXXXXXX <querys.sql ` donde las X's son la contraseña :eyes:
asi se ejecutara todo el script a la vez.

## 3. Replicar una BD MySQL con mysqldump

creamos un [script](https://github.com/NAEL1/SWAP2015/blob/master/practica5/sqlDump.sh) para automatizar la tarea  que nos crea una base de datos pasandole como argumentos el nombre de la base de datos, nombre de usuario y contraseña, que se conectara a la maquina 1 , hara una copia de seguridad y la traslada a la maquina2 y finalmente la restaura en la maquina2:


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
	ssh root@192.168.187.133 'mysqldump contactos -u root -p > /root/contactos.sql'
	# desbloqueamos las tablas
	ssh root@192.168.187.133 'mysql -uroot -pXXXXXXX -e "UNLOCK TABLES;"'
	#copiamos la bd en la maquina2
	scp root@192.168.187.133:/root/contactos.sql /root/
	#abrimos bd local y restauramos los datos contenidos en contactos.sql
	mysql -uroot -p601988 contactos < /root/contactos.sql
	```


finalmente tendremos una copia exacta en la  maquina2


![cap1](https://github.com/NAEL1/SWAP2015/blob/master/practica5/cap1.png)