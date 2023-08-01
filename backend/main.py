from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI,HTTPException,status,Request
from validations import loginValid,registerValid,resetPasswordValidate,createShipment
from mongo import mongodb,users_Collection,datastream_Collection,shipments_Collection
from jose import JWTError, jwt
from passlib.context import CryptContext

from fastapi import Depends
from jwt import get_token,verify_token
from bson import json_util
import json


from models import User,Login,ship,ResetPassword

origins = [
    "*"
]

app = FastAPI()

# prevents CORS error and router
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#password-hash
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


#get users
@app.get("/getUsers")
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

#create user
@app.post("/createUser")
def create_user(user:User):
    print("creating a user",user)
    registerValid(user)

    try:
        if (user.name != '') and (user.email != '') and (user.password != ''):
            findEmail = users_Collection.find_one({'email':user.email})
            if findEmail == None:
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

#create user
@app.post("/loginUser")
async def login_user(login_user:Login):
    print("entered credentials",login_user)
    
    loginValid(login_user)
    try:
        data = users_Collection.find_one({'email':login_user.email})
        data=json.loads(json_util.dumps(data))
       
        # if check:
        if data != None:
            passwordCheck = pwd_context.verify(login_user.password, data['password'])
            print(passwordCheck)
            
            if passwordCheck:
                token = await get_token(data)
                print(token)
                print(type(data['_id']))
                return {"message":"user already exists","token":token,"role":data['role'],"userId":data['_id'],"username":data['name']}
            else:
                return  "user already exists, please enter the correct password"
        else:
            return "need to signup, no user found"
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad Request",
        ) 

#create user
@app.post("/forgotPassword")
async def forgot_password(new_credentials:ResetPassword):
    print(new_credentials)

    resetPasswordValidate(new_credentials)

    try:    
        print("forgot password credentials",new_credentials)

        data = users_Collection.find_one({'email':new_credentials.email})
        print(data)

        if data != None:

            passwordCheck = pwd_context.verify(new_credentials.password, data['password'])
            if passwordCheck:
                return "entered password is same as old one, please enter the new password"
            else:           
                hashed_password = pwd_context.hash(new_credentials.password)
                users_Collection.find_one_and_update({'email':new_credentials.email},{"$set":{'password':hashed_password}})
                return  "password updated successfully"
        else:
            return "need to signup, no user found"
    except JWTError:
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized Entry",
        )        


@app.get("/datastream")
async def getDataStream(tokensss:str=Depends(verify_token)):
    print("tokennn",tokensss)
    
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
@app.post("/createShipment")
def create_user(data:ship,token:str=Depends(verify_token)):
    print("tokennn",token)
    print("creating a user",data)

    createShipment(data)

    try:
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
            'User_Id':data.User_Id
            })
        print("success")

        return "shipment created successfully"
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized Entry",
        )    

@app.get("/getShipments")
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
        print(returnlist)
        return returnlist
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't get shipment data",
        )    
