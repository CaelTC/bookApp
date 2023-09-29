"use client";
import { AxiosResponse } from "axios";
import { Book, BookState } from "../models/Books";

export function serverDecoder(serverMsg: AxiosResponse): Promise<number> {
  return new Promise((resolve, reject) => {
    switch (serverMsg.data[1].action) {
      case "add":
        resolve(serverMsg.data[2].id);
      case "bookUpdated":
        console.log(serverMsg.data[2].id);
        resolve(serverMsg.data[2].id);
      case "delete":
        resolve(serverMsg.data[2].id);
      case "failed":
        reject("Server failed to do the action");
    }
  });
}

export function bookDecoder(json): Book {
  const bookObject: Book = {
    id: json.id,
    bookState: bookStateDecoder(json),
    title: json.title,
    year: json.year,
    owner: json.owner,
    lender: json.lender,
  };
  return bookObject;
}

function bookStateDecoder(json): BookState {
  console.log(json.isInTheHouse);
  if (json.isInTheHouse) {
    return BookState.AtTheHouse;
  } else {
    return BookState.Lent;
  }
}
