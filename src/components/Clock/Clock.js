import React from 'react';

import styles from './Clock.module.scss';
import { getTimedColor } from '../../utils';

class Clock extends React.Component {
    marksRef = React.createRef();
    svgRef = React.createRef();
    stroke = '#cfcfcf';

    componentDidMount() {
        if (this.props.hourOfDay === 'morning' || this.props.hourOfDay === 'evening') {
            this.stroke = '#333';
        }
        if (this.marksRef) {
            const children = this.marksRef && this.marksRef.childNodes;
            const len = children && children.length;
            let elNum = 1;
            for (let i = 0; i < len; i ++) {
                if (children[i] && children[i].nodeName && children[i].nodeName === 'line') {
                    const line = children[i];
                    line.style.transform = `rotate(${elNum * 30}deg)`;
                    if (![3, 6, 9, 12].includes(elNum)) {
                    line.style.strokeWidth = .15;
                    } else {
                    line.style.strokeWidth = .5;
                    }
                    elNum++;
                }
            }
            if (this.svgRef) {
                const currentTime = new Date();
        
                this.svgRef.style.setProperty('--start-seconds', currentTime.getSeconds());
                this.svgRef.style.setProperty('--start-minutes', currentTime.getMinutes());
                this.svgRef.style.setProperty('--start-hours', currentTime.getHours() % 12);
            }
        }

    }

    // getStrokeColor = () => {
    //     if (this.props.hourOfDay === 'morning' || this.props.hourOfDay === 'noon') {
    //         return '#333';
    //     }
    //     return '#cfcfcf';
    // }

    render() {
        const strokeColor = getTimedColor(this.props.hourOfDay);
        return (
            <div className={styles.Clock}>
                <svg
                    viewBox="0 0 40 40"
                    className={styles.Clock__Svg}
                    ref={(ref) => { this.svgRef = ref; }}
                    style={{stroke: strokeColor}}
                >
                    <line x1="0" y1="0" x2="11" y2="0" className={styles.Clock__Svg__Hour}/> 
                    <line x1="0" y1="0" x2="13" y2="0" className={styles.Clock__Svg__Min}/>
                    <line x1="0" y1="0" x2="15" y2="0"  className={styles.Clock__Svg__Sec}/>
                    <circle cx="20" cy="20" r=".6" className={styles.Clock__Svg__Pin} style={{ fill: strokeColor }}/>
                    <circle cx="20" cy="20" r="19" />
                    <g className={styles.Clock__Svg__Marks} ref={(ref) => { this.marksRef = ref; }}>
                        <line x1="16" y1="0" x2="17" y2="0" />
                        <line x1="16" y1="0" x2="17" y2="0" />
                        <line x1="16" y1="0" x2="17" y2="0" />
                        <line x1="16" y1="0" x2="17" y2="0" />
                        <line x1="16" y1="0" x2="17" y2="0" />
                        <line x1="16" y1="0" x2="17" y2="0" />
                        <line x1="16" y1="0" x2="17" y2="0" />
                        <line x1="16" y1="0" x2="17" y2="0" />
                        <line x1="16" y1="0" x2="17" y2="0" />
                        <line x1="16" y1="0" x2="17" y2="0" />
                        <line x1="16" y1="0" x2="17" y2="0" />
                        <line x1="16" y1="0" x2="17" y2="0" />
                    </g>
                    {/* <text x="0" y="0" className={sty}>#SC</text> */}
                </svg>
            </div>
        );
    }
}

export default Clock;