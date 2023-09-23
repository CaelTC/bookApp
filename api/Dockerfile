FROM python:3.8.10
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirement.txt /code/
EXPOSE 5000 
RUN pip install -r requirement.txt
COPY . /code/
CMD gunicorn -w 3 --bind 0.0.0.0:5000 app.app:app