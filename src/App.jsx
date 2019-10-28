import React, { useState } from 'react';

const App = ({title}) => {
    const [isTitleVisible, setIsTitleVisible] = useState(false);

    return (
        <div>
            {isTitleVisible && <h1 className="title">{title}</h1>}
            <button onClick={() => setIsTitleVisible(true)} className="show">Show title</button>
            <button onClick={() => setIsTitleVisible(false)} className="hide">Hide title</button>
        </div>
    );
};

export default App;