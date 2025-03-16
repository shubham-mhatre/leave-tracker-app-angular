import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../models/model';
import { MasterService } from '../../services/master.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatTooltipModule, MatButtonModule, MatIconModule,MatPaginator,
    MatSnackBarModule,MatDrawer,MatSidenavModule,MatFormFieldModule,MatInputModule,MatSelectModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;

  employeeListData:Employee[]=[];
  constructor(private masterService:MasterService,private snackBar: MatSnackBar){

  }

  
  displayedColumns: string[] = ['srNo', 'name', 'email', 'gender', 'contact', 'department', 'role', 'action'];
  dataSource = new MatTableDataSource<Employee>();

  ngOnInit() {
    this.loadAllEmployeeData();
  }

  loadAllEmployeeData(){
    this.masterService.getAllEmployee().subscribe((res)=>{
      if(res.result){
        this.employeeListData= res.data;
        this.dataSource.data = this.employeeListData;
      }else{
        this.dataSource.data = this.employeeListData;
        this.showError(res.message);
      }
      
    },
    (error)=>{
      console.log(error);
      this.employeeListData=[];
      this.dataSource.data = [];
      this.showError(error.message);
    });
  }

  showError(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 3000,
      panelClass: ['snackbar-error'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  onEdit(employee: Employee){

  }

  onDelete(employee: Employee){

  }

  onSave() {
    console.log('Employee saved!');
    this.drawer.close();
  }

}
