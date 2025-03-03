export interface AllowanceModel {
  allowanceId: number;
  companyId: string;
  branchId: number;
  deptId: number;
  positionId: number;
  allowanceName: string;
  description: null | string;
  status: boolean;
  createdOn: null | string;
  createdBy: null | string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: string | null;
  deletedBy: null | string;
  remark: null | string;
  // phoneNumber: string;
  // email: string;
  // password: string;
}

export interface ViAllowanceModel {
  allowanceId: number;
  allowanceName: string;
  companyId: string;
  companyName: string;
  branchId: number;
  branchName: string;
  deptId: number;
  deptName: string;
  positionId: number;
  positionName: string;
  description: string;
  status: boolean;
  createdOn: string;
  createdBy: string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null;
  deletedBy: null | string;
  remark: null | string;
}
