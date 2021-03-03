import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { count } from 'console';
// import { count } from 'console';
import { IBlog } from '../blog.interface';
import { RegistrationService } from '../registration.service';
import { IUser } from '../user.interface';
import { User } from '../user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  visibleSignIn: boolean = true;
  visibleSignUp: boolean = true;
  visibleHeader: boolean = true;
  visibleErr: boolean = true;
  visibleHeaderTwo: boolean = false;
  visibleAlertAddBlog: boolean = true;
  visibleAlertEdit: boolean = true;

  usersArr: Array<IUser> = [];

  blogsArr: Array<IBlog> = [];

  nameUp: string = '';
  emailUp: string = '';
  passwordUp: string = '';

  emailIn: string;
  passwordIn: string;

  userName: string;

  blogTitle: string = '';
  blogText: string = '';

  erorUser: string = 'This account does not exist or you have not entered an incorrect password';
  erorBlog: string = 'One of inputs is empty!';
  erorText: string;

  editTitle: string = '';
  editText: string = '';

  indexForEdit: number;


  constructor(private usersService: RegistrationService) { }

  ngOnInit(): void {
    this.getUsersArr();
  }

  getUsersArr(): void {
    this.usersArr = this.usersService.users;
    this.blogsArr = this.usersService.blogs;
    console.log(this.usersArr);
    console.log(this.blogsArr);

  }


  signIn(): void {
    this.visibleSignIn = false;
    console.log(this.usersArr);

  }

  signInFinal(): void {
    let count = 0;
    for (let i = 0; i < this.usersArr.length; i++) {
      if (this.usersArr[i].email == this.emailIn && this.usersArr[i].password == this.passwordIn) {
        this.visibleHeader = false;
        this.visibleSignIn = true;
        this.visibleHeaderTwo = true;
        this.userName = this.usersArr[i].name;
        count++;
        this.visibleErr = true;
      }
      if (count == 0) {
        this.erorText = this.erorUser;
        this.visibleErr = false;
        this.visibleSignIn = true;
      }
    }
    this.emailIn = '';
    this.passwordIn = '';
  }

  signUp(): void {
    this.visibleSignUp = false
  }

  signUpFinal(): void {
    let g = true;
    console.log(this.nameUp, this.emailUp, this.passwordUp, ' <= input Text');

    if (this.nameUp == '' || this.emailUp == '' || this.passwordUp == '') {
      this.erorText = this.erorUser;
      this.visibleErr = false;
    }
    else {
      for (let i = 0; i < this.usersService.users.length; i++) {
        if (this.usersService.users[i].name == this.nameUp || this.usersService.users[i].email == this.emailUp) {
          this.erorText = this.erorUser;
          this.visibleErr = false;
          g = false;
        }
      }
      if (g == true) {
        let user = {
          name: this.nameUp,
          email: this.emailUp,
          password: this.passwordUp
        };
        this.usersService.users.push(user);
      }
    }
    console.log(this.usersService.users, ' <= end');
    this.nameUp = '';
    this.emailUp = '';
    this.passwordUp = '';
    this.visibleSignUp = true
  }

  close(): void {
    this.visibleSignIn = true;
    this.visibleSignUp = true;
    this.visibleErr = true;
    this.visibleAlertAddBlog = true;
    this.visibleAlertEdit = true;
  }

  signOut(): void {
    this.visibleHeaderTwo = false;
    this.visibleHeader = true;
  }

  addPost(): void {
    this.visibleAlertAddBlog = false;
  }

  post(): void {
    if (this.blogText == '' || this.blogTitle == '') {
      this.erorText = this.erorBlog;
      this.visibleErr = false;
    }
    else {
      let date = new Date().toLocaleDateString();
      let blog = {
        name: this.blogTitle,
        postedBy: this.userName,
        date: date,
        text: this.blogText,
      }
      this.usersService.blogs.push(blog);
      date = '';
    }
    this.blogText = '';
    this.blogTitle = '';
    this.visibleAlertAddBlog = true;
  }

  deleteBlog(index: number): void {
    if (index == 0) {
      this.erorText = 'This post cannot be deleted';
      this.visibleErr = false;
    }
    else {
      if (this.userName == 'admin') {
        this.usersService.blogs.splice(index, 1);
      }
      else {
        if (this.blogsArr[index].postedBy == this.userName) {
          this.usersService.blogs.splice(index, 1);
        }
        else {
          this.erorText = 'You can not delete this';
          this.visibleErr = false;
        }
      }
    }
  }

  edit(index: number): void {
    if (this.userName == 'admin') {
      this.visibleAlertEdit = false;
      this.editTitle = this.blogsArr[index].name;
      this.editText = this.blogsArr[index].text;
    }
    else {
      if (this.blogsArr[index].postedBy == this.userName) {
        this.visibleAlertEdit = false;
        this.editTitle = this.blogsArr[index].name;
        this.editText = this.blogsArr[index].text;
      }
      else {
        this.erorText = 'You can not edit this';
        this.visibleErr = false;
      }
    }
    this.indexForEdit = index;
  }

  editFinal(): void {
    if (this.userName == 'admin') {
      this.blogsArr[this.indexForEdit].name = this.editTitle;
      this.blogsArr[this.indexForEdit].text = this.editText;
    }
    else if (this.blogsArr[this.indexForEdit].postedBy == this.userName) {
      this.blogsArr[this.indexForEdit].name = this.editTitle;
      this.blogsArr[this.indexForEdit].text = this.editText;
    }
    this.visibleAlertEdit = true;
  }

}
