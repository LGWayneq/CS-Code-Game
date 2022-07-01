import React, { useState, useEffect } from 'react';
import { colours } from '../assets/colours';
import CodeLine from './CodeLine';

function CodingArea() {
    const [codeLines, setCodeLines] = useState<Array<string>>(["test", "asdf"])

    useEffect(() => {
        getCodeContent()
    }, [])

    const getCodeContent = () => {
        function reqListener(this: XMLHttpRequest, ev: ProgressEvent<XMLHttpRequestEventTarget>) {
            console.log(this.responseText)
        }

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", "http://localhost:3001/assets/codeContent.txt");
        oReq.send();
    }

    return (
        <div style={styles.container}>
            {codeLines.map((line, index) => {
                return (
                    <CodeLine key={index+1} index={index + 1} highlighted={index == codeLines.length - 1}>
                        {line}
                    </CodeLine>
                )
            })}
        </div>
    );
}

export default CodingArea;

const styles = {
    container: {
        flexGrow: 1,
        backgroundColor: colours.main,
        justifyContent: 'center',
    }
}