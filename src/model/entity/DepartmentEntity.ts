import { BaseEntity } from '@/base/BaseEntity'
import { ITree } from '@/airpower/interface/ITree'
import { IsArray, Type } from '@/airpower/decorator/Custom'

/**
 * # 部门实体
 * @author Hamm
 */
export class DepartmentEntity extends BaseEntity implements ITree {
  name!: string

  /**
   * # 下级部门
   */
  // eslint-disable-next-line no-use-before-define
  @Type(DepartmentEntity)
  @IsArray() children: this[] = []
}
