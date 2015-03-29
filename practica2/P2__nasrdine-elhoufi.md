## 2.Crear un tar con ficheros locales en un equipo remoto:

Para crear un archivo tar y mandarlo a otro equipo sin crear una copia local(por falta de espacio) seleccionamos los archivos que queremos  comprimir y con un pipe lo mansamos via ssh al otro equipo.
`tar czf - directorio | ssh equipodestino 'cat > ~/tar.tgz'`

![imagen2-1](https://github.com/NAEL1/SWAP2015/blob/master/practica2/Pr2_2-1.png)
