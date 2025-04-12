export class Employee{
    employeeId:number;
    employeeName:string;
    contactNumber:string;
    employeeEmailId:string;
    deptId:number;
    childDeptId:number;
    password:string;
    gender:string;
    role:string;

    constructor(){
        this.employeeId=0;
        this.employeeName='';
        this.contactNumber='';
        this.employeeEmailId='';
        this.deptId=0;
        this.childDeptId=0;
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
    departmentName:string
}

export interface ChildDepartment {
    childDeptId: number;
    parentDeptId: number;
    role: string;
}