import React from 'react';
import { Field } from 'redux-form';
import { Input, Form } from 'antd';
const FormItem = Form.Item

class InputField extends React.Component {
  static defaultProps = {
    placeholder: '请输入',
    disabled: false,
    type: 'text',
    onKeyUp: () => {},
    onPressEnter: () => {},
    onBlur: () => {},
    size: "large",
    defaultValue: undefined
  }
  constructor(props) {
    super(props);
    this.state = {
      needReload: false
    }
  }

  validateStatus (field) {
    if (field && field.meta && field.meta.touched && field.meta.error) {
      return 'error'
    } else {
      return null
    }
  }

  showErrMessage (field) {
    if (field && field.meta && field.meta.touched && field.meta.error) {
      return field.meta.error
    } else {
      return ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const {options, optDis} = nextProps
    if (options && options.length !== this.props.options.length) {
      this.setState({
        needReload: true
      })
    } else if (optDis && optDis !== this.props.optDis) {
      this.setState({
        needReload: true
      })
    }
  }
  renderField = (field) => {
    const { formItemLayout, label, disabled, placeholder, type, inputStyle, onKeyUp, onPressEnter, onBlur, defaultValue, size } = this.props;
    return (
      <FormItem
        {...formItemLayout}
        label={label}
        validateStatus={this.validateStatus(field)}
        help={this.showErrMessage(field)}>
        <Input
          {...field.input}
          value={field.input.value ? field.input.value : defaultValue}
          onChange={(value) => {
            if (this.props.onChange) {
              this.props.onChange(value, field)
            } else {
              field.input.onChange(value)
            }
          }}
          onFocus={
            (value) => {
              if (this.props.onFocus) {
                this.props.onFocus(value, field)
              } else {
                field.input.onFocus(value)
              }
            }
          }
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          onKeyUp={onKeyUp}
          style={inputStyle}
          onPressEnter={onPressEnter}
          onBlur={onBlur}
          size={size}
        />
      </FormItem>
    )
  }
  render() {
    const {label, name, type, validate} = this.props
    const {needReload} = this.state
    if (needReload) {
      return (
        <Field name={name} label={label} type={type} component={(field) => {
          return this.renderField(field)
        }} validate={validate} />
      )
    } else {
      return (
        <Field name={name} label={label} type={type} component={this.renderField} validate={validate} />
      )
    }
  }
}


export default InputField;
