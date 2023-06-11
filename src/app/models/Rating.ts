export interface Rating{
  id:number;
  stars:number;
  movie_rate_id:number;
  movie_name?:string;
  user_rate_id:number;
  user_name?: string;
  user_image?:File;
}
