import Cookies from 'js-cookie';

export const isAuthenticated = () => {

    let jwt = Cookies.get('access_token')

    if(jwt) {

        return jwt

    }

    return false

}