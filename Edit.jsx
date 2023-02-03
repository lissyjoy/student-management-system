import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get("http://localhost:3002/api/edit-student/" + id).then((response) => {
        console.log(response.data.response?.[0]);
        // let exDate = response.data.response?.[0]?.dob
        const date = new Date(response.data.response?.[0]?.dob);
        formik.setValues({
          "firstname": response.data.response?.[0]?.firstname,
          "lastname": response.data.response?.[0]?.lastname,
          "email": response.data.response?.[0]?.email,
          "dob": date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
          "education": response.data.response?.[0]?.education,
          "location": response.data.response?.[0]?.location,
          "about": response.data.response?.[0]?.about,
        });
      });
    }
  }, [])


  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      dob: '',
      email: '',
      education: '',
      location: '',
      about: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('This field is required'),
      lastname: Yup.string().required('This field is required'),
      dob: Yup.string().required('This field is required'),
      email: Yup.string().required('This field is required'),
      education: Yup.string().required('This field is required'),
      location: Yup.string().required('This field is required'),
      about: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = {
        firstname: values.firstname,
        lastname: values.lastname,
        dob: values.dob,
        email: values.email,
        education: values.education,
        location: values.location,
        about: values.about,
      };
      axios.put("http://localhost:3002/api/update-student/" + id, formData).then((response) => {
        // console.log(response)
        if (response?.data?.status == 200) {
          navigate('/')
        }
      });
    }
  });

  return (
    <>
      <header>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container d-flex justify-content-between">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              {/* <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx={12} cy={13} r={4} /></svg> */}
              <strong>Edit Student Details</strong>
            </Link>
          </div>
        </div>
      </header>
      <main role="main">
        <div className="album py-5">
          <div className="container">
            <div className="row">
              <div className='col-md-12'>
                <div className="col-md-12 order-md-1">
                  {/* <h4 className="mb-3">Billing address</h4> */}
                  <form onSubmit={formik.handleSubmit} method="POST">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" name="firstname" onChange={formik.handleChange} value={formik.values.firstname} onBlur={formik.handleBlur} />
                        {formik.touched.firstname || formik.errors.firstname ? <div className="text-danger">{formik.errors.firstname}</div> : null}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" className="form-control" name="lastname" onChange={formik.handleChange} value={formik.values.lastname} onBlur={formik.handleBlur} />
                        {formik.touched.lastname || formik.errors.lastname ? <div className="text-danger">{formik.errors.lastname}</div> : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">Email</label>
                        <input type="text" className="form-control" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} name="email" />
                        {formik.touched.email || formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">DOB</label>
                        <input type="date" className="form-control" name="dob" onChange={formik.handleChange} value={formik.values.dob} onBlur={formik.handleBlur} />
                        {formik.touched.dob || formik.errors.dob ? <div className="text-danger">{formik.errors.dob}</div> : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">Education</label>
                        <input type="text" className="form-control" onChange={formik.handleChange} value={formik.values.education} onBlur={formik.handleBlur} name="education" />
                        {formik.touched.education || formik.errors.education ? <div className="text-danger">{formik.errors.education}</div> : null}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Location</label>
                        <input type="text" className="form-control" name="location" onChange={formik.handleChange} value={formik.values.location} onBlur={formik.handleBlur} />
                        {formik.touched.location || formik.errors.location ? <div className="text-danger">{formik.errors.location}</div> : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="firstName">About</label>
                        <textarea type="text" className="form-control" onChange={formik.handleChange} value={formik.values.about} onBlur={formik.handleBlur} name="about"></textarea>
                        {formik.touched.about || formik.errors.about ? <div className="text-danger">{formik.errors.about}</div> : null}
                      </div>
                    </div>
                    <hr className="mb-4" />
                    <button type="submit" className="btn btn-primary btn-md btn-block" >Update</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Edit