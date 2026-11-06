import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class BatchHasAssignedStudentsError extends ApplicationError {
  constructor() {
    super(
       "This batch cannot be deactivated because students are still assigned to it. Please reassign or unassign all students first.",
      BatchErrorCode.BATCH_HAS_ASSIGNED_STUDENTS,
    );
  }
}