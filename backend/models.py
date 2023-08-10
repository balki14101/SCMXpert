from typing import Union,Optional,List
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
    role:str
    key:str | None

class Login(BaseModel):
    email: str
    password: str

class forgotPassword(BaseModel):
    email: str
    # password: str
    # reenteredpassword:str

class ResetPassword(BaseModel):
    email: str
    password: str
    reenteredpassword:str    


class Device_Data(BaseModel):
    Battery_Level= str,
    Device_ID= str,
    First_Sensor_Temperature= str,
    Route_From= str,
    Route_To= str

class ship(BaseModel):
    Shipment_Number: str
    Container_Number: str
    Delivery_Date:str
    PO_Number: str
    Delivery_Number: str
    NOC_Number: str    
    Batch_Id: str    
    Serial_Number: str    
    Shipment_Description: str
    Created_by:str
    User_Id:str  

