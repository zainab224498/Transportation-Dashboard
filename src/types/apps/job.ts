export type JobsType = {
  id: number
  name: string
}

export type JobsAttributesCategoriesType = {
  id: number
  title: string
}

export type JobsAttributesType = {
  id: number
  job_id: number
  attribute_id: number
  attribute_value_id: number
}

export type AttributeValuesType = {
  id: number
  title: string
  category_id: number
}

export type AttributesType = {
  id: number
  title: string
  category: string
  type: string
  status: string
}
