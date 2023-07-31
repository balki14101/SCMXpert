from pymongo import MongoClient
import urllib.parse
import os


from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

url = os.getenv("databaseUrl")

client=MongoClient(url)

# client = MongoClient('mongodb+srv://demoUser:demoUser@cluster0.7ykbs1f.mongodb.net/?retryWrites=true&w=majority')

mongodb =  client.get_database('SCMXpert')


users_Collection = mongodb['users']
datastream_Collection = mongodb['stream']
shipments_Collection = mongodb['shipment_created']