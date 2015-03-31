# Práctica 3

## 1. Estructura de  maquinas

numero de la maquina|Nombre de la maquina | Digrección IP
-----------|------------ | -------------
Maquina1 | Ubuntuserver | 192.168.187.133
Maquina2 | Ubuntuserver2 | 192.168.187.135
Maquina3 | Balanceador	|	192.168.187.136



## 2. El servidor web nginx

### 2.1. Instalar nginx en Ubuntu Server 12.04

Primero instalo una maquina virtual  con ubuntu server con openssh y sin apache, Después instalo nginx  como sigue :

Importo la  clave del repositorio 

![imagen Pr3-1](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-1.png)

Agrego  el repositorio al archivo sourcelist de apt

![imagen Pr3-2](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-2.png)

Instalo nginx

![imagen Pr3-3](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-3.png)

### 2.2. Balanceo de carga usando nginx:

Creo el archivo /etc/nginx/conf.d/default.conf 

![imagen Pr3-4](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-4.png)

Lo edito de la siguiente forma 

![imagen Pr3-5](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-5.png)

Para probar si todo ha ido bien primero modifico los archivos index.html de los dos servidores Back-end  poniendo su nombre y IP en el archivo, luego reinicio ngix y hago solicitudes http al balanceador, se ve en la imagen que el balanceador reenvía la primera solicitud primero a la maquina 2 y la segunda a la maquina 1

![imagen Pr3-6](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-6.png)


ahora edito el archivo de configuración para darle mas  peso a la maquina 2 de forma que cada 3 peticiones una vaya a parar a la maquina 1  y dos a la maquina 2

![imagen Pr3-7](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-7.png)

Como se puede apreciar los resultados se ajustan a lo comentado anteriormente 

![imagen Pr3-8](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-8.png)

Para hacer que todo el trafico proveniente del mismo IP vaya siempre al mismo back-end edito el archivo de configuración poniendo la directiva `ip_hash`

![imagen Pr3-9](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-9.png)

Para hacer la conexión persistente edito el archivo de configuración poniendo la directiva `keepalive`

![imagen Pr3-10](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-10.png)

### 2.3. Opciones de configuración del nginx para establecer cómo
le pasará trabajo a las máquinas servidoras finales

Un ejemplo de configuración seria el que sigue

![imagen Pr3-11](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-11.png)

Tenemos 3 servidores el primero con un peso 3, El segundo con un peso 2 ademas si devuelve 2 fallos de petición en un intervalo de 15 segundos se marcara como no disponible, El tercer servidor es el mismo balanceador escuchando por el puerto 8080 ya que el 80 lo usa nginx  y esta marcado como backup  por lo que no se le mandara peticiones hasta que los otros 2 no estén disponibles.
En location ponemos `health_check` de manera que vaya preguntando el estado a los servidores cada 
 60 segundos y en caso que falle 3 veces la repuesta de algún servidor lo marque como no disponible.


## 3. Balanceo de carga con haproxy

### 3.1. Instalar haproxy

Primero paramos nginx y luego instalamos haproxy

![imagen Pr3-12](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-12.png)

### 3.2. Configuración básica de haproxy como balanceador de carga

Ahora hay que configurar el archivo /etc/haproxy/haproxy.cfg

lo primero guardo una copia de seguridad del la configuracion por defecto `sudo mv  /etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg.backup` y creo el nuevo archivo /etc/haproxy/haproxy.cfg como sigue :

![imagen Pr3-13](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-13.png)

### 3.3. Comprobar el funcionamiento del balanceador

Una vez guardada la configuración ejecuto el comando `sudo /usr/sbin/haproxy -f /etc/haproxy/haproxy.cfg` y como no da salido ningun mensaje de error hago solicitudes http al balanceador, como se puede observar hace balanceo round-robin

![imagen Pr3-14](https://github.com/NAEL1/SWAP2015/blob/master/practica3/Pr3-14.png)
