import { axiosClient } from "./axiosClient"

export const getById = id => axiosClient.get(`/recipes/${id}`)

export const create = data => axiosClient.post("/recipes", data)

export const update = data => axiosClient.put(`/recipes/${data._id}`, data)

export const remove = id => axiosClient.delete(`/recipes/${id}`)
