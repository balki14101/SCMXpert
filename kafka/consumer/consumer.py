import json
import sys

from kafka import KafkaConsumer
from pydantic import BaseModel

from database import collection

# bootstrap_servers = "localhost:9092"
# bootstrap_servers = "root-kafka-1:9092"
bootstrap_servers = 'scmxpert-kafka-1:9092'
topicName = 'Device_Data_Stream'

class Device_Data(BaseModel):
    Battery_Level: int
    Device_ID: int
    First_Sensor_Temperature: int
    Route_From: str
    Route_To: str

try:
    consumer = KafkaConsumer(topicName,bootstrap_servers = bootstrap_servers,auto_offset_reset = 'latest')
    
    for data in consumer:
        print(data)
        data = json.loads(data.value)

        Transport_Data = Device_Data(
            Battery_Level= data["Battery_Level"],
            Device_ID= data["Device_ID"],
            First_Sensor_Temperature= data["First_Sensor_Temperature"],
            Route_From= data["Route_From"],
            Route_To= data["Route_To"]
        )

        collection.insert_one(dict(Transport_Data))
        print(Transport_Data)

except KeyboardInterrupt:
    sys.exit()
