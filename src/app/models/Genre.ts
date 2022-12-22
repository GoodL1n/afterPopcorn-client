import {Movie} from "./Movie";

export interface Genre{
  id?:number;
  title:string;
  movies?: Movie[];
}
