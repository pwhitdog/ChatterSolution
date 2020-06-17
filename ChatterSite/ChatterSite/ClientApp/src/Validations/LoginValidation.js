import * as yup from "yup";

const loginValidationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup
        .string()
        .required('Please Enter your password'),
});

export default loginValidationSchema