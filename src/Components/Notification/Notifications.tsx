import React, { useEffect } from 'react';
import { Button, notification } from 'antd';
interface NotficationProps {
  message:string;
 
}
const Notifications: React.FC<NotficationProps> = ({message}) => {
  const [api, contextHolder] = notification.useNotification();

  
useEffect(()=>{
    api.open({
        message: 'Notification',
        description:
          message,
        duration: 0,
      });
},[message])
  return (
    <>
      {contextHolder}
    
    </>
  );
};

export default Notifications;