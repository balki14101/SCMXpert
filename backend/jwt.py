from fastapi import Depends
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import FastAPI,HTTPException,status,Request
from fastapi.security import OAuth2PasswordBearer


# encryption algorithm
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Function to create a token for particular data
def create_access_token(data: dict):
    print("creating token",data)
    to_encode = data.copy()
    print ("to_encode token token",to_encode['name'])
     
    # expire time of the token
    expire = datetime.utcnow() + timedelta(minutes=30)

    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode({
        "name":to_encode['name'],
        "email":to_encode['email'],
        "password":to_encode['password'],
        "exp": expire
        }, 'MY_SECRET_KEY', algorithm=ALGORITHM)

    print("encoded",encoded_jwt)
    return encoded_jwt


# the endpoint to get the token
async def get_token(data):
    print("get token function",data)
   
    # data to be signed using token
    token = create_access_token(data=data)
    return token

# the endpoint to verify the token
async def verify_token(token: str = Depends(oauth2_scheme)):
    print("verifyingtoken",token)
    try:
        payload = jwt.decode(token, 'MY_SECRET_KEY', algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token Expired",
        )
