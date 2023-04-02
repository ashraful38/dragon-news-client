import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LeftSideNav = () => {
    const [categoris , setCategories] = useState([]);
    useEffect( ()=>{
        fetch('http://localhost:5000/news-categories')
        .then(res=> res.json())
        .then(data =>setCategories(data))
    }, [])
    return (
        <div>
            <h4>All category:{categoris.length}</h4>
            <div>
                {
                    categoris.map(category => <p key={category.id}>
                      <Link to={`/category/${category.id}`}>{category.name}</Link>

                    </p>)
                }
            </div>
        </div>
    );
};

export default LeftSideNav;