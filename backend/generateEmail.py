import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def generate_auth_email(email:str,key:int):

    subject = "Verification Code"

    body = "<html> <head></head><body><p>Hi!<br>click <a href='http://127.0.0.1:5500/frontend/html/resetPassword.html?key="+str(key)+"'>here</a> to reset your password.</p></body></html>"


    sender_email="scmxpert1@gmail.com"

    receiver_email = email

    password="mlyjkttmugfhcigo"

    # mail content
    message = MIMEMultipart()

    message["From"] = sender_email

    message["To"] = receiver_email

    message["Subject"] = subject

    message.attach(MIMEText(body, "html"))

    text = message.as_string()

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:

        # login in sender mail
        server.login(sender_email, password)

        # sending mail to receiver email
        server.sendmail(sender_email, receiver_email, text)

    print("mail sent")
