import {Component, OnInit} from '@angular/core';
import {DashcardComponent} from "../../components/utils/dashcard/dashcard.component";
import {ClassResponse, ClassServiceService} from "../../services/class-service.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CreateClassFormComponent} from "../../components/utils/create-class-form/create-class-form.component";

@Component({
  selector: 'app-classes',
  standalone: true,
    imports: [
      DashcardComponent,
      CommonModule,
      FormsModule,
      MatDialogModule,
    ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent implements OnInit {

  classes: ClassResponse[] = [];
  filteredClasses: ClassResponse[] = []; // Array to store filtered results
  searchTerm: string = '';

  constructor(
    private classService: ClassServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    this.getClasses()
  }

  getClasses(): void {
    this.classService.getClassesByTeacher().subscribe({
      next: (data) => this.classes = data,
      error: (err) => console.error('Error fetching classes:', err)
    })
  }

  openCreateClassDialog() {
    const dialogRef = this.dialog.open(CreateClassFormComponent, {
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

  filterClasses(): void {
    if (!this.searchTerm) {
      this.filteredClasses = [...this.classes];
      return;
    }

    this.filteredClasses = this.classes.filter(classItem => {
      const searchTermLower = this.searchTerm.toLowerCase();
      // Add null/undefined checks for each property
      const classname = classItem.classname ? classItem.classname.toLowerCase() : '';
      const level = classItem.level ? classItem.level.toLowerCase() : '';
      const startdate = classItem.startdate ? classItem.startdate.toLowerCase() : '';
      const enddate = classItem.enddate ? classItem.enddate.toLowerCase() : '';
      const price = classItem.price !== null && classItem.price !== undefined ? classItem.price.toString().toLowerCase() : '';
      const createdate = classItem.createdate ? classItem.createdate.toLowerCase() : '';

      return classname.includes(searchTermLower) ||
        level.includes(searchTermLower) ||
        startdate.includes(searchTermLower) ||
        enddate.includes(searchTermLower) ||
        price.includes(searchTermLower) ||
        createdate.includes(searchTermLower);
    });
  }
}
