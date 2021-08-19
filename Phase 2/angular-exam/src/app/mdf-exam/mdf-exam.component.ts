import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Questions } from '../questions.model';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-mdf-exam',
  templateUrl: './mdf-exam.component.html',
  styleUrls: ['./mdf-exam.component.css']
})
export class MdfExamComponent implements OnInit {
  myForm:FormGroup;
  constructor(public form:FormBuilder, public questionsSer:QuestionsService) { //build form dynamically creating Dependency Injection (DI)
    this.myForm=form.group({});
   }
  allQuestions:Array<Questions>=
  [
    
  ]
  correctAnswers:Array<string>=[];
  selectedAnswers:Array<string>=[];
  isExamDone:boolean=false;
  numCorrectAns:number=0;
  numAnsTotal:number=0;
  msg:string="<br>";
  //life cycle method, will call after constructor
  ngOnInit(): void {

    // this.allQuestions.forEach(q=>{
    //   this.myForm?.addControl(q.question, this.form.control(""));
    //                         //user:new FormControl();
    //                         //q.question:new FormControl();
    // })
    // let quest:Questions;
    this.questionsSer.checkQuestionsInfo().subscribe(result=>{
      for(let qq of result){
        this.myForm?.addControl(qq.question, this.form.control(""));
        this.allQuestions.push(qq);
        
      }
    })
  }

  checkQuestions(){
    // let flag = 0;
    // let quest:Questions;
    // this.questionsSer.checkQuestionsInfo().subscribe(result=>{
    //   for(let qq of result){
    //     this.myForm?.addControl(qq.question, this.form.control(""));
    //     this.allQuestions.push(qq);
    //   }
    // })
  }

  submit(){
    console.log(this.myForm);
    this.allQuestions.forEach(q=>this.correctAnswers.push(q.correctAns));
    Object.keys(this.myForm.value).forEach(q=>this.selectedAnswers.push(this.myForm.value[q]));
    this.numAnsTotal=this.correctAnswers.length;
    for(let i = 0; i < this.correctAnswers.length; i++){
      if(this.correctAnswers[i] == this.selectedAnswers[i]){
        this.numCorrectAns++;
        document.getElementById(this.correctAnswers[i])!.setAttribute("style", "background-color:lightgreen");
        document.getElementById(this.correctAnswers[i])!.append(" Correct Answer");
        console.log("Success!");
      }
      else{
        document.getElementById(this.selectedAnswers[i])!.setAttribute("style", "background-color:crimson");
        document.getElementById(this.selectedAnswers[i])!.append(" Wrong Answer");
        document.getElementById(this.correctAnswers[i])!.setAttribute("style", "background-color:lightgreen");
        document.getElementById(this.correctAnswers[i])!.append(" Correct Answer");
        console.log("Failure...");
      }
    }
    this.myForm.disable();
    this.isExamDone=true;
    let percentCorrect:number=((this.numCorrectAns/this.numAnsTotal)*100);
    if(percentCorrect > 60){
      
      document.getElementById("examScore")!.setAttribute("style", "background-color:lightgreen");
      document.getElementById("PassFail")!.setAttribute("style", "background-color:lightgreen");
      document.getElementById("PassFail")!.append("PASS!");
      document.getElementById("examScore")!.append(this.numCorrectAns+"/"+this.numAnsTotal+" = "+ percentCorrect.toString()+"%");
    }
    else{
      document.getElementById("examScore")!.setAttribute("style", "background-color:crimson");
      document.getElementById("PassFail")!.setAttribute("style", "background-color:crimson");
      document.getElementById("PassFail")!.append("FAIL!");
      document.getElementById("examScore")!.append("Score: " + this.numCorrectAns+"/"+this.numAnsTotal+" = "+ percentCorrect.toString()+"%");
    }
    
  }
}
