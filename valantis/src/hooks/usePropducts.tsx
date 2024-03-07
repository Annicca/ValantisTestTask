import { useEffect, useState } from "react"
import { TProduct } from "../types/TProduct";
import { TFilter } from "../types/TFilter";
import { getIds, getFilter, getProducts } from "../utils/api";

export const useProducts = (page: number, filter: TFilter) => {
    const [products, setProducts] = useState<TProduct[]|null>(null)
    const [ids, setIds] = useState<string[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    const limit = 50

    const handleIds = (ids: string[] | null) => {
        setIds(ids)
    }

    const handleProducts = (products: TProduct[]|null) => {
        setProducts(products)
    }

    const handleLoading = (loading: boolean) => {
        setLoading(loading)
    }

    useEffect(() => {
        Object.keys(filter).length !== 0 ? getFilter(handleIds, handleLoading, filter, limit, page) : getIds(handleIds, handleLoading, limit, page)
    },[page, filter.brand, filter.price, filter.product])

    useEffect(() => {
        getProducts(handleProducts, handleLoading, ids)
    },[ids])

    return {products, loading}
}