import React, { useEffect } from 'react';

const Message = ({setSelectedLink,link}) =>{
    useEffect(()=>{
        setSelectedLink(link)
    }, [])
    return <div>Message</div>
};

export default Message;