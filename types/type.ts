export type TypeTransaction = {
  _id: string
  id: number
  username: string
  userid: string
  amount: string
  date: string // Ideally this should be a Date type, but whatever it's fine for this
  transaction_status: number
  vender: string
}