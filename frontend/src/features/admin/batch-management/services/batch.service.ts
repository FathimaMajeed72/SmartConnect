import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type {
  CreateBatchRequest,
  CreateBatchResponse,
  GetBatchResponse,
  GetBatchesResponse,
  UpdateBatchRequest,
  UpdateBatchResponse,
  UpdateBatchStatusRequest,
  UpdateBatchStatusResponse,
} from "@/features/admin/batch-management/types/batch.type";

export const getBatches = async (
  classId: string,
): Promise<GetBatchesResponse> => {
  const response = await api.get(
    `${API_ROUTES.ADMIN.CLASSES}/${classId}/batches`,
  );

  return response.data.data;
};

export const getBatchById = async (
  classId: string,
  batchId: string,
): Promise<GetBatchResponse> => {
  const response = await api.get(
    `${API_ROUTES.ADMIN.CLASSES}/${classId}/batches/${batchId}`,
  );

  return response.data.data;
};

export const createBatch = async (
  classId: string,
  data: CreateBatchRequest,
): Promise<CreateBatchResponse> => {
  const response = await api.post(
    `${API_ROUTES.ADMIN.CLASSES}/${classId}/batches`,
    data,
  );

  return response.data.data;
};

export const updateBatch = async (
  classId: string,
  batchId: string,
  data: UpdateBatchRequest,
): Promise<UpdateBatchResponse> => {
  const response = await api.patch(
    `${API_ROUTES.ADMIN.CLASSES}/${classId}/batches/${batchId}`,
    data,
  );

  return response.data.data;
};

export const updateBatchStatus = async (
  classId: string,
  batchId: string,
  data: UpdateBatchStatusRequest,
): Promise<UpdateBatchStatusResponse> => {
  const response = await api.patch(
    `${API_ROUTES.ADMIN.CLASSES}/${classId}/batches/${batchId}/status`,
    data,
  );

  return response.data.data;
};