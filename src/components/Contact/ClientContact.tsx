import React from 'react';
// import emailjs from 'emailjs-com';

export default function ContactForm() {
  const sendEmail = (e:any) => {
    e.preventDefault();

    // emailjs.sendForm('your_service_id', 'your_template_id', e.target, 'your_user_id')
    //   .then((result) => {
    //     console.log('Email successfully sent!', result.text);
    //     alert('Message sent!');
    //   }, (error) => {
    //     console.log('Failed to send the email', error.text);
    //     alert('Failed to send message, please try again.');
    //   });

    e.target.reset();
  };

  return (
    <form onSubmit={sendEmail} className="max-w-lg mx-auto p-4 shadow-lg rounded-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name:</label>
        <input type="text" name="name" id="name" required className="mt-1 p-2 w-full border rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email:</label>
        <input type="email" name="email" id="email" required className="mt-1 p-2 w-full border rounded-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message:</label>
        <textarea name="message" id="message" required className="mt-1 p-2 w-full border rounded-md"></textarea>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">Send</button>
    </form>
  );
}
