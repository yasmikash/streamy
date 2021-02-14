import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderInput(formProps) {
    return (
      <div className="field">
        <label>{formProps.label}</label>
        <input
          onChange={formProps.input.onChange}
          onBlur={formProps.input.onBlur}
          value={formProps.input.value}
        />
        <div>
          {formProps.meta.touched && formProps.meta.error
            ? formProps.meta.error
            : null}
        </div>
      </div>
    );
  }

  handleOnSubmit = (formValues) => {
    console.log(this.props);
    this.props.onSubmit(formValues);
  };

  // testFunc(cb) {
  //   return (e) => {
  //     e.preventDefault();
  //     cb(formValues);
  //   };
  // }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.handleOnSubmit)}
          className="ui form"
        >
          {/* Fields will re-render on every registered events */}
          <Field
            name="title"
            component={this.renderInput}
            label="Enter Title"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const error = {};

  if (!formValues.title) {
    error.title = "Please enter a title";
  }

  if (!formValues.description) {
    error.description = "Please enter a description";
  }

  return error;
};

// const mapStateToProps = (state) => {
//   return { streams: null };
// };
export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
