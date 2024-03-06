import { useEffect, useState } from "react"
import { instance } from "../utils/axios"
import { TProduct } from "../types/TProduct";

export const useProducts = (page: number) => {
    const [products, setProducts] = useState<TProduct[]|null>(null)
    const [ids, setIds] = useState<string[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    const limit = 50

    const getIds = async() => {
        await instance.post("",{
            "action": "get_ids",
            "params": {"limit": limit, "offset": limit*(page-1)}
        })
        .then((res) => {
            setIds(res.data.result)
        })
        .catch((error => {
            if (error.response) {
                console.log("Ошибка получения идентификаторов: " + error.response.status)
            }
        }))
    }
    
    const getProducts = async () => {

        if(ids) {
            await instance.post("",{
                "action": "get_items",
                "params": {"ids": ids}
            })
            .then((res) => {
                if(res.data.result) {
                    let uniqProducts = [...new Map(res.data.result.map((product: TProduct) => [product.id, product])).values()] as TProduct[]
                    setProducts(uniqProducts)
                }
                setLoading(false)
            })
            .catch((error => {
                if (error.response) {
                    console.log("Ошибка получения идентификаторов: " + error.response.status)
                }
            }))

        }
    }

    useEffect(() => {
        getIds()
    },[page])

    useEffect(() => {
        getProducts()
    },[ids])

    return {products, loading}
}