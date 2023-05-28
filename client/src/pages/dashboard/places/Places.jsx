import React, { useEffect } from 'react';

const Places = ({setSelectedLink, link}) =>{
    useEffect(()=>{
        setSelectedLink(link)
    }, [])
    return <div>Places</div>
};

export default Places;