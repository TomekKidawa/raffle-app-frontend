// import React, { useState, useEffect } from "react";
// import FileBase from 'react-file-base64';
// import productService from "../services/productService";
// import { useSelector } from "react-redux";
// import categoryService from '../services/categoryService';

// // import EventBus from "../common/EventBus";

// //time picker mui
// import dayjs from 'dayjs';
// import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// import { validationSchema } from '../components/validations/ProductValidation'
// import { useFormik } from "formik";


// const initialProductState ={
//     _id: null,
//     title:"",
//     description:"",
//     price:"",
//     imageFile:"",
//     creator:"",
//     isEnable:"",
//     raffleTime: dayjs('2024-01-01'),
// }

// const BoardModeratorTest = () => {
  
//   const {user} = useSelector((state) => ({...state.auth}));
//   const [currentProduct, setCurrentProduct] = useState(initialProductState);
//   const [category, setCategory] = useState("");
//   // const [submitted, setSubmitted] = useState(false);

//   //mui date picker
//   // const [timeValue, setTimeValue] = useState(dayjs('2022-04-07'));

//   const [message, setMessage] = useState("");
//   const [temporaryMessage, setTemporaryMessage] = useState("")
//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     setCurrentProduct({ ...currentProduct, [name]: value });
//   };
  


//   const formik = useFormik({
//     initialValues: currentProduct,
//     validationSchema,
//     // validateOnChange: false,
//     // validateOnBlur: false,
//     onSubmit : (data) => {
//         console.log(JSON.stringify(data, null, 2));

//         saveProduct()
//       },
        
//   });

//   const saveProduct = () => {
//    // e.preventDefault();
//     var data = {
//       title: formik.values.title,
//       description: formik.values.description,
//       imageFile: currentProduct.imageFile,
//       creator: user.username,
//       price: formik.values.price,
//       raffleTime : currentProduct.raffleTime,
//       category:[currentProduct.category],
//     };

//     productService.addProduct(data)
//     .then(response => {
//       setCurrentProduct({
//         id: response.data.id,
//         title: response.data.title,
//         description: response.data.description,
//         creator: user.username,
//         imageFile: response.data.imageFile,
//         price: response.data.price,
//         raffleTime : response.data.raffleTime,
//         category:[response.data.category],
//       });
//       // setSubmitted(true);
//       setTemporaryMessage("pomyślnie dodano nowy produkt");
//       console.log(response.data);
//     })
//     .catch(e => {
//       console.log(e);
//     });
// };

//   const getCategory= () => {
//     categoryService.findAll()
//       .then(response => {
//         setCategory(response.data);
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };

//   useEffect(() => {
//     getCategory();
//   }, []);
  

//   return (    
//     <div className="container">   
//         {/* <h3>{content}</h3> */}
//         <h4>Add Product</h4>
//         <h6>logged as: {user.username}</h6>

//         <form onSubmit = {formik.handleSubmit} style={{marginBottom:"40px"}}>
        
//             {currentProduct.imageFile=="" ? (<></> ):(<img src={currentProduct.imageFile} alt="add photo" width="300px"></img>)}
//             <label htmlFor="title">select photoFile:</label>
//             <FileBase type="file" multiple={false} onDone={(({base64}) => 
//                 setCurrentProduct({...currentProduct, imageFile:base64}))}
//             />

//             <div className="form-group" >
//                 <label>title:</label>
//               <input 
//                 placeholder='title'
//                 type="text"
//                 name='title'
//                 value={formik.values.title}
//                 onChange={formik.handleChange}
//                 className={
//                     'form-control' +
//                     (formik.errors.title && formik.touched.title
//                       ? ' is-invalid'
//                       : '')
//                   }
//                 />
//                 <div className="text-danger" style={{marginTop:"-15px"}}>
//                 <small>{formik.errors.title && formik.touched.title
//                     ? formik.errors.title
//                     : null}</small> 
//                 </div>
//             </div>
//             <div className="row">

