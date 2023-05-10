import {Genre} from "./Genre";
import {Review} from "./Review";

export interface Movie{
  idMovie?:number;
  title:string;
  country:string;
  date:string;
  duration:string;
  trailer:string;
  textMini:string;
  textLarge:string;
  averageRate?:number;
  image?:File;
  genres?: Genre[];
  reviews?: Review[];
}
