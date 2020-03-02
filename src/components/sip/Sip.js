import React from 'react';

import styles from './Sip.module.scss';
import SipForm from './form/SipForm';
import { toNumberStr } from '../../utils';

class Sip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sipData: []};
    }
    setSipData = (arr) => {
        if (arr && arr.length) {
            console.log('SIP Data : ', arr);
            this.setState({sipData: [...arr]});
        }
    }

    renderSipDataRows = () => {
        return this.state.sipData.map(el => {
            return (
                <tr key={el.year}>
                    <td>{toNumberStr(el.year || 0)}</td>
                    <td>{toNumberStr(el.amountInvested || 0)}</td>
                    <td>{toNumberStr(el.fv || 0)}</td>
                </tr>
            );
        });
    }

    renderSipData = () => {
        return (
            <React.Fragment>
                <div className={styles.Sip__Table}>
                    <table style={{width: '100%'}}>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Invested Amount</th>
                                <th>Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderSipDataRows()}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div className={styles.Sip}>
                <SipForm setSipData={this.setSipData}/>
                {this.state.sipData && this.state.sipData.length ?
                    this.renderSipData() :
                    null
                }
            </div>
        );
    }
}

export default Sip;

