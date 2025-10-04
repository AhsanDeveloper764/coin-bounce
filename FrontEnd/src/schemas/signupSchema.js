import * as yup from "yup";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errorMessage = "use lowercase,upperCase and digits"

const SignUpSchema = yup.object().shape({
    name: yup.string().max(30).required('name is required'),
    username: yup.string().min(5).max(30).required('uername is required'),
    email: yup.string().email("enter a valid email").required('email is required'),
    password: yup.string().min(8).max(30).matches(passwordPattern,{message:errorMessage}).required("password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password')],"Password must be match").required('Confirmpassword is required'),
});

export default SignUpSchema;