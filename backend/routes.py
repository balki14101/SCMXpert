from fastapi import HTTPException,status,APIRouter

from jose import JWTError
from passlib.context import CryptContext

from fastapi import Depends
from bson import json_util
import json
import random
import string

from validations import loginValid,registerValid,resetPasswordValidate,createShipment,forgotPasswordValidate
from mongo import mongodb,users_Collection,datastream_Collection,shipments_Collection
from models import User,Login,ship,ResetPassword,forgotPassword
from jwt import get_token,verify_token
from generateEmail import generate_auth_email

appRoute=APIRouter()

#password-hash
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


#get users
@appRoute.get("/getUsers")
def get_users():
    data = list(mongodb['users'].find())
    print("sdf",data)
    
    returnlist = []
    for item in data:
        returnlist.append({"id":str(item["_id"]),
            "name":str(item["name"]),
               "email": str(item["email"]),
               "password": str(item["password"])
               })
    print(returnlist)
    return returnlist

#get users with query params key
@appRoute.get("/getUser/{key}")
def get_users(key: str):
    
    data = mongodb['users'].find_one({'key': key})

    return {"id":str(data["_id"]),
            "name":str(data["name"]),
               "email": str(data["email"]),
               "password": str(data["password"]),
               "role": str(data["role"]),
               "key": str(data["key"])
               }

#create user
@appRoute.post("/createUser")
def create_user(user:User):
    
    # field validations
    registerValid(user)

    try:
        if (user.name != '') and (user.email != '') and (user.password != ''):
            findEmail = users_Collection.find_one({'email':user.email})
            if findEmail == None:
                # password encryption
                hashed_password = pwd_context.hash(user.password)

                users_Collection.insert_one({'name':user.name,'email':user.email,'password':hashed_password,'role':user.role})
                return "user is created successfully"
            else:
                return "user already exist"
                                 
        return "enter the details properly"

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad Request",
        )   

#login user
@appRoute.post("/loginUser")
async def login_user(login_user:Login):

    # field validations
    loginValid(login_user)
    try:
        user = users_Collection.find_one({'email':login_user.email})
        data=json.loads(json_util.dumps(user))
       
        # if check:
        if data != None:
            passwordCheck = pwd_context.verify(login_user.password, data['password'])
            print(passwordCheck)
            
            if passwordCheck:
                # generating JWT 
                token = await get_token(data)

                return {"message":"user already exists","token":token,"role":data['role'],"userId":data['_id'],"username":data['name']}
            else:
                return  "user already exists, please enter the correct password"
        else:
            return "no user found"
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad Request",
        ) 

#forgot password
@appRoute.post("/forgotPassword")
async def forgot_password(forgot_password_email:forgotPassword):
    
    # field validations
    forgotPasswordValidate(forgot_password_email)

    try:    

        data = users_Collection.find_one({'email':forgot_password_email.email})
        
        # checking if email exist
        if data != None:
            
            # generating randow key
            key = random.randint(1000000000,9999999999)
            # printing letters
            letters = string.ascii_letters
            key = ''.join(random.choice(letters) for i in range(10))
            print ( ''.join(random.choice(letters) for i in range(10)) )     

            users_Collection.find_one_and_update({ "email" : forgot_password_email.email },{"$set": { "key" : key }})

            generate_auth_email(forgot_password_email.email,key)

            return "reset mail sent successfully"
        else:
            return "need to signup, no user found"
    except JWTError:
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized Entry",
        )        

#reset password
@appRoute.post("/resetpassword")
async def forgot_password(new_credentials:ResetPassword):
    print(new_credentials)

    # field validation
    resetPasswordValidate(new_credentials)

    try:    
        # get user
        data = users_Collection.find_one({'email':new_credentials.email})
        
        if data != None:
            passwordCheck = pwd_context.verify(new_credentials.password, data['password'])
            
            # verifying hash_password
            if passwordCheck:
                return "entered password is same as old one, please enter the new password"
            else:           
                hashed_password = pwd_context.hash(new_credentials.password)
                users_Collection.find_one_and_update({'email':new_credentials.email},{"$set":{'password':hashed_password,"key":"null"}})

                return  "password updated successfully"
        else:
            return "need to signup, no user found"
    except JWTError:
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized Entry",
        )    

# datastream
@appRoute.get("/datastream")
async def getDataStream(tokensss:str=Depends(verify_token)):
    
    try:
        data = list(datastream_Collection.find())
        print("sdf",data)
        returnlist = []
        for item in data:
            returnlist.append({
                "Battery_Level":int(item["Battery_Level"]),
                "First_Sensor_Temperature": int(item["First_Sensor_Temperature"]),
                "Device_ID": str(item["Device_ID"]),
                "Route_From": str(item["Route_From"]),
                "Route_To": str(item["Route_To"]),
            })
        print(returnlist)
        return returnlist
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't get data",
        )    


#create user
@appRoute.post("/createShipment")
def create_user(data:ship,token:str=Depends(verify_token)):

    # field validation
    createShipment(data)

    try:
        findShipment = shipments_Collection.find_one({'Shipment_Number':data.Shipment_Number})

        if findShipment == None:

            shipments_Collection.insert_one({
            'Shipment_Number':data.Shipment_Number,
            'Container_Number':data.Container_Number,
            'Delivery_Date': data.Delivery_Date,
            'PO_Number':data.PO_Number,
            'Delivery_Number':data.Delivery_Number,
            'NOC_Number':data.NOC_Number,
            'Batch_Id':data.Batch_Id,
            'Serial_Number':data.Serial_Number,
            'Shipment_Description':data.Shipment_Description,
            'Created_by':data.Created_by,
            'User_Id':data.User_Id,
            })

            return "shipment created successfully"
        else:
                return "Duplicate Shipment"
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized Entry",
        )    

# shipment details
@appRoute.get("/getShipments")
async def getDataStream(tokensss:str=Depends(verify_token)):
    print("tokennn",tokensss)

    try:
        data = list(shipments_Collection.find())
        print("shipments",data)
        returnlist = []
        for item in data:
            returnlist.append({
                "Shipment_Number":str(item["Shipment_Number"]),
                "Container_Number": str(item["Container_Number"]),
                "Delivery_Date": str(item["Delivery_Date"]),
                "PO_Number": str(item["PO_Number"]),
                "Delivery_Number": str(item["Delivery_Number"]),
                "NOC_Number": str(item["NOC_Number"]),
                "Batch_Id": str(item["Batch_Id"]),
                "Serial_Number": str(item["Serial_Number"]),
                "Shipment_Description": str(item["Shipment_Description"]),
                "Created_by": str(item["Created_by"]),
                "User_Id": str(item["User_Id"]),
            })

        return returnlist
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't get shipment data",
        )