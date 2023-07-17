# import sys
# from kafka import KafkaConsumer
# import json
# from model import Device_Data
# from database import mongodb

# topicName = 'Device_Data_Stream'

# try:
#     consumer = KafkaConsumer(topicName,
#                         bootstrap_servers= 'localhost:9092',
#                         auto_offset_reset = 'latest'
#                          )

#     for data in consumer:
#         data = json.loads(data.value)
#         Transport_Data = Device_Data(
#             Battery_Level= data["Battery_Level"],
#             Device_ID= data["Device_Id"],
#             First_Sensor_Temperature= data["First_Sensor_temperature"],
#             Route_From= data["Route_From"],
#             Route_To= data["Route_To"]
#         )
#         mongodb.insert_one(dict(Transport_Data))
        

# except KeyboardInterrupt:
#     sys.exit()

# import json
# import sys
# from model import Device_Data
# from kafka import KafkaConsumer
# from database import collection
# from pydantic import BaseModel


# bootstrap_servers = "localhost:9092"
# # bootstrap_servers = "root-kafka-1:9092"

# topicName = 'Device_Data_Stream'

# class Device_Data(BaseModel):
#     Battery_Level: int
#     Device_ID: int
#     First_Sensor_Temperature: int
#     Route_From: str
#     Route_To: str

# try:
#     consumer = KafkaConsumer(topicName, 
#                              bootstrap_servers = bootstrap_servers,
#                              auto_offset_reset = 'latest')
    
#     for data in consumer:
#         demo = data
#         print(demo)

#         data = json.loads(data.value)

#         Transport_Data = Device_Data(
#             Battery_Level= data["Battery_Level"],
#             Device_ID= data["Device_Id"],
#             First_Sensor_Temperature= data["First_Sensor_temperature"],
#             Route_From= data["Route_From"],
#             Route_To= data["Route_To"]
#         )
#         print(Transport_Data)
#         collection.insert_one(dict(Transport_Data))

# except KeyboardInterrupt:
#     sys.exit()


import json
import sys

from kafka import KafkaConsumer
from pydantic import BaseModel

from pymongo import MongoClient

client = MongoClient('mongodb+srv://demoUser:demoUser@cluster0.7ykbs1f.mongodb.net/?retryWrites=true&w=majority')

mongodb =  client.get_database('SCMXpert')

collection = mongodb["stream"]

bootstrap_servers = "localhost:9092"
# bootstrap_servers = "root-kafka-1:9092"
topicName = 'Device_Data_Stream'

class Device_Data(BaseModel):
    Battery_Level: int
    Device_ID: int
    First_Sensor_Temperature: int
    Route_From: str
    Route_To: str

try:
    consumer = KafkaConsumer(topicName, 
                             bootstrap_servers = bootstrap_servers,
                             auto_offset_reset = 'latest')
    
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
