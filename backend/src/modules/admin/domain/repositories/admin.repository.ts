import { GetParentsQuery } from "../../application/types/get-parents-query.type";
import { PaginatedParents } from "../../application/types/get-parents-response.type";
import { GetTeachersQuery } from "../../application/types/get-teachers-query.type";
import { PaginatedTeachers } from "../../application/types/get-teachers-response.type";
import { TeacherDetails } from "../../application/types/get-teacher-response.type";
import { ParentDetails } from "../../application/types/get-parent-response.type";

export interface IAdminRepository {
  getParents(query: GetParentsQuery): Promise<PaginatedParents>;

  getParentById(id: string): Promise<ParentDetails | null>;

  getTeachers(query: GetTeachersQuery): Promise<PaginatedTeachers>;

  getTeacherById(id: string): Promise<TeacherDetails | null>;
}
