import React from 'react'
import { isAuthenticated } from '../../Helper/Helper'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ Child }) => {
    return (
        isAuthenticated() ? <Child /> : <Navigate to="/" />
    )
}

export default PrivateRoute