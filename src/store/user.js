import Cookie from 'js-cookie'
export default {
    state: {
        token: '' 
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            Cookie.set('token', token)
        },
        clearToken(state) {
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state) {
            state.token = state.token || Cookie.get('token')
        }
    }
}