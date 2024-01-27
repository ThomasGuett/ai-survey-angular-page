import { Component, Injectable, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ai-prompt';

  constructor(private http: HttpClient) {}

  submitStage = 0
  submittedText = ""

  ngOnInit(): void {
  }

  apiUrl = 'https://bru-2.connectors.camunda.io/f82addb6-e853-4dde-9d8f-1310963752cf/inbound/conduct-ai-survey-123';
  form = new FormGroup({
    textprompt: new FormControl('')
  });

  async onSubmit(){
    try {
      console.log("on submit")
      this.submitStage = 1
      const { textprompt } = this.form.value;
      this.submittedText = textprompt ? textprompt : ""

      this.http.post<any>(this.apiUrl, {
        option: textprompt,
        surveyId: "123"
      }, {observe: 'response'} ).subscribe(response => {
        console.log("response", response)
      })
    } catch (error) {
      console.log("error calling api", error)
    }
  }

  resetInput() {
    this.form.reset
    this.submitStage = 0
  }
}
