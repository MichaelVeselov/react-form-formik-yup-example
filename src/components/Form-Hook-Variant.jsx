import { useFormik } from 'formik';

import * as Yup from 'yup';

const Form = () => {
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      amount: 0,
      currency: '',
      text: '',
      terms: false,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'The name field cannot be shorter than two characters.')
        .required('This field is required.'),

      /*   email: Yup.string()
        .email('Invaild email address.')
        .required('This field is required.'), */

      email: Yup.string()
        .matches(EMAIL_REGEX, {
          message: 'Invalid email address',
        })
        .required('This field is required.'),

      amount: Yup.number()
        .min(5, 'The donation amount cannot be less than 5.')
        .required('This field is required.'),

      currency: Yup.string().required('Select a currency...'),

      text: Yup.string().min(
        10,
        'The text field cannot be shorter than ten characters.'
      ),

      terms: Yup.boolean()
        .required('Your consent is required.')
        .oneOf([true], 'Your consent is required.'),
    }),
    onSubmit: (values) => console.log(JSON.stringify(values), null, 2),
  });

  return (
    <form className='form' onSubmit={formik.handleSubmit} autoComplete='off'>
      <h2>Send a donation</h2>
      <label htmlFor='name'>Enter your name:</label>
      <input
        id='name'
        name='name'
        type='text'
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.name && formik.touched.name ? (
        <div className='error'>{formik.errors.name}</div>
      ) : null}
      <label htmlFor='email'>Enter your email:</label>
      <input
        id='email'
        name='email'
        type='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email ? (
        <div className='error'>{formik.errors.email}</div>
      ) : null}
      <label htmlFor='amount'>Donation amount:</label>
      <input
        id='amount'
        name='amount'
        type='number'
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.amount && formik.touched.amount ? (
        <div className='error'>{formik.errors.amount}</div>
      ) : null}
      <label htmlFor='currency'>Select a currency:</label>
      <select
        id='currency'
        name='currency'
        value={formik.values.currency}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value=''>Select a currency</option>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='GBP'>GBP</option>
      </select>
      {formik.errors.currency && formik.touched.currency ? (
        <div className='error'>{formik.errors.currency}</div>
      ) : null}
      <label htmlFor='text'>Type your message:</label>
      <textarea
        id='text'
        name='text'
        value={formik.values.text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.text && formik.touched.text ? (
        <div className='error'>{formik.errors.text}</div>
      ) : null}
      <label className='checkbox'>
        <input
          name='terms'
          type='checkbox'
          value={formik.values.terms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        Do you agree to the privacy policy?
      </label>
      {formik.errors.terms && formik.touched.terms ? (
        <div className='error'>{formik.errors.terms}</div>
      ) : null}
      <button type='submit'>Send</button>
    </form>
  );
};

export default Form;
