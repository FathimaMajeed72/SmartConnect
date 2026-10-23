import type { BatchStatus } from "./batch.status";


export interface BatchListItem {
  id: string;
  name: string;
  classTeacherId: string;
  classTeacherName: string;
  capacity: number;
  status: BatchStatus;
}

export interface BatchDetails extends BatchListItem {
  classId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetBatchesResponse {
  batches: BatchListItem[];
}

export interface GetBatchResponse {
  batch: BatchDetails;
}

export interface CreateBatchRequest {
  name: string;
  classTeacherId: string;
  capacity: number;
}

export interface CreateBatchResponse {
  batchId: string;
}

export interface UpdateBatchRequest {
  name: string;
  classTeacherId: string;
  capacity: number;
}

export interface UpdateBatchResponse {
  batchId: string;
}

export interface UpdateBatchStatusRequest {
  status: BatchStatus;
}

export interface UpdateBatchStatusResponse {
  batchId: string;
  status: BatchStatus;
}

export interface AvailableClassTeacher {
  id: string;
  teacherId: string;
  firstName: string;
  lastName: string;
  email: string;
}