
#Ejercicio T2.1:

*Calcular la disponibilidad del sistema si tenemos dos
réplicas de cada elemento (en total 3 elementos en cada
subsistema)*

Componentes   Disponibilidad
Web           85%
Application   90%
Datebase      99.9%
DNS           98%
Firewall      85%
Switch        99%
DataCenter (*)99,99%
ISP           95%


Calculamos la disponibilidad para cada uno de los elementos replicados 2 veces mas:
 (*) no tiene sentido  replicar el Datacenter a no ser que seas Google o Twitter :computer:

  -**Para servidor web**:

    replicando una segundo servidor
    Disponibilidad_web2=85%+(1-0,85)*85%=97,75%

    replicando un tercer servidor
    Disponibilidad_web3=95,75%+(1-0,9775)*85%=99,6625%

  -**Para servidor de aplicaciones**:

    replicando una segundo servidor
    Disponibilidad_Aplication2=90%+(1-0,9)*90%=99%

    replicando un tercer servidor
    Disponibilidad_Aplication3=99%+(1-0,99)*90%=99,9%

  -**Para servidor de base de datos**:

    replicando una segundo servidor
    Disponibilidad_database2=99,9%+(1-0,999)*99,9%=99,9999%

    replicando un tercer servidor
    Disponibilidad_database3=99,9999%+(1-0,999999)*99,9=99,9999999% (seven 9s)

  -**Para servidor de DNS**:

     replicando una segundo servidor
      Disponibilidad_DNS2=98%+(1-0,98)*98%=99,96%

     replicando un tercer servidor
      Disponibilidad_DNS=99,96%+(1-0,9996)*98%=99,9992%


  -**Para Firewall**:

      replicando un segundo firewall:
       Disponibilidad_Firewall2=85%+(1-0,85)*85%=97,75%

      replicando un tercer firewall:
       Disponibilidad_Firewall3=97,75%+(1-0,9775)*85%=99,6625%


  -**Para Switch**:

      replicando un segundo Switch:
       Disponibilidad_Switch2=99%+(1-.99)*99%=99,99%

      replicando un tercer Switch:
       Disponibilidad_Switch3=99,99%+(1-.9999)*99%=99,9999

  -**Para ISP**:

       replicando un segundo Switch:
        Disponibilidad_Switch2=95%+(1-.95)*95%=99,75%

       replicando un tercer Switch:
        Disponibilidad_Switch3=99,75%+(1-.9975)*95%=99,9875%




#Ejercicio T2.2:
*Buscar frameworks y librerías para diferentes lenguajes que
permitan hacer aplicaciones altamente disponibles con
relativa facilidad.
Como ejemplo, examina PM2
https://github.com/Unitech/pm2
que sirve para administrar clústeres de NodeJS.*

  -**JGroups** es un toolkit (multi-plataforma) escrito en Java que permite el intercambio de mensajes
   confiable(no se pierde ningún mensaje), se puede  usar para crear clusters donde sus nodos
   pueden mandar mensajes entre ellos, sus características principales son:

          - la creación y eliminación de clusters, los nodos de los cluster pueden anclarse a través de LAN y WAN

          - Altas y bajas de los clusterse

          - Detección de Membresía y notificación sobre nodos que  se han unido , dejado o que se han caído del cluster

          - Detección y eliminación de nodos caidos.

          - Envío y recepción de mensajes de nodo a clúster (punto a multipunto).

          - Envío y recepción de mensajes de nodo a nodo (punto a punto.



#Ejercicio T2.3:
*¿Cómo analizar el nivel de carga de cada uno de los
subsistemas en el servidor?
Buscar herramientas y aprender a usarlas.
...¡o recordar cómo usarlas!*

  * “**Nagios** es un sistema de monitorización de redes ampliamente utilizado, de código abierto, que vigila los equipos (hardware) y servicios (software) que se especifiquen, alertando cuando el comportamiento de los mismos no sea el deseado. Entre sus características principales figuran la monitorización de servicios de red (SMTP, POP3, HTTP, SNMP...), la monitorización de los recursos de sistemas hardware (carga del procesador, uso de los discos, memoria, estado de los puertos...), independencia de sistemas operativos, posibilidad de monitorización remota mediante túneles SSL cifrados o SSH, y la posibilidad de programar plugins específicos para nuevos sistemas.” * fuente:https://es.wikipedia.org/wiki/Nagios

  **Ganglia** es una herramienta de monitorización  de sistema escalable y distribuida para sistemas de computacionales de altas prestaciones  tales como clusters o grids . Permite al usuario ver  de forma remota  las estadísticas  de todas las maquinas monitorizadas ya sea en directo o consultando el historial. fuente:ISE-P3-MonitProfiing.pdf

  Además de otras mencionadas en el guión de practica P3 de ISE.

#Ejercicio T2.4:
*Buscar ejemplos de balanceadores software y hardware
(productos comerciales).
Buscar productos comerciales para servidores de
aplicaciones.
Buscar productos comerciales para servidores de
almacenamiento.*

pendiente
