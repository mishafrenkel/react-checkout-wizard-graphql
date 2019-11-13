/** @format */

import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import { Form as ReduxForm, reduxForm, getFormValues } from 'redux-form'
import { withSnackbar } from 'notistack'
import _ from 'lodash'

export const onSubmitSuccessCommon = (result, dispatch, { enqueueSnackbar }) => {
  enqueueSnackbar('You have successfully saved', { variant: 'success' })
}

export const onSubmitFailCommon = (errors, dispatch, submitError, { enqueueSnackbar }) => {
  const { graphQLErrors = [], message } = submitError || {}
  console.log('onSubmitFail', errors, submitError)
  if (graphQLErrors.length) {
    submitError.graphQLErrors.map(error => {
      return enqueueSnackbar(error.message, { variant: 'error' })
    })
  } else if (errors && errors._error) {
    enqueueSnackbar(errors._error, { variant: 'error' })
  } else if (message) {
    enqueueSnackbar(message, { variant: 'error' })
  }
}

const Form = ({ children, mutation, query, handleSubmit, onSubmit, match, history, location, ...props }) => {
  // const [queryQuery, queryProps] = mutation
  const [mutationQuery, mutationProps] = mutation
  return (
    <React.Fragment>
      <Mutation mutation={mutationQuery} {...mutationProps}>
        {mutation => (
          <ReduxForm
            onSubmit={handleSubmit(data =>
              onSubmit ? onSubmit({ ...props, ...mutationProps, mutation }) : mutation({ variables: { ...match.params, data } })
            )}
          >
            {children({ ...props, ...mutationProps, mutation: mutationQuery })}
          </ReduxForm>
        )}
      </Mutation>
    </React.Fragment>
  )
}

const enhancer = compose(
  withRouter,
  withSnackbar,
  connect(
    (
      state,
      {
        form,
        asyncBlurFields,
        asyncChangeFields,
        asyncValidate,
        destroyOnUnmount,
        enableReinitialize,
        forceUnregisterOnUnmount,
        getFormState,
        immutableProps,
        initialValues = {},
        keepDirtyOnReinitialize,
        updateUnregisteredFields,
        onChange,
        onSubmit,
        onSubmitFail = onSubmitFailCommon,
        onSubmitSuccess = onSubmitSuccessCommon,
        propNamespace,
        pure,
        shouldAsyncValidate,
        shouldError,
        shouldWarn,
        touchOnBlur,
        touchOnChange,
        persistentSubmitErrors,
        validate,
        warn
      }
    ) => ({
      form,
      asyncBlurFields,
      asyncChangeFields,
      asyncValidate,
      destroyOnUnmount,
      enableReinitialize,
      forceUnregisterOnUnmount,
      getFormState,
      immutableProps,
      keepDirtyOnReinitialize,
      updateUnregisteredFields,
      onChange,
      onSubmit,
      onSubmitFail,
      onSubmitSuccess,
      propNamespace,
      pure,
      shouldAsyncValidate,
      shouldError,
      shouldWarn,
      touchOnBlur,
      touchOnChange,
      persistentSubmitErrors,
      validate,
      warn,
      initialValues: _.omit(initialValues, 'id', 'owner', 'createdAt', 'updatedAt'),
      doc: getFormValues(form)(state) || initialValues
    })
  ),
  reduxForm()
)

export default enhancer(Form)

/*
  variables,
  refetchQueries,
  update,
  ignoreResults,
  optimisticResponse,
  context,
  onCompleted,
  onError,*/
