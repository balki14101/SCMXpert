FROM python:alpine

COPY . /docker-kafka/consumer

WORKDIR /docker-kafka/consumer

RUN pip install --upgrade pip

RUN pip install -r requirement.txt


CMD [ "python", "consumer.py" ]
