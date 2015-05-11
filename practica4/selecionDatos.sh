#! /bin/bash

echo "Práctica4" > datos.txt
echo "#######################################   Maquina1   #######################################" >> datos.txt
echo "Peticiones fallidas: " >> datos.txt
grep -w '^Failed' pruebaAbM1.txt | cut -d ':' -f2 | tr -d '[:blank:]' >> datos.txt

echo "Peticiones por segundo: " >>datos.txt
grep -w '^Requests' pruebaAbM1.txt | cut -d ' ' -f7  >> datos.txt

echo "Timepo por peticion(total): " >>datos.txt
grep -w '^Time' pruebaAbM1.txt | cut -d ' ' -f7  >> datos.txt

echo "#######################################   BalanceadorNginx   #######################################"  >> datos.txt
echo "Peticiones fallidas: " >> datos.txt
grep -w '^Failed' pruebaAbBalanceadorNginx.txt | cut -d ':' -f2 | tr -d '[:blank:]' >> datos.txt

echo "Peticiones por segundo: " >> datos.txt
grep -w '^Requests' pruebaAbBalanceadorNginx.txt | cut -d ' ' -f7  >> datos.txt

echo "Timepo por peticion(total): " >> datos.txt
grep -w '^Time' pruebaAbBalanceadorNginx.txt | cut -d ' ' -f7  >> datos.txt

echo "#######################################   BalanceadorHaproxy   #######################################"  >> datos.txt
echo "Peticiones fallidas: " >> datos.txt
grep -w '^Failed' pruebaAbBalanceadorHaproxy.txt | cut -d ':' -f2 | tr -d '[:blank:]' >> datos.txt

echo "Peticiones por segundo: " >> datos.txt
grep -w '^Requests' pruebaAbBalanceadorHaproxy.txt | cut -d ' ' -f7 >> datos.txt

echo "Timepo por peticion(total): " >> datos.txt
grep -w '^Time' pruebaAbBalanceadorHaproxy.txt | cut -d ' ' -f7 >> datos.txt