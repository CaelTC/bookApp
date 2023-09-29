from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import dotenv_values
from app.out import book_to_json
from flask_migrate import Migrate
import os

app = Flask(__name__)
config = dotenv_values('.env')

if os.environ.get('ENV') == 'prod':
       app.config['SQLALCHEMY_DATABASE_URI'] = config['DATABASE_PROD']      
else: 
       app.config['SQLALCHEMY_DATABASE_URI'] = config['DATABASE_DEV']

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Book(db.Model):
            __tablename__ = 'books'

            id = db.Column(db.Integer, primary_key=True)
            isinthehouse = db.Column(db.Boolean)
            title = db.Column(db.String)
            year= db.Column(db.Integer)
            owner= db.Column(db.String)
            lender= db.Column(db.String)

                

@app.route("/books", methods=["GET"])
def get_books():
    books = Book.query.all()
    books_json = [book_to_json(book) for book in books]
    return jsonify(books_json)

@app.route("/book/<int:id>", methods=["GET"])
def get_book(id):
       book = Book.query.get(id)
       book_json = book_to_json(book)
       print(jsonify(book_json))
       return jsonify(book_json)

@app.route("/add", methods=["POST"])
def add_book():
       data = request.get_json()
       title = data['title']
       year = data['year']
       isInTheHouse = data['isInTheHouse']
       owner = data['owner']
       new_book = Book(title=title, year=year, isinthehouse = isInTheHouse, owner= owner, lender="")
       db.session.add(new_book)
       db.session.commit()
       return jsonify([{'tag': 'MSG'}, {'action': 'add'}, {'id': new_book.id}]), 201

@app.route('/update', methods=['PUT'])
def update_book():
       data = request.get_json()
       book = Book.query.get(data['id'])
       if book is None:
              return jsonify([{'tag': 'MSG'},{'action': 'No book found'}]), 404
       
       book.title = data['title']
       book.year = data['year']
       book.isinthehouse = data['isInTheHouse']
       book.lender = data['lender']
       book.owner = data['owner']
       db.session.commit()
       return jsonify([{'tag': 'MSG'},{'action': 'bookUpdated'}, {'id': book.id}])
       
@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_book(id):
       record = Book.query.get(id)
       if record:
              db.session.delete(record)
              db.session.commit()
              return jsonify([{'tag': 'MSG'},{'action': 'delete'},{'id': id}])
       else:
            return jsonify([{'tag': 'MSG'},{'action': 'failed'}])
       
if __name__ == '__main__':
    app.run()