import socket
import json
from kafka import KafkaProducer
import os

from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")


socket_connection=socket.socket()

# HOST = socket.gethostbyname(socket.gethostname())
# HOST = "root-server-1"
# HOST= "scmxpert-server-1"
# PORT = 5050
HOST= os.getenv("host_name")
PORT = int(os.getenv("port"))


socket_connection.connect((HOST,PORT))

# bootstrap_servers = 'localhost:9092'
# bootstrap_servers = 'root-kafka-1:9092'
bootstrap_servers = os.getenv("bootstrap_servers")
topicName = os.getenv("topic_name")
producer = KafkaProducer(bootstrap_servers= bootstrap_servers,
                         retries = 5,
                         value_serializer=lambda x: json.dumps(x).encode('utf-8'))

while True:
    
    try:
        data=socket_connection.recv(70240).decode() #to decode data from server.py if the connection between the file and producer is successful
        json_acceptable_string = data.replace("'","\"")
        load_data = json.loads(json_acceptable_string)
        print(load_data)
        for data in load_data:
            producer.send(topicName,data)
        
    except Exception as exception:
        print(exception)
    
socket_connection.close()