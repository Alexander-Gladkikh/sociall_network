import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {Field, Form, Formik, FormikHelpers} from "formik";
import {bool} from "yup";

type SearchPropsType = {
  onFilterChanged: (filter: FilterType) => void
}

type FormType = {
  term: string
  friend: 'true' | 'false' | 'null'
}
export const SearchUsersForm: React.FC<SearchPropsType> = ({onFilterChanged}) => {

  const isValidateForm = (values: any) => {
    return {};
  }

  const onSubmitHandler = (values: FormType, {setSubmitting}: FormikHelpers<FormType>) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true'
    }
    onFilterChanged(filter)
    setSubmitting(false);
  }

  return (
    <div>
      <Formik
        initialValues={{term: '', friend: 'null' as FormType["friend"]}}
        validate={isValidateForm}
        onSubmit={onSubmitHandler}
      >
        {({isSubmitting}) => (
          <Form>
            <Field type="text" name="term"/>
            <Field name="friend" as='select'>
              <option value='null'>All</option>
              <option value='true'>Only followed</option>
              <option value='false'>Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find user
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};