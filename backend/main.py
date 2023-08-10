from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from routes import appRoute

origins = [
    "*"
    # "http://ec2-18-183-186-100.ap-northeast-1.compute.amazonaws.com:8080"
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

# encodes route api add into app
app.include_router(appRoute)