import { FC } from "react"
import { Product } from "../../types/Product"

interface ProductItemProps {
    product: Product
}

export const ProductItem:FC<ProductItemProps> = ({product}) => {
    return(
        <li>
            <p>{product.product}</p>
            <p>{product?.brand}</p>
            <p>{product.price}</p>
        </li>
    )
}