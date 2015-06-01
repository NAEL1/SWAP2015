# Práctica 6

## 1. Estructura de  maquinas

numero de la maquina|Nombre de la maquina | Dirección IP
-----------|------------ | -------------
Maquina1 | Ubuntuserver | 192.168.187.133

Con la maquina vvirtual apagada le agregamos 2 discos duros que nos serviran para para crear una configuracion de RAID1:

![captura1](https://github.com/NAEL1/SWAP2015/blob/master/practica6/captura1.png)

## 2. Configuración del RAID por software

Una vez creados los discos virtuales arracamos la maquina y instalamos el software necesario para configurar el raid:

```bash
	sudo apt-get install mdadm
```

Seguidamente buscamos la informacion de ambos discos con el comando:
```bash
	sudo fdisk -l 
```

![captura2]()

Como se aprecia en la captura de pantalla los path de discos que hemos creado recientemente son:
/dev/sdb
/dev/sdc

Procedemos a crear el RAID1 (/dev/md0) con los 2 discos anteriores, para ello ejecutamos el comand:

```bash
	sudo mdadm -C /dev/md0 --level=raid1 --raid-devices=2 /dev/sdb /dev/sdc
```

![captura3]()

Damos formato al nuevo dispositivo RAID con:

```bash
	sudo mkfs /dev/md0
```

Ahora cramos el directorio  que se montara en el RAID y lo montamos:

``` bash
	sudo mkdir /datos
	sudo mount /dev/md0 /datos	
``` 
![captura4]()

Finalmente para comprobar el estado de RAID ejecutamos:

``` bash
	sudo mdadm --detail /dev/md0	
```
![captura5]()


