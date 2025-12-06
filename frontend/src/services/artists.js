import axios from "axios"
const baseUrl = '/api/artists'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log('Request:')
    console.log(request)
    return request.then(r => r.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(r => r.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(r => r.data)
}

export default {getAll, create, update}