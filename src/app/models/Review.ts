export interface Review{
  id?:number;
  title?:string;
  text:string;
  likes:number;
  user_id:number;
  user_image?:File;
  nickname?:string;
  movie_id:number;
  movie_name?:string;
  likedUsers?:string[];
}
