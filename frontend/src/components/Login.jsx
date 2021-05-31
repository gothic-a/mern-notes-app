import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

const Login = () => {

    const formHandlerSubmit = (values) => {
        console.log(values)
    }

    const validationSchema = yup.object().shape({
        email: yup.string().typeError('must be string').required('email is required').email('email must be a valid'),
        password: yup.string().typeError('must be string').required('password is required').min(6).max(18)
    })

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validateOnBlur
        
            onSubmit={
                (values) => formHandlerSubmit(values)
            }
            validationSchema={validationSchema}
        >
            
            {
                ({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, setFieldTouched}) => (
                    <form className="form form-login" onSubmit={handleSubmit}>
                       
                       
                        <div className="form__field">
                            <label className="form__field-label" htmlFor="email">email:</label>
                            <input 
                                className={
                                    `form__field-input ${errors.email && touched.email && `form__field-input_invalid`}`
                                } 
                                type="text" 
                                id="email"
                                autoComplete="off"
                                formNoValidate

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
                            <label className="form__field-label" htmlFor="password">
                                password:
                            </label>
                            
                            <input 
                                className={
                                    `form__field-input ${ errors.password && touched.password && `form__field-input_invalid`}`
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
                        <button 
                            className="btn form__button" 
                            type="submit"
                        >
                            sign in
                        </button>
                    </form> 
                )
            }

        </Formik>
        
    )
}

export default Login