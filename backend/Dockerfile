FROM python:alpine
# COPY . app
# # COPY requirement.txt app/requirement.txt

# WORKDIR /app
# RUN pip install -r requirement.txt
# COPY . /app

COPY requirement.txt app/requirement.txt

WORKDIR /app

RUN pip install -r requirement.txt

COPY . /app

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000" , "--reload"]