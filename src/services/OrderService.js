import { OrderApi } from "../api/OrderApi";


export const OrderService = {
    mapOrders : (data) => {
        return data.map(order => ({
            orderId: order.orderId,
            code: order.code,
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt,

            items: order.items.map(item => ({
                productId: item.productId,
                productName: item.productName,
                price: item.basePrice, 
                quantity: item.quantity,
                total: item.totalPrice,  
                options: item.options || ""
            }))
        }));
    },

    create: async (params) => {
        const res = await OrderApi.create(params);
        return res.result;
    },

    update: async (params) => {
        const res = await OrderApi.update(params);
        return res.result;
    },

    fetchAll: async () => {
        const res = await OrderApi.fetchAll();
        return OrderService.mapOrders(res.result);
    },
};