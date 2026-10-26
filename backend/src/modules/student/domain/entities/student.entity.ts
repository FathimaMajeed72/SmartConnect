import { IBaseEntity } from "../../../../shared/domain/entities/base.entity";
import { Gender } from "../enums/gender.enum";
import { StudentStatus } from "../enums/student-status.enum";

export interface StudentEntity extends IBaseEntity {
admissionNumber: string;
firstName: string;
lastName: string;
dateOfBirth: Date;
gender: Gender;
profileImage?: string;
status: StudentStatus;
createdAt: Date;
updatedAt: Date;
}
