export interface DeductionModel {
  deductionId: number;
  companyId: string;
  branchId: number;
  deptId: number;
  deductionName: string;
  description: string;
  isDefault: boolean;
  status: boolean;
  createdOn: null | string;
  createdBy: null | string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null | string;
  deletedBy: null | string;
  remark: null | string;
}

export interface ViDeductionModel {
  deductionId: number;
  deductionName: string;
  companyId: string;
  companyName: string;
  branchId: number;
  branchName: string;
  deptId: number;
  deptName: string;
  description: string;
  isDefault: boolean;
  status: boolean;
  createdOn: null | string;
  createdBy: null | string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null | string;
  deletedBy: null | string;
  remark: null;
}
