"use client";
import { AxiosResponse } from "axios";

export function serverDecoder(serverMsg: AxiosResponse) {
  console.log(serverMsg.data);
  switch (serverMsg.data[1].action) {
    case "add":
      console.log("added");

      break;
    case "delete":
      console.log("deleted");
      break;
    case "failed":
      console.log("failed");
      break;
  }
}
