import React from "react";
import { Field, reduxForm } from "redux-form";

class SongForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div
          className="ui error message"
          style={{ paddingTop: "2px", paddingBottom: "2px", marginTop: "5px" }}
        >
          <div>{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmit = formValues => {
    //calls parent's onSubmit.
    this.props.onSubmit(formValues);
    // onSubmit = formValues => {
    //     this.props.createStream(formValues);
    //   };
  };
  render() {
    // console.log(this.props);
    // handleSubmit: callback function that is provided to our component by redux form.
    // by implementing reduxForm it is automatically added to props
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
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
          <Field
            name="youtubeUrl"
            component={this.renderInput}
            label="Enter Youtube URL"
          />
          <Field
            name="imageUrl"
            component={this.renderInput}
            label="Enter ImageUrl (Optional)"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}
const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  if (!formValues.youtubeUrl) {
    errors.youtubeUrl = "You must enter a Youtube Url";
  }
  return errors;
};

// const mapStateToProps = state => {};

export default reduxForm({
  form: "songForm",
  validate: validate
})(SongForm);
