// Imports
import { Formik, FormikActions } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';

// Form Values
export interface SignUpFormValues {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;
}

// Prop Types
interface PropTypes {
    onSubmit: (
        values: SignUpFormValues,
        formikActions: FormikActions<SignUpFormValues>
    ) => void;
}

// Form Component
const SignUpForm: React.FC<PropTypes> = ({ onSubmit }) => {
    // Define initial values
    const initialValues: SignUpFormValues = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({
                errors,
                isSubmitting,
                touched,
                values,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
                <Form noValidate method="POST" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={values.firstName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isInvalid={touched.firstName && !!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={values.lastName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isInvalid={touched.lastName && !!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="email"
                            id="emailAddress"
                            name="emailAddress"
                            placeholder="Email Address"
                            value={values.emailAddress}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isInvalid={
                                touched.emailAddress && !!errors.emailAddress
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.emailAddress}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={values.confirmPassword}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isInvalid={
                                touched.confirmPassword &&
                                !!errors.confirmPassword
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Button
                            className="mr-3"
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Sign Up
                        </Button>
                        <LinkContainer exact to="/">
                            <Button variant="outline-primary">Cancel</Button>
                        </LinkContainer>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    );
};

// Export
export default SignUpForm;
