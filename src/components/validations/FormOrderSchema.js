import * as yup from "yup";

export const validationSchema = yup.object().shape({
    firstName: yup.string().min(5, "Must be more than 5 characters").required("firstName is required"),
    lastName: yup.string().min(3, "Must be more than 3 characters").required("lastName is required"),
    email: yup.string().email("Must be a proper email").required("email is required"),
    phone: yup.number().min(9, "Must be more than 9 characters").required("phone is required"),
    address: yup.string().min(5, "Must be more than 9 characters").required("address is required"),
    city: yup.string().min(3, "Must be more than 3 characters").required("city is required"),
    postalCode: yup.string().min(4, "Must be more than 5 characters").required("postalCode is required"),
    
});