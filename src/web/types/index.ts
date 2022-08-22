export type LineItemData = {
  id: string
  description: string
  amount: string
}

export type LineItem = {
  id: string
  description: string
  amount: number
}

export type Invoice = {
  id: string
  lineItems: LineItem[]
}

export type Project = {
  id: string
  title: string
  invoice: Invoice
}
