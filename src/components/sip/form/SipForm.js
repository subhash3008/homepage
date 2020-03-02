import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import styles from './SipForm.module.scss';

class SipForm extends React.Component {

    getFutureValue = (amount, months, rate) => {
        return (
            // (
            //     (
            //         (+amount) * 
            //         (Math.pow((1 + (((+rate) / 100) / months)), months) - 1) 
            //         / 
            //         (((+rate) / 100) / months)
            //     ) 
            //     *
            //     (1 + (((+rate) / 100) / months))
            // )
            (
                amount *
                (
                    (Math.pow((1 + rate), months) - 1)
                    /
                    rate
                ) *
                (1 + rate)
            )
        );
    }

    createSipResult = (amount, year, rate) => {
        const arr = [];
        for (let i = year; i < year + 15; i++) {
            const months = Math.floor((i) * 12);
            const monthlyRate = rate / 12 / 100;
            const fv = this.getFutureValue(amount, months, monthlyRate);
            arr.push({year: i, fv, amountInvested: amount * months});
        }
        return [...arr];
    }

    handleSubmit = (values) => {
        console.log('VALUES SUBMITTED.', values);
        const {amount, year, rate} = values;
        if (amount && year && rate) {
            const resArr = this.createSipResult(+amount, +year, +rate);
            // const months = Math.floor((+year) * 12);
            // console.log('MONTHS : ', months, rate);
            // const fv = this.getFutureValue(+amount, months, rate);
            // console.log('Future Value : ', fv);
            // console.log('DEN : ', (1 + (((+rate) / 100) * months)));
            // console.log('resArr : ', resArr);
            this.props.setSipData([...resArr]);
        }
    }

    renderInput = ({ input = {}, label = '', type = '', meta: { touched = false, error = ''} }) => {
        return (
            <div>
                <input {...input} placeholder={label} autoComplete="off" type={type} className={styles.Form__Field__Control__Input}></input>
                {touched && ((error && <div className={styles.Form__Field__Control__InputError}>{error}</div>))}
            </div>
        );
    };

    render() {
        const { handleSubmit, pristine, submitting, invalid } = this.props;
        return (
            <form className={styles.Form} onSubmit={handleSubmit(this.handleSubmit)}>
                <div className={styles.Form__Field}>
                    <div className={styles.Form__Field__Control}>
                        <Field
                            className={styles.Form__Field__Control__Input}
                            name="amount"
                            component={this.renderInput}
                            type="number"
                            label="Monthly Amount"
                        />
                    </div>
                </div>
                <div className={styles.Form__Field}>
                    <div className={styles.Form__Field__Control}>
                        <Field
                            className={styles.Form__Field__Control__Input}
                            name="year"
                            component={this.renderInput}
                            type="number"
                            label="Time in Year"
                        />
                    </div>
                </div>
                <div className={styles.Form__Field}>
                    <div className={styles.Form__Field__Control}>
                        <Field
                            className={styles.Form__Field__Control__Input}
                            name="rate"
                            component={this.renderInput}
                            type="number"
                            label="Annual ROR in %"
                        />
                    </div>
                </div>
                <div className={styles.Form__Field}>
                    <div className={styles.Form__Field__Control}>
                        <button
                            className={styles.Form__Field__Control__Submit}
                            type="submit"
                            disabled={pristine || submitting || invalid}
                        >
                            <span>Calculate</span>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.amount) {
        errors['amount'] = 'Amount is required.';
    }
    if (!values.year) {
        errors['year'] = 'Time is required.';
    }
    if (!values.rate) {
        errors['rate'] = 'Rate is required.';
    }
    return {...errors};
}

const mapStateToProps = (state) => {
    return {
        form: state.form && state.form.sip && state.form.sip.values
    };
}

const SipConnected = connect(
    mapStateToProps,
    null
)(SipForm);

export default reduxForm({
    form: 'sip',
    validate
})(SipConnected);