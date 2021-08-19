import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tdf-exam',
  templateUrl: './tdf-exam.component.html',
  styleUrls: ['./tdf-exam.component.css']
})
export class TdfExamComponent implements OnInit {

  constructor() { }
  allQuestions=
  [
    {"question": "5+5", "ans1": "10", "ans2": "10", "ans3":"10", "ans4":13,"correctAns":"10"},
    {"question": "5-5", "ans1": "10", "ans2": "10", "ans3":"10", "ans4":13,"correctAns":"10"}

]
  ngOnInit(): void {
  }

  
}
