# Práctica 5

## 1. Estructura de  maquinas

numero de la maquina|Nombre de la maquina | Dirección IP
-----------|------------ | -------------
Maquina1 | Ubuntuserver | 192.168.187.133
Maquina2 | Ubuntuserver2 | 192.168.187.135
Maquina3 | Balanceador	|	192.168.187.136

## 2. Crear una BD e insertar datos

creo un archivo [querys.sql]() donde gradare las consultas que hare sobre la base de datos con el siguinte contenido:

 	```SQL
	create database contactos;
	use contactos;
	create table datos(nombre varchar(100),tlf int);
	insert into datos(nombre,tlf) values ("pepe",95834987);
	insert into datos(nombre,tlf) values ("josee",9588585);
	```

luego hago la consulta en la maquina 1 `mysql -uroot -pXXXXXXXX <querys.sql `
asi se ejecutara todo el script a la vez.
