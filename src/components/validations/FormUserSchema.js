import * as yup from "yup";

export const validationSchema = yup.object().shape({
    firstName: yup.string().min(5, "Must be more than 5 characters"),
    lastName: yup.string().min(3, "Must be more than 3 characters"),
    email: yup.string().email("Must be a proper email"),
    phone: yup.number().min(9, "Must be more than 9 characters"),
    address: yup.string().min(5, "Must be more than 9 characters"),
    city: yup.string().min(3, "Must be more than 3 characters"),
    postalCode: yup.string().min(4, "Must be more than 5 characters"),
    
});