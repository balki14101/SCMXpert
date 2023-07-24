from models import Login,User
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
    


        
    # elif len(request.form['email']) < 2:
    #     flash("The email address should be at least two characters", 'email')
    #     is_valid = False
    
    # EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
    # if not EMAIL_REGEX.match(request.form['email']):    # test whether a field matches the pattern
    #     print('email is not valid')
    #     flash("The email address is not valid", 'email')
    #     is_valid = False
    