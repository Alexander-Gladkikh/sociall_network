import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {Field, Form, Formik, FormikHelpers} from "formik";
import {bool} from "yup";
import {useSelector} from "react-redux";
import {getFilterSearch} from "../../redux/users-selectors";

type SearchPropsType = {
  onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
  term: string
  friend: FriendFormType
}
export const SearchUsersForm: React.FC<SearchPropsType> = ({onFilterChanged}) => {

  const filter = useSelector(getFilterSearch)

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
        enableReinitialize
        initialValues={{term: filter.term, friend: String(filter.friend) as  FriendFormType}}
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