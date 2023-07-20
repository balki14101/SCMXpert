FROM python:alpine

COPY . /docker-kafka/producer

WORKDIR /docker-kafka/producer

RUN pip install --upgrade pip

RUN pip install -r requirement.txt

CMD [ "python", "producer.py" ]
