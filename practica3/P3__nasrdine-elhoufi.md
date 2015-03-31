# Práctica 3

## 1. Estructura de  maquinas:

numero de la maquina|Nombre de la maquina | Dirección IP
-----------|------------ | -------------
Maquina1 | Ubuntuserver | 192.168.187.133
Maquina2 | Ubuntuserver2 | 192.168.187.135
Maquina3 | Balanceador	|	192.168.187.136

## 2.1. Instalar nginx en Ubuntu Server 12.04

Primero instalo una maquina virtual  con ubuntu server con openssh y sin apache, Después instalo nginx  como sigue :

Importo la  clave del repositorio 

![imagen Pr3-1](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-1.png)

Agrego  el repositorio al archivo sourcelist de apt

![imagen Pr3-2](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-2.png)

Instalo nginx

![imagen Pr3-3](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-3.png)

## 2.2. Balanceo de carga usando nginx:

Creo el archivo /etc/nginx/conf.d/default.conf 

![imagen Pr3-4](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-4.png)

Lo edito de la siguiente forma 

![imagen Pr3-5](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-5.png)

Para probar si todo ha ido bien primero modifico los archivos index.html de los dos servidores Back-end  poniendo su nombre y IP en el archivo, luego reinicio ngix y hago solicitudes http al balanceador, se ve en la imagen que el balanceador reenvía la primera solicitud primero a la maquina 2 y la segunda a la maquina 1

![imagen Pr3-6](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-6.png)


