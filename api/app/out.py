

def book_to_json(book):
    return{'id': book.id, 'isInTheHouse': book.isinthehouse, 'title': book.title, 'year': book.year, 'owner': book.owner, 'lender': book.lender}