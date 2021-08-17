import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  msg:string="";
  flag:boolean=true;
  reg:boolean=false;
  port:boolean=false;
  user:string="";
  pass:string="";
  employees:Array<Employee>=new Array();
  title = 'Amazing-Portfolio';

  checkUser(loginRef:NgForm){
    let login=loginRef.value;
    if(login.user=="Raj" && login.pass=="123"){
      this.msg = "Succesful Login!"
    }
    else{
      this.msg = "Failure try once again!"
    }
    loginRef.reset();
  }
  showRegistration(){
    if(this.flag){
      this.flag = false;
      this.reg=true;
    }
  }
  showSignIn(userRef:any, passRef:any){
    this.msg="";
    this.user = userRef.value;
    this.pass = passRef.value;
    if(this.reg){
      this.reg=false;
      this.flag=true;
    }
  }
  showPortfolio(userLogin:any, passLogin:any){
    if(userLogin.value == this.user && passLogin.value == this.pass){
      if(this.flag){
        this.flag=false;
        this.port=true;
      }
    }
    else{
      this.msg = "Failure try once again!";
    }
    
  }
  fillTable(contactRef:any, phoneRef:any){
    let contact = contactRef.value;
    let phone = phoneRef.value;
    let emp1:Employee={contactName:contact, phoneNo:phone}
    this.employees.push(emp1);
  }
  
}
