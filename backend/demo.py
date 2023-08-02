import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

path = "http://localhost:5500/frontend/html/forgotPassword.html"


def generate_auth_email(email:str):

    print("inside generate auth email")

    subject = "Verification Code"

    body = """\
    <html>
    <head></head>
        <body>
            <p>Hi!<br>
            click <a href="http://localhost:5500/frontend/html/resetPassword.html">here</a> to reset your password.
            </p>
        </body>
    </html>
    """ 


    #sender_email = config.EMAIL_ID

    sender_email="scmxpert1@gmail.com"

    receiver_email = email

    #password = config.EMAIL_PWD

    password="mlyjkttmugfhcigo"

    message = MIMEMultipart()

    message["From"] = sender_email

    message["To"] = receiver_email

    message["Subject"] = subject

    message.attach(MIMEText(body, "html"))

    text = message.as_string()



    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:

        print("before login-"+str(sender_email)+","+str(password))

        server.login(sender_email, password)

        print("before send mail-"+str(text))

        server.sendmail(sender_email, receiver_email, text)

    print("end of generate auth email")
