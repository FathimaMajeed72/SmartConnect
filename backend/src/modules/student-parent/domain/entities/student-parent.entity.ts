import { IBaseEntity } from "../../../../shared/domain/entities/base.entity"; 
import { StudentParentRelationship } from "../enums/student-parent-relationship.enum";
import { StudentParentStatus } from "../enums/student-parent-status.enum";

export interface StudentParentEntity extends IBaseEntity {
studentId: string;
parentUserId: string;
relationship: StudentParentRelationship;
isPrimaryContact: boolean;
status: StudentParentStatus;
createdAt: Date;
updatedAt: Date;
}
