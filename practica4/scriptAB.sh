#! /bin/bash

#echo "Práctica 4 SWAP" > pruebaAbM1.txt
#echo "Práctica 4 SWAP" > pruebaAbBalanceadorNginx.txt
#echo "Práctica 4 SWAP" > pruebaAbBalanceadorHaproxy.txt


for a in  $( seq 30 ); do
	echo "########################    Prueba $a en la maquina1    ######################## " >> pruebaAbM1.txt
	`ab -n 10000 -c 10 192.168.187.133/prueba.html >> pruebaAbM1.txt`
done

# nos conectamos al guest desactivamos haproxy y activamos nginx
ssh root@192.168.187.136 'sudo service nginx start'

for a in  $( seq 30 ); do
	echo "########################    Prueba $a en el balanceador con nginx  ######################## " >> pruebaAbBalanceadorNginx.txt
	`ab -n 10000 -c 10 192.168.187.136/prueba.html >> pruebaAbBalanceadorNginx.txt`
done

#desactivamos nginx y activamos haproxy
ssh root@192.168.187.136 'sudo service nginx stop'
ssh root@192.168.187.136 'sudo /usr/sbin/haproxy -f /etc/haproxy/haproxy.cfg'

for a in  $( seq 30 ); do

	echo "########################    Prueba $a en el balanceador con haproxy    ######################## " >> pruebaAbBalanceadorHaproxy.txt
	`ab -n 10000 -c 10 192.168.187.136/prueba.html >> pruebaAbBalanceadorHaproxy.txt`
done
#salimos del guest
`exit`


