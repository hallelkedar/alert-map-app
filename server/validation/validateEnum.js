import { errorThrowing } from "../utils/errorThrowing.js"

export const validateEnum = (key, value, arr) => {
    if (!arr.includes(value.trim().toLowerCase())) errorThrowing(`Invalid ${key} - ${value} not in list`, 400)
}