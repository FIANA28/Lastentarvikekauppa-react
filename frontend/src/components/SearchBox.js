import React, { useState } from 'react';

export default function SearchBox(props) {
    const [name, setName] = useState('');
    // here there is no search just redirect user to search page
    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);
    };
    return (
    <form className="search" onSubmit={submitHandler}>
        <div className="row">
            <input type='text' name="q" id="q" placeholder="Etsi: lelut, pehmolelut..." onChange={(e) => setName(e.target.value)} ></input>
            <button className='primary' type="submit">
                <i className='fa fa-search'></i>
            </button>
        </div>
    </form>
    );
}
