import uuid4 from "uuid4"

export interface IExpense {
    id: string
    title: string,
    price: number,
    category: string
}
