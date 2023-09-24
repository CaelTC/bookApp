"use client";
import { AxiosResponse } from "axios";

export function serverDecoder(serverMsg: AxiosResponse): Promise<number> {
  return new Promise((resolve, reject) =>{
    switch (serverMsg.data[1].action) {
    case "add":
      resolve( serverMsg.data[2].id);
    case "bookUpdated":
      console.log(serverMsg.data[2].id)
        resolve(serverMsg.data[2].id);
    case "delete":
      resolve( serverMsg.data[2].id);
    case "failed":
      reject("Server failed to do the action");
  }})
}
