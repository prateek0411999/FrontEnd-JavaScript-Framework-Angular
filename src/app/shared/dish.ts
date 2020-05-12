import { Comment } from './comment';
export class Dish {
    id: number;
    name: string;
    image: string; //This image string will be a string which points to
    //the URL of the image that I'm going to use for this particular dish

    category: string;
    featured: boolean;
    label: string;
    price: string;
    description: string;
    comments: Comment[];

}



