import { Observable } from 'rxjs';
import { RootModel } from './root.model';

export interface JobOpeningModel {
  id: number;
  title: string;
  description: string;
  noOfApplicants: number;
  startOn: null | string;
  endOn: null | string;
  companyId: string;
  branchId: number;
  deptId: number;
  positionId: number;
  openingStatus: boolean;
  createdOn: null | string;
  createdBy: null | string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null | string;
  deletedBy: null | string;
  remark: null | string;
}

export interface ViJobOpeningModel {
  map(arg0: (job: any) => Observable<RootModel>): unknown;
  length: number;
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
  deletedOn: null | string;
  deletedBy: null | string;
  remark: null | string;
}
