import { tesloApi } from "@/api/tesloApi";

import { getProductImageAction } from "./get-product-image-action";
import type { Producto } from "../interfaces/producto.interface";

export const getProductsActions = async (page: number = 1, limit: number = 10) => {
    try {
        const { data } = await tesloApi.get<Producto[]>(
            `/products?limit=${limit}&offset=${page * limit}`,
        );

        return data.map(product => ({
            ...product,
            images: product.images.map(getProductImageAction),
        }));
    } catch (error) {
        console.log(error);
        throw new Error('Error getting prroducts')
    }
}