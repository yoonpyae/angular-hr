export interface DepartmentModel {
  deptId: number;
  branchId: number;
  deptName: string;
  leaveGroupId: null;
  status: boolean;
  createdOn: null | string;
  createdBy: null | string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null | string;
  deletedBy: null | string;
  remark: null;
  branch: null;
  hrPositions: any[];
  leaveGroup: null;
}
