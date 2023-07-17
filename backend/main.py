from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI,HTTPException,status,Request
from mongo import mongodb
from jose import JWTError, jwt
from passlib.context import CryptContext

from fastapi import Depends
from jwt import get_token,verify_token


from models import User,Login,ship

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
        returnlist.append({"name":str(item["name"]),
               "email": str(item["email"]),
               "password": str(item["password"])
               })
    print(returnlist)
    return returnlist

#create user
@app.post("/createUser")
def create_user(user:User):
    print("creating a user",user)

    try:
        if (user.name != '') and (user.email != '') and (user.password != ''):
            findEmail = mongodb['users'].find_one({'email':user.email})
            if findEmail == None:
                hashed_password = pwd_context.hash(user.password)

                mongodb['users'].insert_one({'name':user.name,'email':user.email,'password':hashed_password})
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

    try:
        data = mongodb['users'].find_one({'email':login_user.email})
        print(data)

        if data != None:
            passwordCheck = pwd_context.verify(login_user.password, data['password'])
            print(passwordCheck)
            if passwordCheck:
                demo = await get_token(data)
                print(demo)
                return {"message":"user already exists","token":demo}
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
async def forgot_password(new_credentials:Login):

    try:    
        print("forgot password credentials",new_credentials)

        data = mongodb['users'].find_one({'email':new_credentials.email})
        print(data)

        if data != None:

            passwordCheck = pwd_context.verify(new_credentials.password, data['password'])
            if passwordCheck:
                return "entered password is same as old one, please enter the new password"
            else:           
                hashed_password = pwd_context.hash(new_credentials.password)
                mongodb['users'].find_one_and_update({'email':new_credentials.email},{"$set":{'password':hashed_password}})
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
        data = list(mongodb['stream'].find())
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

    try:
        mongodb['shipment_created'].insert_one({
            'Shipment_Number':data.Shipment_Number,
            'Container_Number':data.Container_Number,
            'PO_Number':data.PO_Number,
            'Delivery_Number':data.Delivery_Number,
            'NOC_Number':data.NOC_Number,
            'Batch_Id':data.Batch_Id,
            'Serial_Number':data.Serial_Number,
            'Shipment_Description':data.Shipment_Description
            })
        print("success")

        return "shipment created successfully"
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized Entry",
        )    
