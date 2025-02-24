import {Component, OnInit} from '@angular/core';
import {DashcardComponent} from "../../components/utils/dashcard/dashcard.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ClassResponse, ClassServiceService} from "../../services/class-service.service";
import {Router} from "@angular/router";
import {StudentResponse, StudentService} from "../../services/student.service";
import {CreateClassFormComponent} from "../../components/utils/create-class-form/create-class-form.component";
import {CreateStudentFormComponent} from "../../components/utils/create-student-form/create-student-form.component";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    DashcardComponent,
    CommonModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  constructor( private studentService: StudentService,
               private router: Router,
               private dialog: MatDialog) {

  }
  students: StudentResponse[] = [];
  filteredStudents: StudentResponse[] = []; // Array to store filtered results
  searchTerm: string = '';

  ngOnInit(): void {
    this.getStudents()
  }

  getStudents(): void {
    this.studentService.getStudentsByTeacher().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error('Error fetching classes:', err)
    })
  }

  openCreateStudentDialog() {
    const dialogRef = this.dialog.open(CreateStudentFormComponent, {
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

}
