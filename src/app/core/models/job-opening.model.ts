export interface ViJobOpeningModel {
  id: number;
  title: string;
  description: string;
  noOfApplicants: number;
  startOn: null | string;
  endOn: null | string;
  companyId: string;
  companyName: string;
  branchId: number;
  branchName: string;
  deptId: number;
  deptName: string;
  positionId: number;
  positionName: string;
  openingStatus: boolean;
  createdOn: null | string;
  createdBy: null | string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null;
  deletedBy: null;
  remark: null;
}
