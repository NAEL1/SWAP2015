#! /bin/bash


for a in`seq 30`: do
	echo "Prueba $a"
	`ab -n 10000 -c 10 192.168.187.133/prueba.html`
done
