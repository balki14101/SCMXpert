from models import Login,User,ship,ResetPassword
from fastapi import FastAPI,HTTPException,status,Request
import re


def loginValid(login_user:Login):

    EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
    EMAIL_NUMBER_CHECK = re.compile(r'^[a-zA-Z]+(?:_[a-zA-Z]+)?$')

    PWD_REGEX = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$')


    if len(login_user.email) < 1:
        raise HTTPException(
            status_code=400,
            detail= "The email field is required"
        )
    
    
    elif not EMAIL_REGEX.match(login_user.email):
        raise HTTPException(
            status_code=400,
            detail= "The email address is not valid"
        )
    

    elif len(login_user.password) < 1:
        raise HTTPException(
            status_code=400,
            detail= "The password field is required"
        )

    elif not PWD_REGEX.match(login_user.password):   
        raise HTTPException(
            status_code=400,
            detail= "The password must contain at least 1 digit, 1 uppercase letter, and 1 lowercase letter,and 1 special character and must be 6-16 characters"
        )
        
def registerValid(user:User):

    EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
    EMAIL_NUMBER_CHECK = re.compile(r'^[a-zA-Z]+(?:_[a-zA-Z]+)?$')

    PWD_REGEX = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$')


    if len(user.name) < 1:
        raise HTTPException(
            status_code=400,
            detail= "The Username field is required"
        )

    elif not re.match("^[a-zA-Z]+(?:_[a-zA-Z]+)?$", user.name):
        raise HTTPException(
            status_code=400,
            detail= "The Username must be letters only"
        )

    elif len(user.email) < 1:
        raise HTTPException(
            status_code=400,
            detail= "The email field is required"
        )
    
    
    elif not EMAIL_REGEX.match(user.email):
        raise HTTPException(
            status_code=400,
            detail= "The email address is not valid"
        )
    

    elif len(user.password) < 1:
        raise HTTPException(
            status_code=400,
            detail= "The password field is required"
        )

    elif not PWD_REGEX.match(user.password):   
        raise HTTPException(
            status_code=400,
            detail= "The password must contain at least 1 digit, 1 uppercase letter, and 1 lowercase letter,and 1 special character and must be 6-16 characters"
        )
                
    elif (len(user.reenterpassword) < 1 or user.password != user.reenterpassword):
        raise HTTPException(
            status_code=400,
            detail= "Password Mismatching"
        )                

def resetPasswordValidate(new_credentials:ResetPassword):

    EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
    EMAIL_NUMBER_CHECK = re.compile(r'^[a-zA-Z]+(?:_[a-zA-Z]+)?$')

    PWD_REGEX = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$')



    if len(new_credentials.email) < 1:
        raise HTTPException(
            status_code=400,
            detail= "The email field is required"
        )
    
    
    elif not EMAIL_REGEX.match(new_credentials.email):
        raise HTTPException(
            status_code=400,
            detail= "The email address is not valid"
        )
    

    elif len(new_credentials.password) < 1:
        raise HTTPException(
            status_code=400,
            detail= "The password field is required"
        )

    elif not PWD_REGEX.match(new_credentials.password):   
        raise HTTPException(
            status_code=400,
            detail= "The password must contain at least 1 digit, 1 uppercase letter, and 1 lowercase letter,and 1 special character and must be 6-16 characters"
        )
                
    elif (len(new_credentials.reenteredpassword) < 1 or new_credentials.password != new_credentials.reenteredpassword):
        raise HTTPException(
            status_code=400,
            detail= "Password Mismatching"
        )                

def createShipment(shipment:ship):
    number_pattern = "^\\d+$"

    if len(shipment.Shipment_Number) < 1 or not re.match(number_pattern,shipment.Shipment_Number):
        raise HTTPException(
            status_code=400,
            detail= "Shipment_Number field is required and must be integer"
        )
    
    elif len(shipment.Container_Number) < 1 or not re.match(number_pattern,shipment.Container_Number):
        raise HTTPException(
            status_code=400,
            detail= "Container_Number field is required and must be integer"
        )
    elif len(shipment.Delivery_Date) < 1:
        raise HTTPException(
            status_code=400,
            detail= "Delivery_Date field is required and must be integer"
        )
    elif len(shipment.PO_Number) < 1 or not re.match(number_pattern,shipment.PO_Number):
        raise HTTPException(
            status_code=400,
            detail= "PO_Number field is required and must be integer"
        )
    elif len(shipment.Delivery_Number) < 1 or not re.match(number_pattern,shipment.Delivery_Number):
        raise HTTPException(
            status_code=400,
            detail= "Delivery_Number field is required and must be integer"
        )
    elif len(shipment.NOC_Number) < 1 or not re.match(number_pattern,shipment.NOC_Number):
        raise HTTPException(
            status_code=400,
            detail= "NOC_Number field is required and must be integer"
        )
    elif len(shipment.Batch_Id) < 1 or not re.match(number_pattern,shipment.Batch_Id):
        raise HTTPException(
            status_code=400,
            detail= "Batch_Id field is required and must be integer"
        )
    elif len(shipment.Serial_Number) < 1 or not re.match(number_pattern,shipment.Serial_Number):
        raise HTTPException(
            status_code=400,
            detail= "Serial_Number field is required and must be integer"
        )
    elif len(shipment.Shipment_Description) < 1:
        raise HTTPException(
            status_code=400,
            detail= "Shipment_Description field is required"
        )
    
       
    # elif len(request.form['email']) < 2:
    #     flash("The email address should be at least two characters", 'email')
    #     is_valid = False
    
    # EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
    # if not EMAIL_REGEX.match(request.form['email']):    # test whether a field matches the pattern
    #     print('email is not valid')
    #     flash("The email address is not valid", 'email')
    #     is_valid = False
    