import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChildDepartment, Employee, ParentDepartment } from '../../models/model';
import { MasterService } from '../../services/master.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatTooltipModule, MatButtonModule, MatIconModule,MatPaginator,
    MatSnackBarModule,MatDrawer,MatSidenavModule,MatFormFieldModule,MatInputModule,MatSelectModule,FormsModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;

  //password related start
  rePassword: string = '';
  hidePassword: boolean = true;
  hideRePassword: boolean = true;
  //password related end

  //save call related employee object
  employeeObj:Employee=new Employee();

  //dropdown data of parent & child department of save modal
  parentdepartments:ParentDepartment[]=[];
  childdepartments:ChildDepartment[]=[];

  //grid data object for employee list
  employeeListData:Employee[]=[];
  constructor(private masterService:MasterService,private snackBar: MatSnackBar){

  }

  
  displayedColumns: string[] = ['srNo', 'name', 'email', 'gender', 'contact', 'department', 'role', 'action'];
  dataSource = new MatTableDataSource<Employee>();

  ngOnInit() {
    this.loadAllEmployeeData();
    this.loadParentDepartmentData();
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

  loadParentDepartmentData(){
    this.masterService.getAllParentDepartment().subscribe((res)=>{
      this.parentdepartments=res.data;
      console.log("getting parentdepartment data");
      console.log(res);
      console.log("Parent departments loaded:", this.parentdepartments);
    })
  }

  onParentDepartmentChange(selectedDeptId: number): void {
    console.log("Selected parent Department ID:", selectedDeptId);
    this.masterService.getChildDepartmentByParentId(selectedDeptId).subscribe((res)=>{
      this.childdepartments= res.data;
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

  showSuccess(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 3000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
  

  onEdit(employee: Employee){

  }

  onDeleteEmployee(employeeId:number){
    console.log("delete employee with id : ",employeeId)
    this.masterService.deleteEmployee(employeeId).subscribe((res)=>{
      if(res.result){
        this.showSuccess(res.message);
        this.loadAllEmployeeData();
      }else{
        this.showError(res.message);
      }
    })
  }

  onSave() {
    console.log('Employee saved!' , this.employeeObj);
    this.masterService.createEmployee(this.employeeObj).subscribe((res)=>{
      if(res.result){
        this.showSuccess(res.message);
        this.employeeObj=new Employee();//re-initialize for new data entry
        this.drawer.close();
        this.loadAllEmployeeData();
      }else{
        this.showError(res.message);
      }
    })
  }

}
