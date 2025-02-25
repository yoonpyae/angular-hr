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
}
