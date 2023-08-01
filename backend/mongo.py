from pymongo import MongoClient
import urllib.parse
import os

from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

#Fetching data from .env
url = os.getenv("databaseUrl")
dbname = os.getenv("dbName")
usersCollection = os.getenv("users_Collection")
dataStreamCollection = os.getenv("datastream_Collection")
shipmentCollection = os.getenv("shipment_Collection")

client=MongoClient(url)

# db varialbe
mongodb =  client.get_database(dbname)

# collection varialbe
users_Collection = mongodb[usersCollection]
datastream_Collection = mongodb[dataStreamCollection]
shipments_Collection = mongodb[shipmentCollection]