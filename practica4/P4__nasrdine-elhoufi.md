# Práctica 4

## 1. Estructura de  maquinas

numero de la maquina|Nombre de la maquina | Dirección IP
-----------|------------ | -------------
Maquina1 | Ubuntuserver | 192.168.187.133
Maquina2 | Ubuntuserver2 | 192.168.187.135
Maquina3 | Balanceador	|	192.168.187.136

Preparativos:


Por comodidad creamos una carpeta compartida entre el host y el guest, Para ello instalamos VMware tools en el guest siguiendo este [tutorial](http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1022525), Una vez instalado VMware tools encendemos el guest y vamos a virtual machine setting>options>shared folders. en shared folding activamos el radio button Always enebled, luego add y selecionamos la carpeta del host(la llamaremos shared). si vamos al guest en contramos la carpeta compartida en el path:`/mnt/hgfs/shared`.

generamos la clave sda en el host para poder acceder al host sin contraseña.

## 2. Comprobar el rendimiento de servidores web con Apache Benchmark

Para empezar creamos un script php para que las solicitudes sean mas costosas:
 ![P4-1.png](https://github.com/NAEL1/SWAP2015/blob/master/practica4/p4-1.png).

 Tambien para autolatizar un poco las preubas creamos un script bash para hacer una bateria de 30 pruebas y que los guarde en 3 archivos pruebaAbM1.txt pruebaAbBalanceadorNginx.txt  pruebaAbBalanceadorHaproxy.txt

 ![P4-2.png](https://github.com/NAEL1/SWAP2015/blob/master/practica4/p4-2.png)

 Despues de obtener los archivos podemos automatizar la seleccion de los datos que nos interesan.







