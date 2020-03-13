import React from 'react';

import styles from './Sip.module.scss';
import SipForm from './form/SipForm';
import { toNumberStr } from '../../utils';

class Sip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sipData: [], activeForm: ''};
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
        );
    }

    render() {
        return (
            <div className={styles.Sip}>
                {/* <div className={styles.Sip__Tabs}>
                    <div
                        className={`${styles.Sip__Tabs__Item} ${this.state.activeForm === 'sip' ? styles.Sip__Tabs__Item__Active : ''}`} 
                        onClick={() => this.setState({activeForm: 'sip'})}
                    >
                        <span>SIP</span>
                    </div>
                    <div 
                        className={`${styles.Sip__Tabs__Item} ${this.state.activeForm === 'mf' ? styles.Sip__Tabs__Item__Active : ''}`} 
                        onClick={() => this.setState({activeForm: 'mf'})}
                    >
                        <span>MF Returns</span>
                    </div>
                    <div
                        className={`${styles.Sip__Tabs__Item} ${this.state.activeForm === 'goalSip' ? styles.Sip__Tabs__Item__Active : ''}`} 
                        onClick={() => this.setState({activeForm: 'goalSip'})}
                    >
                        <span>Goal SIP</span>
                    </div>
                </div> */}
                <SipForm setSipData={this.setSipData} activeForm={this.state.activeForm}/>
                {this.state.sipData && this.state.sipData.length ?
                    this.renderSipData() :
                    null
                }
            </div>
        );
    }
}

export default Sip;

