export interface IProduct {
    readonly id: string
    readonly brand: string
    readonly description: string
    readonly image: string
    readonly price: number
}

export interface IProductResumeByBrand {
    readonly brand: string
    readonly amount: number
}
