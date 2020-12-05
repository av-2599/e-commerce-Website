const BASE_URL = "http://localhost:4000";

const buildReqHeader = (type, data) => {
    return {
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '',
            'Authorization': `Bearer ${ sessionStorage.getItem('token') }`
        },
        body: JSON.stringify(data)
    }
}

const callAPI = async (requestType, URI, data) => {
    const request = (requestType === 'GET') ? buildReqHeader(requestType) :
        buildReqHeader(requestType, data);
    const rawResponse = await fetch(URI, request);
    const response = await rawResponse.json();
    return { 
        status: rawResponse.status, 
        data: response 
    };
}

export const login = async data => {
    const response = await callAPI('POST', `${ BASE_URL }/login`, data);
    sessionStorage.setItem('token', response.data.token);
    return response;
}

export const register = async data => await callAPI('POST', `${ BASE_URL }/register`, data);

export const getProducts = async () => await callAPI('GET', `${ BASE_URL }/getProducts`);

export const addToCart = async data => await callAPI('POST', `${ BASE_URL }/addCart`, data);

export const signout = () => sessionStorage.removeItem('token');

export const getSpecificProduct = async productId => await callAPI('GET', `${ BASE_URL }/getProduct/${ productId }`);

export const getUserCart = async () => await callAPI('GET', `${ BASE_URL }/getCart`);

export const updateUserCart = async (cartId, data) => await callAPI('PATCH', `${ BASE_URL }/updateCart/${ cartId }`, data);
