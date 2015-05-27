#! /bin/bash

## script rendimiento con siege:

`echo "practica4" > /var/log/siege.log`

`echo "prueba maquina1" >>  /var/log/siege.log`
`echo " Date & Time;  Trans;  Elap Time; Data Trans;  Resp Time;  Trans Rate;  Throughput; Concurrent;    OKAY;   Failed ">> /var/log/siege.log`

`siege -c25 -b -t60S  192.168.187.133/prueba.html`


# nos conectamos al guest desactivamos haproxy y activamos nginx
ssh root@192.168.187.136 'sudo service nginx start'
`exit`
`echo "prueba nginx" >> /var/log/siege.log`
`echo " Date & Time;  Trans;  Elap Time; Data Trans;  Resp Time;  Trans Rate;  Throughput; Concurrent;    OKAY;   Failed ">> /var/log/siege.log`
`siege -c25  -b -t60S  192.168.187.136/prueba.html `

#desactivamos nginx y activamos haproxy
ssh root@192.168.187.136 'sudo service nginx stop'
ssh root@192.168.187.136 'sudo /usr/sbin/haproxy -f /etc/haproxy/haproxy.cfg'
`exit`
`echo "prueba haproxy">>  /var/log/siege.log`
`echo " Date & Time;  Trans;  Elap Time; Data Trans;  Resp Time;  Trans Rate;  Throughput; Concurrent;    OKAY;   Failed ">> /var/log/siege.log`

`siege -c25 -b -t60S  192.168.187.136/prueba.html`
`touch siege.csv`
`cp -T /var/log/siege.log  ~/Git/SWAP2015/practica4/siege.csv`
# cambiamos coma por punto y coma
`sed s/\,/\;/g <~/Git/SWAP2015/practica4/siege.csv  >~/Git/SWAP2015/practica4/siegeES.csv`

`sed s/\. /\,/g <~/Git/SWAP2015/practica4/siegeES.csv  >~/Git/SWAP2015/practica4/siegeF.csv`
`rm siege.csv siegeES.csv`

