import { ClassName, FieldName } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'

@ClassName('供应商')
export class SupplierEntity extends BaseEntity {
  /**
   * # 供应商编码
   */
  @TableField({
    copyField: true,
    forceShow: true,
    orderNumber: 99,
  })
  @FormField({
    orderNumber: 99,
    requiredString: true,
  })
  @FieldName('供应商编码') code!: string

  /**
   * # 供应商名称
   */
  @TableField({
    forceShow: true,
  })
  @FormField({
    orderNumber: 98,
    requiredString: true,
  })
  @FieldName('供应商名称') name!: string

  /**
   * # 联系电话
   */
  @TableField()
  @FormField({
    mobilePhone: true,
  })
  @FieldName('联系电话') phone!: string
}
