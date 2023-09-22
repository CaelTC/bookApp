"use client";
import { AxiosResponse } from "axios";

export function serverDecoder(serverMsg: AxiosResponse): Promise<number> {
  return new Promise((resolve, reject) =>{
    switch (serverMsg.data[1].action) {
    case "add":
      resolve( serverMsg.data[2].id);
    case "modifiedTitle":
      resolve(serverMsg.data[2].id);
    case "modifiedYear":
      resolve(serverMsg.data[2].id);
    case "modifiedLocation":
      resolve(serverMsg.data[2].id)
    case "delete":
      resolve( serverMsg.data[2].id);
    case "failed":
      reject("Server failed to do the action");
  }})
}
