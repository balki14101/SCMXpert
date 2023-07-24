from typing import Union,Optional
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

class User(BaseModel):
    name:str
    email: str
    password: str
    reenterpassword:str

class Login(BaseModel):
    email: str
    password: str

class Device_Data(BaseModel):
    Battery_Level= str,
    Device_ID= str,
    First_Sensor_Temperature= str,
    Route_From= str,
    Route_To= str

class ship(BaseModel):
    Shipment_Number: int
    Container_Number: int
    Delivery_Date:str
    PO_Number: int
    Delivery_Number: int
    NOC_Number: int    
    Batch_Id: int    
    Serial_Number: int    
    Shipment_Description: str
    
# def shipmentEntity(ship) -> dict:
#     return{
#         "shipmentNumber":str(ship['Shipment_Number']),
#         "ContainerNumber":str(ship['Container_Number'])
#     }    