import * as yup from "yup";

export const validationSchema = yup.object().shape({
    title: yup.string().min(5, "Must be more than 5 characters").required("Title is required"),
    description: yup.string().min(5, "Must be more than 5 characters").required("Description is required"),
    price: yup.number().positive("Must be more than 0")
        .required("This field is required"),
    });
    


