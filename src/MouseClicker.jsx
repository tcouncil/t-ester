import {React, useState} from 'react';
import Lightbulb from './Images/lightbulb.png'

const MouseClicker = () =>{
    const [count, setCount] = useState(0);
    return(
        <div className='col-1 MouseClicker' onClick={() => setCount(count + 1)}>
            <img src={Lightbulb} alt="Lightbulb" className={`Lightbulb ${count % 2 === 0 ? 'Lightbulb-On' : 'Lightbulb-Off'}`} />
            <h5>
                {count}
            </h5>
        </div>
    )
}

export default MouseClicker;