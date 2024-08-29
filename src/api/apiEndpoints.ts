// use BASEURL from .env file 
const baseUrl = process.env.REACT_APP_BASEURL;

const apiEndpoint = {
    login: () => [baseUrl, 'auth', 'login'].join('/'),
    register: () => [baseUrl, 'auth', 'register'].join('/'),
    logout: () => [baseUrl, 'auth', 'logout'].join('/'),
    verifyOtp: () => [baseUrl, 'auth', 'verifyOTP'].join('/'),
    requestPasswordReset: () => [baseUrl, 'auth', 'requestPasswordReset'].join('/'),
    resetPassword: () => [baseUrl, 'auth', 'resetPassword'].join('/'),
    orders: (route?: string) => {
        if (route) {
            return [baseUrl, 'orders', route].join('/');
        }
        return [baseUrl, 'orders'].join('/');
    },
    products: () => [baseUrl, 'products'].join('/'),
    singleProduct: (id : string) => [baseUrl, 'products', id].join('/'),
    newProduct: () => [baseUrl, 'products', 'new-product'].join('/'),
    deliveryAddress: () => [baseUrl, 'users', "address"].join('/'),
    singleDeliveryAddress: () => [baseUrl, 'users', "singleAddress"].join('/'),
    user: () => [baseUrl, 'users', "user"].join('/'),
    userLoggedIn: () => [baseUrl, 'users', "isLoggedIn"].join('/'),
    isLoggedIn: () => [baseUrl, 'auth', "isLoggedIn"].join('/'),

};

export default apiEndpoint;
