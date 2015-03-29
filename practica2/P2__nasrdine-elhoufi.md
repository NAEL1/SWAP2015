## 1.Estructura de  maquinas:
numero de la maquina|Nombre de la maquina | Dirección IP
-----------|------------ | -------------
Maquina1 | Ubuntuserver | 192.168.187.133
Maquina2 | Ubuntuserver2 | 192.168.187.135


## 2.Crear un tar con ficheros locales en un equipo remoto:

Para crear un archivo tar y mandarlo a otro equipo sin crear una copia local(por falta de espacio) seleccionamos los archivos que queremos  comprimir y con un pipe lo mandamos via ssh al otro equipo.
`tar czf - directorio | ssh equipodestino 'cat > ~/tar.tgz'`

  en mi caso seria :

![imagen2-1](https://github.com/NAEL1/SWAP2015/blob/master/practica2/Pr2_2-1.png)

## 3. Instalar la herramienta rsync:

En mi caso rsync ya venia instalado en la distribución pero si tuviera que instalarlo solo tendria que ejecutar el comando:
`sudo apt-get install rsync`

 Para clonar la carpeta /var/www/ de la maquina 1 en la maquina 2 ejecuto el comando:
 ```
rsync -avz -e ssh root@192.168.187.133:/var/www/ /var/www/`
```


 Para probar si ha funcionado ejecuto `ls` sobre `/var/www` de la segunda maquina antes y después de haber ejecutado el comando anterior:
 ![Imagen3-1](https://github.com/NAEL1/SWAP2015/blob/master/practica2/Pr2_3.1.png)

## 4. Acceso sin contraseña para ssh:

Lo primero es generar la clave del tipo dsa en la maquina  2 con `ssh-keygen`, Después comprobamos si la clave generada tiene los permisos de forma correcta, en mi caso no hace falta cambiarlos, Una forma segura de copiar la clave en la maquina 1 es usando el comando:

```
shh-copy-id -i .ssh/_dsa.pub root@192.168.187.133
```

 A continuacion se muestra el proceso seguido:

 ![imagen4-1](https://github.com/NAEL1/SWAP2015/blob/master/practica2/Pr2_4.1.png)

 Para comprobar si todo ha ido bien solicito entrar a la maquina 1 via ssh sin proporcionar clave:

 ![imagen4-2](https://github.com/NAEL1/SWAP2015/blob/master/practica2/Pr2_4.2.png)

 Como se puede apreciar en la foto he tenido acceso a la maquina1 desde la maquina2 y no se me ha solicitado ninguna clave.

## 5. Programar tareas con crontab:
 Para realiza una copia de seguridada de la carpeta /var/www/ de la maquina 1 en la maquina 2
hay que editar el archivo /etc/contab añadiendo la linea :

```
*/1 * * * * root rsync -avz -e ssh root@192.168.187.133:/var/www/ /var/www/

```


 ![img5-2](https://github.com/NAEL1/SWAP2015/blob/master/practica2/Pr2_5-2.png)


Otra alternativa es crear un script(backup.sh) como sigue:

```
#! /bin/bash

rsync -avz -e ssh root@192.168.187.133:/var/www/ /var/www/

```

Darle permisos de ejecucion `chmod +x backup.sh`

Editar el crontab como sigue:

```
00-59 * * * * root cd / && ./backup.sh
```
