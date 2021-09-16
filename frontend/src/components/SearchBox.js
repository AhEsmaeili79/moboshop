import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <i className='bx bx-search' ></i>
        <input className="search" type="text" placeholder="...جستوجو" type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}>
          </input>
          <button  className="btn-search"  type="submit">G</button>
          <span className="tooltip">جستوجو</span>
      </div>
    </form>
  );
}
