import { tesloApi } from "@/api/tesloApi"
import type { Producto } from "../interfaces/producto.interface"
import { getProductImageAction } from "./get-product-image-action";

export const getProductById = async (productId: string) => {
    try {
        const { data } = await tesloApi.get<Producto>(`/products/${productId}`);

        return {
            ...data,
            images: data.images.map(getProductImageAction)
        }


    } catch (error) {
        console.log(error)
        throw new Error(`Error getting prtoduct by id ${productId}`)



    }
}