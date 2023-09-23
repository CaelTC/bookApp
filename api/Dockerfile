FROM python:3.8.10
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirement.txt /code/
EXPOSE 5000
RUN pip install --upgrade pip
RUN pip install -r requirement.txt
COPY . /code/
CMD flask run -p 5000 --host=0.0.0.0