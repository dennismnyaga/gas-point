import React from 'react'

const HandlePhoneLink = ({phoneNumber}:{phoneNumber:number}) => {
    const handlePhoneCall = () => {
        // Trigger a phone call using JavaScript's `tel:` protocol
        window.location.href = `tel:${phoneNumber}`;
      };
  return (
    <button onClick={handlePhoneCall}>
        {phoneNumber}
    </button>
  )
}

export default HandlePhoneLink