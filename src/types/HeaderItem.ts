export type HeaderItem = Readonly<{
  title: string
  key: object | string
  value?: string | Function
  sortable?: boolean
}>
