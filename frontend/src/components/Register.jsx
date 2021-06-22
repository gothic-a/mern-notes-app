import { Formik } from 'formik'
import * as yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../actions/userActions'

import Loader from './Loader'
import Message from './Message'

const Register = () => {

    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.userRegister)

    const formHandlerSubmit = (values) => {
        dispatch(userRegister(values))
    }

    const validationSchema = yup.object().shape({
        email: yup.string().typeError('must be a string').required('email is required').email('email must be a valid'), 
        name: yup.string().typeError('must be a string').required('name is required').min(3, 'at least 3 characters').max(24, 'at least 24 characters'),
        password: yup.string().typeError('must be a string').required('password is required').min(6, 'at least 6 characters').max(18, 'at most 18 characters'),
        confirmPassword: yup.string().typeError('must be a string').oneOf([yup.ref('password')], 'passwords missmatch').required('confirm your password')
    })

    return (
        <>
            { 
                error && <Message type="danger">{error}</Message>
            }
            <Formik
                initialValues={{
                    email: '',
                    name: '',
                    password: '',
                    confirmPassword: '',
                }}
                validateOnBlur
                onSubmit={(values) => formHandlerSubmit(values)}

                validationSchema={validationSchema}
            >
                {
                    ({values, errors, touched, setFieldTouched, handleChange, handleSubmit, handleBlur}) => (

                        <form className="form form-register" onSubmit={handleSubmit}>
                            <div className="form__field">
                                <label className="form__field-label" htmlFor="email">email:</label>
                                <input 
                                    className={
                                        `form__field-input ${ errors.email && touched.email && 'form__field-input_invalid' }`
                                    } 
                                    type="text"
                                    id="email"
                                    autoComplete="off"

                                    name="email"
                                    value={values.email}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setFieldTouched('email', false)
                                    }}
                                    onBlur={handleBlur}
                                />
                                {
                                    errors.email 
                                    && touched.email 
                                    && <span className="form__field-validation-error">{errors.email}</span>
                                }
                            </div>
                            <div className="form__field">
                                <label className="form__field-label" htmlFor="name">name:</label>
                                <input 
                                    className={
                                        `form__field-input ${ errors.name && touched.name && 'form__field-input_invalid' }`
                                    } 
                                    type="text"
                                    id="name"
                                    autoComplete="off"

                                    name="name"
                                    value={values.name}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setFieldTouched('name', false)
                                    }}
                                    onBlur={handleBlur}
                                />
                                {
                                    errors.name 
                                    && touched.name 
                                    && <span className="form__field-validation-error">{errors.name}</span>
                                }
                            </div>
                            <div className="form__field">
                                <label className="form__field-label" htmlFor="password">password:</label>
                                <input 
                                    className={
                                        `form__field-input ${errors.password && touched.password && 'form__field-input_invalid'}` 
                                    }
                                    type="password" 
                                    id="password"
                                    autoComplete="off"

                                    name="password"
                                    value={values.password}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setFieldTouched('password', false)
                                    }}
                                    onBlur={handleBlur}
                                />
                                {
                                    errors.password 
                                    && touched.password 
                                    && <span className="form__field-validation-error">{errors.password}</span>
                                }
                            </div>
                            <div className="form__field">
                                <label className="form__field-label" htmlFor="confirmPassword">confirm password:</label>
                                <input 
                                    className={
                                        `form__field-input ${errors.confirmPassword && touched.confirmPassword && 'form__field-input_invalid'}` 
                                    }
                                    type="password" 
                                    id="confirmPassword"
                                    autoComplete="off"

                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setFieldTouched('confirmPassword', false)
                                    }}
                                    onBlur={handleBlur}
                                />
                                {
                                    errors.confirmPassword 
                                    && touched.confirmPassword 
                                    && <span className="form__field-validation-error">{errors.confirmPassword}</span>
                                }
                            </div>
                            <button 
                                className="btn form__button" 
                                type="submit"
                                disabled={loading}
                            >
                                join
                                {
                                    loading && <Loader />
                                }
                            </button>
                        </form>
                    )
                }
            </Formik>
        </>
    )
}

export default Register