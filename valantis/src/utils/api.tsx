import { TFilter } from "../types/TFilter"
import { TProduct } from "../types/TProduct"
import { instance } from "./axios"

export const getIds = async(handleIds: (ids: string[]|null)=> void, handleLoading: (loading: boolean) => void, limit: number, page: number) => {
    handleLoading(true)    
    await instance.post("",{
        "action": "get_ids",
        "params": {"limit": limit, "offset": limit*(page-1)}
    })
    .then((res) => {
        handleIds(res.data.result)
    })
    .catch((error => {
        if (error.response) {
            console.log("Ошибка получения идентификаторов: " + error.response.status)
            
            if(error.response.status == 500) {
                console.log("Повторный запрос на получение идентификаторов...")
                getIds(handleIds, handleLoading, limit, page)
            }
        }
    }))
}

export const getFilter = async(handleIds: (ids: string[]|null)=> void, handleLoading: (loading: boolean) => void, filter: TFilter, limit: number, page: number) => {
    handleLoading(true)  
    if(filter.price) {
        filter.price = Number(filter.price)
    }
    await instance.post("",{
        "action": "filter",
        "params": {...filter}
    })
    .then((res) => {
        handleIds(res.data.result.slice(limit*(page-1), limit*(page-1) + limit))
    })
    .catch((error => {
        if (error.response) {
            console.log("Ошибка фильтрации: " + error.response.status)
            if(error.response.status == 500) {
                console.log("Повторный запрос на фильтрацию...")
                getFilter(handleIds, handleLoading,filter, limit, page)
            }
        }
    }))
}

export const getProducts = async (handleProducts: (products: TProduct[]|null) => void, handleLoading: (loading: boolean) => void, ids: string[]|null) => {

    if(ids) {
        await instance.post("",{
            "action": "get_items",
            "params": {"ids": ids}
        })
        .then((res) => {
            if(res.data.result) {
                let uniqProducts = [...new Map(res.data.result.reverse().map((product: TProduct) => [product.id, product])).values()].reverse() as TProduct[]
                
                handleProducts(uniqProducts)
            }
            handleLoading(false)  
        })
        .catch((error => {
            if (error.response) {
                console.log("Ошибка получения идентификаторов: " + error.response.status)
                if(error.response.status == 500) {
                    console.log("Повторный запрос на получение товаров...")
                    getProducts(handleProducts, handleLoading, ids)
                }
            }
        }))

    }
}