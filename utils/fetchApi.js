import axios from 'axios'

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url, method, body, params) => {
    const { data } = await axios.get(url, {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '059025d7a4mshc1b31a2e2008973p1f8ad5jsn4d4b1eb82663'
        },
        params
    })

    return data

}