//             <div className="form-group">
                    
//                 <label >description:</label>
//                 <textarea 
//                     style={{height: "120px"}}
//                     placeholder='description'
//                     type="text"
//                     id="description"
//                     name='description'
                    
//                     className={
//                         'form-control' +
//                         (formik.errors.description && formik.touched.description
//                         ? ' is-invalid'
//                         : '')
//                     }
//                     value={formik.values.description}
//                     onChange={formik.handleChange}
//                     />
//                     <div className="text-danger" style={{marginTop:"-15px"}}>
//                     <small>{formik.errors.description && formik.touched.description
//                         ? formik.errors.description
//                         : null}</small> 
//                     </div>
//             </div>
//             </div>
//               <div className="row">
//                 <div className="col">
//                     <label htmlFor="title">price:</label>
//                     <div className="input-group">
//                       <div class="input-group-prepend">
//                         <span class="input-group-text">$</span>
//                       </div>
//                       <input 
//                         placeholder='00.00'
//                         type="text"
//                         id="price"
//                         name='price'
//                         value={formik.values.price}
//                         onChange={formik.handleChange}
//                         className={
//                             'form-control' +
//                             (formik.errors.price && formik.touched.price
//                               ? ' is-invalid'
//                               : '')
//                           }
//                       />
                    
//                     </div>
//                     <div className="text-danger" >
//                         <small>{formik.errors.price && formik.touched.price
//                             ? formik.errors.price
//                             : null}</small> 
//                         </div>
//                 </div>

//                 <div className="col">
//                   <label htmlFor="category">category select</label>
//                   <select  class="custom-select" id="category" name="category" value={currentProduct.category} onChange={handleInputChange}>
//                   {category && category.map((category, index) => 
//                       <option key={index} name="category" value={category._id}>{category.name}</option>
//                   )}
//                   </select>
//                 </div>
//               </div>
            
            
//            <div className="col" style={{paddingLeft:"0px"}}>
//               <label>select raffle date:</label>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateTimePicker
//                   renderInput={(props) => <TextField {...props} />}
//                   label="Select Date"
//                   type="date"
//                   id="raffleTime"
//                   name='raffleTime'
//                   value={currentProduct.raffleTime}
//                   onChange={value => handleInputChange({ target: { value: value, name: 'raffleTime' } })}
//                 />
//               </LocalizationProvider>
//              {/* {currentProduct.raffleTime.toString()} */}
//             </div>
            
//             <br/>
//               {/* <MDBBtn  className='mx-2' style={{width:"20%"}} classname="mt-2" color="danger" OnClick={handleClear}>clear</MDBBtn> */}
//               <button  type="submit" className="btn btn-primary" style={{width:"20%"}}>submit</button>
//               <button
//                 type="button"
//                 className="btn btn-warning float-right"
//                 onClick={formik.handleReset}
//                 >
//                 Reset
//             </button>
//           </form>
          
        
//         {temporaryMessage}
//     </div>
//   );
// };

// export default BoardModeratorTest;







import React, { useState, useEffect } from "react";
import { MDBValidation, MDBBtn } from "mdb-react-ui-kit"
import FileBase from 'react-file-base64';
import productService from "../services/productService";
import { useSelector } from "react-redux";
import categoryService from '../services/categoryService';

// import EventBus from "../common/EventBus";

