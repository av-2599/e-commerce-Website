import { GET, POST, PATCH, DELETE } from './requestType';
import { setToken, getToken } from './token';

const BASE_URL = "http://localhost:4000";

const buildReqHeader = (type, data) => {
    return {
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '',
            'Authorization': `Bearer ${ getToken() }`
        },
        body: JSON.stringify(data)
    }
}

const callAPI = async (requestType, endpoint, data) => {
    let request;
    if (requestType === GET || requestType === DELETE)
        request = buildReqHeader(requestType);
    else
        request = buildReqHeader(requestType, data);
    // const request = (requestType === GET) ? buildReqHeader(requestType) :
    //     buildReqHeader(requestType, data);
    const rawResponse = await fetch(BASE_URL + endpoint, request);
    const response = await rawResponse.json();
    return {
        status: rawResponse.status,
        data: response
    };
}

/**
 * POST REQUEST
 */

export const login = async data => {
    const response = await callAPI(POST, `/login`, data);
    setToken(response.data.token);
    return response;
}
export const register = async data => await callAPI(POST, `/register`, data);
export const addToCart = async data => await callAPI(POST, `/addCart`, data);
export const searchProduct = async data => await callAPI(POST, `/searchProduct`, data);
export const addProduct = async data => await callAPI(POST, `/addProduct/`, data);
export const getUser = async data => await callAPI(POST, `/getUser`, data);

/**
 * GET REQUEST
 */

export const getProducts = async () => await callAPI(GET, `/getProducts`);
export const getSpecificProduct = async productId => await callAPI(GET, `/getProduct/${ productId }`);
export const getUserCart = async () => await callAPI(GET, `/getCart`);
export const checkout = async () => await callAPI(GET, `/checkout`);
export const getOrders = async () => await callAPI(GET, `/getOrders`);

/**
 * PATCH REQUEST
 */

export const updateUserCart = async (cartId, data) => await callAPI(PATCH, `/updateCart/${ cartId }`, data);

/**
 * DELETE REQUEST
 */

 export const deleteUserCart = async cartId => await callAPI(DELETE, `/deleteCart/${ cartId }`);