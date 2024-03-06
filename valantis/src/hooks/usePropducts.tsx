import { useEffect, useState } from "react"
import { instance } from "../utils/axios"
import { Product } from "../types/Product";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]|null>(null)
    const [ids, setIds] = useState<string[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    
    const getIds = async() => {
        await instance.post("",{
            "action": "get_ids",
            "params": {"limit": 50}
        })
        .then((res) => setIds(res.data.result))
        .catch((error => console.log("Ошибка получения идентификаторов: " + error.response.status)))
    }
    
    const getProducts = async () => {

        if(ids) {
            await instance.post("",{
                "action": "get_items",
                "params": {"ids": ids}
            })
            .then((res) => {
                if(res.data.result) {
                    let uniqProducts = [...new Map(res.data.result.map((product: Product) => [product.id, product])).values()] as Product[]
                    setProducts(uniqProducts)
                }
                setLoading(false)
            })
            .catch((error => console.log("Ошибка получения товаров: " + error.response.status)))

        }
    }

    useEffect(() => {
        getIds()
    },[])

    useEffect(() => {
        getProducts()
    },[ids])

    return {products, loading}
}