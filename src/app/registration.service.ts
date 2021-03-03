import { Injectable } from '@angular/core';
import { IBlog } from './blog.interface';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
   users: Array<IUser> = [
     {
       name: 'admin',
       email: 'admin@gmail.com',
       password: 'qwerty123'
     }
   ];

   blogs: Array<IBlog> = [
     {
      name: 'First blog',
      postedBy: 'admin',
      date: '22.05.2020',
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing.'
     }
   ]

  constructor() { }
}
