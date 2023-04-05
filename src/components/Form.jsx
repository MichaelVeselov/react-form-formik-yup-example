import { Formik, Form, Field, ErrorMessage, useField } from 'formik';

import * as Yup from 'yup';

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>

      <input {...props} {...field} />

      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <>
      <label className='checkbox'>
        <input type='checkbox' {...props} {...field} />
        {children}
      </label>

      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const DonationForm = () => {
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        amount: 0,
        currency: '',
        text: '',
        terms: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, 'The name field cannot be shorter than two characters.')
          .required('This field is required.'),

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
      })}
      onSubmit={(values) => console.log(JSON.stringify(values), null, 2)}
    >
      <Form className='form'>
        <h2>Send a donation</h2>

        <CustomTextInput
          label='Enter your name:'
          id='name'
          name='name'
          type='text'
          autoComplete='off'
        />

        <CustomTextInput
          label='Enter your email:'
          id='email'
          name='email'
          type='text'
          autoComplete='off'
        />

        <label htmlFor='amount'>Donation amount:</label>
        <Field id='amount' name='amount' type='number' autoComplete='off' />
        <ErrorMessage className='error' name='amount' component='div' />

        <label htmlFor='currency'>Select a currency:</label>
        <Field id='currency' name='currency' as='select'>
          <option value=''>Select a currency</option>
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
          <option value='GBP'>GBP</option>
        </Field>
        <ErrorMessage className='error' name='currency' component='div' />

        <label htmlFor='text'>Type your message:</label>
        <Field id='text' name='text' as='textarea' autoComplete='off' />
        <ErrorMessage className='error' name='text' component='div' />

        {/* <label className='checkbox'>
          <Field name='terms' type='checkbox' />
          Do you agree to the privacy policy?
        </label>
        <ErrorMessage className='error' name='terms' component='div' /> */}

        <CustomCheckBox name='terms'>
          Agree to the privacy policy?
        </CustomCheckBox>

        <button type='submit'>Send</button>
      </Form>
    </Formik>
  );
};

export default DonationForm;
