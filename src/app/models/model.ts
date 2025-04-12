export class Employee{
    employeeId:number;
    employeeName:string;
    contactNo:string;
    emailId:string;
    deptId:number;
    password:string;
    gender:string;
    role:string;

    constructor(){
        this.employeeId=0;
        this.employeeName='';
        this.contactNo='';
        this.emailId='';
        this.deptId=0;
        this.password='';
        this.gender='';
        this.role='';
    }
}

export interface APIResponse{
    message:string,
    result:boolean,
    data:any
}

export interface ParentDepartment{
    deptId:number,
    departmentName:string,
    childDepartments: ChildDepartment[];
}

export interface ChildDepartment {
    childDeptId: number;
    parentDeptId: number;
    role: string;
}