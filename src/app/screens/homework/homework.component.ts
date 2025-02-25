import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {HomeworkResponse, HomeworkService} from "../../services/homework.service";
import {PaymentResponse} from "../../services/payment.service";
import {CreateClassFormComponent} from "../../components/utils/create-class-form/create-class-form.component";
import {CreateHomeworkFormComponent} from "../../components/utils/create-homework-form/create-homework-form.component";

@Component({
  selector: 'app-homework',
  standalone: true,
    imports: [
      NgForOf,
      ReactiveFormsModule,
      MatDialogModule
    ],
  templateUrl: './homework.component.html',
  styleUrl: './homework.component.css'
})
export class HomeworkComponent implements OnInit{
  homework : HomeworkResponse[] = [];

  constructor(private homeworkService: HomeworkService,
              private dialog: MatDialog
  ) {

  }

  getHomework(): void {
    this.homeworkService.getHomeworkByTeacher().subscribe({
      next: (data) => this.homework = data,
      error: (err) => console.error('Error fetching homework:', err)
    })
  }

  openCreateHomeworkDialog() {
    const dialogRef = this.dialog.open(CreateHomeworkFormComponent, {
      width: '700px',
      height: '500px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Form Data:', result);
        // Handle form submission (e.g., add the new class to the list)
      }
    });
  }

  ngOnInit(): void {
    this.getHomework()
  }

}
