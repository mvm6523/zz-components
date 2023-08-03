import type { Ref } from 'vue'
import type { ShowType } from './schema-form'

export type FormContext = {
  formData: Ref
  setShowMap: (
    componentId: string,
    dataIndex: string | string[],
    type: ShowType
  ) => void
}
