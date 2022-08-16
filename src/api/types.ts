/** A single line item with a description and amount billed */
export interface InvoiceLineItem {
  id: string
  description: string

  /** Amount billed in cents */
  amount: number
}

/** A simple invoice containing any number of line items */
export interface Invoice {
  id: string
  lineItems: InvoiceLineItem[]
}

/** A project with a title and an invoice */
export interface Project {
  id: string
  title: string
  invoice: Invoice
}