//time picker mui
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const BoardModeratorTest = () => {


  const initialProductState ={
      _id: null,
      title:"",
      description:"",
      price:"",
      imageFile:"",
      creator:"",
      isEnable:"",
      raffleTime: dayjs('2022-01-01'),
  }

  const {user} = useSelector((state) => ({...state.auth}));
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [category, setCategory] = useState("");
  // const [submitted, setSubmitted] = useState(false);

  //mui date picker
  // const [timeValue, setTimeValue] = useState(dayjs('2022-04-07'));

  const [message, setMessage] = useState("");
  const [temporaryMessage, setTemporaryMessage] = useState("")

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };
  


  const saveProduct = (e) => {
    e.preventDefault();
    var data = {
      title: currentProduct.title,
      description: currentProduct.description,
      imageFile: currentProduct.imageFile,
      creator: user.username,
      price: currentProduct.price,
      raffleTime : currentProduct.raffleTime,
      category:[currentProduct.category],
    };

    productService.addProduct(data)
    .then(response => {
      setCurrentProduct({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        creator: user.username,
        imageFile: response.data.imageFile,
        price: response.data.price,
        raffleTime : response.data.raffleTime,
        category:[response.data.category],
      });
      // setSubmitted(true);
      setTemporaryMessage("pomyślnie dodano nowy produkt");
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
};

  const getCategory= () => {
    categoryService.findAll()
      .then(response => {
        setCategory(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  // const handleClear = () =>{
  //   setCurrentProduct({
  //     title:"",
  //     description:"",
  //     imageFile:"",
  //     isEnable:"",
  //     likeCount:0})
  // };


  

  return (
    <div className="container">
        {/* <h3>{content}</h3> */}
        <h4>Add Product</h4>
        <h6>logged as: {user.username}</h6>
        {currentProduct.imageFile=="" ? (<></> ):(<img src={currentProduct.imageFile} alt="add photo" width="300px"></img>)}
        <label htmlFor="title">select photoFile:</label>
          <FileBase type="file" multiple={false} onDone={(({base64}) => 
            setCurrentProduct({...currentProduct, imageFile:base64}))}
          />
        
          <form onSubmit={saveProduct} classname="row g-3" noValidate style={{marginBottom:"40px"}}>
            <label htmlFor="title">title:</label>
              <input 
                placeholder='title'
                type="text"
                id="title"
                name='title'
                value={currentProduct.title}
                onChange={handleInputChange}
                className='form-control'
                required
                invalid
                validation="Please enter title"
              />
            <label htmlFor="title">description:</label>
              <textarea 
                placeholder='description'
                type="text"
                style={{height: "120px"}}
                id="description"
                name='description'
                value={currentProduct.description}
                onChange={handleInputChange}
                className='form-control'
                required
                invalid
                validation="Please enter description"
              />

              <div className="row">
                <div className="col">
                    <label htmlFor="title">price:</label>
                    <div className="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                      </div>
                      <input 
                        placeholder='00.00'
                        type="text"
                        id="price"
                        name='price'
                        value={currentProduct.price}
                        onChange={handleInputChange}
                        className='form-control'
                        required
                        invalid
                        validation="Please enter price"
                      />
                    </div>
                </div>
                <div className="col">
                  <label htmlFor="category">category select</label>
                  <select  class="custom-select" id="category" name="category" value={currentProduct.category} onChange={handleInputChange}>
                  {category && category.map((category, index) => 
                      <option key={index} name="category" value={category._id}>{category.name}</option>
                  )}
                  </select>
                </div>
              </div>

           <div className="col" style={{paddingLeft:"0px"}}>
              <label htmlFor="title">select raffle date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Select Date"
                  type="date"
                  id="raffleTime"
                  name='raffleTime'
                  value={currentProduct.raffleTime}
                  onChange={value => handleInputChange({ target: { value: value, name: 'raffleTime' } })}
                />
              </LocalizationProvider>
             {/* {currentProduct.raffleTime.toString()} */}
            </div>
            
            <br/>
            
              
              {/* <MDBBtn  className='mx-2' style={{width:"20%"}} classname="mt-2" color="danger" OnClick={handleClear}>clear</MDBBtn> */}
              <MDBBtn  className='mx-2' style={{width:"20%"}}>submit</MDBBtn>
          </form>
          
        
        {temporaryMessage}
    </div>
  );
};

export default BoardModeratorTest;