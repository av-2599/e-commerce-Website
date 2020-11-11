const BASE_URL = "http://localhost:4000";

const buildReqHeader = (type, data) => {
    return {
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ sessionStorage.getItem('token') }`
        },
        body: JSON.stringify(data)
    }
}

export const login = async data => {
    const response = await fetch(`${ BASE_URL }/login`, buildReqHeader('POST', data));
    const loginResponse = await response.json();
    sessionStorage.setItem('token', loginResponse.token);
    return { status: response.status, data: loginResponse};
}

export const register = async data => {
    const response = await fetch(`${ BASE_URL }/register`, buildReqHeader('POST', data));
    const registerResponse = await response.json();
    return registerResponse;
}

export const getProducts = async () => {
    const response = await fetch(`${ BASE_URL }/getProducts`, buildReqHeader('GET'));
    return await response.json();
}

export const addToCart = async data => {
    const response = await fetch(`${ BASE_URL }/addCart`, buildReqHeader('POST', data));
    return await response.json();
}

export const signout = () => {
    sessionStorage.removeItem('token');
}

export const getSpecificProduct = async productId => {
    const response = await fetch(`${ BASE_URL }/getProduct/${ productId }`, buildReqHeader('GET'));
    return await response.json();
}

export const getUserCart = async () => {
    const response = await fetch(`${ BASE_URL }/getCart`, buildReqHeader('GET'));
    return await response.json();
}
