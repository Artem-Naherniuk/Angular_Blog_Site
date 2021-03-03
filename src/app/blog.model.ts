import { IBlog } from "./blog.interface";

export class Blog implements IBlog {
    constructor(
        public name: string,
        public postedBy: string,
        public date:string,
        public text: string
    ){}
}