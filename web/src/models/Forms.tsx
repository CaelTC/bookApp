import Moment from "moment";

export type BookFormValues = {
  title: string;
  year: Moment.Moment;
  owner: string;
};
