## 1.Estructura de  maquinas:
Nombre de la maquina | Direccion IP
------------ | -------------
Ubuntuserver | 192.168.187.133
Ubuntuserver2 | 192.168.187.135


## 2.Crear un tar con ficheros locales en un equipo remoto:

Para crear un archivo tar y mandarlo a otro equipo sin crear una copia local(por falta de espacio) seleccionamos los archivos que queremos  comprimir y con un pipe lo mansamos via ssh al otro equipo.
`tar czf - directorio | ssh equipodestino 'cat > ~/tar.tgz'`

  en mi caso seria :

![imagen2-1](https://github.com/NAEL1/SWAP2015/blob/master/practica2/Pr2_2-1.png)

## 3. Instalar la herramienta rsync:

En mi caso rsync ya venia instalado en la ditribucion pero si tuviera que instalarlo solo tendria que ejecutar el comando:
`sudo apt-get install rsync`

 Para clonar la carpeta /var/www/ de la maquina1 en la maquina2 ejecuto el comando: `rsync -avz -e ssh root@192.168.187.133:/var/www/ /var/www/` en la maquina2.

 Para probar si ha funcionado ejecuto `ls` sobre `/var/www` de la segunda maquina antes y despues de haber ejecutado el comando anterior:

![imagen3-1](https://github.com/NAEL1/SWAP2015/blob/master/practica2/Pr2_3.1.png)

imagen
