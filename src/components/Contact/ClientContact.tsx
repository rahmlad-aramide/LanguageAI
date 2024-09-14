'use client'
import React, { useRef, useState } from 'react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { useModal, useNotification } from '@/src/contexts';
import { ResponseModal } from './ResponseModal';

export const ClientContact: React.FC<{
  headingText: string;
  headingBody: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  send: string;
}> = ({
  headingText,
  headingBody,
  nameLabel,
  namePlaceholder,
  emailLabel,
  emailPlaceholder,
  messageLabel,
  messagePlaceholder,
  send
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const { openModal } = useModal();
  const { notify } = useNotification();

  const validateForm = (
    sender: string | FormDataEntryValue | null,
    email: string | FormDataEntryValue | null,
    message: string | FormDataEntryValue | null,
  ) => {
    let isValid = true;
  
    // Validate name
    if (!sender || typeof sender !== 'string' || sender.trim().length === 0) {
      notify('Name is required.', 'inform');
      isValid = false;
    }
  
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailPattern.test(email)) {
      notify('A valid email address is required.', 'inform');
      isValid = false;
    }
  
    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      notify('Message cannot be empty.', 'inform');
      isValid = false;
    }
  
    return isValid;
  };


  const sendEmail = async (e:any) => {
    e.preventDefault();
    const form = formRef.current;

    if (form) {
      const formData = new FormData(form);
      const sender = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      const isValid = validateForm(sender, email, message);

      if (!isValid) return; 

      try {
        setLoading(true);
        await emailjs.send(
          'service_vzq6vof', //'YOUR_SERVICE_ID',
          'template_3v37etn', //'YOUR_TEMPLATE_ID',
          {
            sender,
            email,
            message,
          },
          {
            publicKey: 'TzSNhl2YRrZyJWx5n', //'YOUR_PUBLIC_KEY',
          },
        );
        openModal(<ResponseModal successful={true} name={sender as string} />)
        e.target.reset();
      } catch (err) {
        if (err instanceof EmailJSResponseStatus) {
          console.log('EMAILJS FAILED...', err);
          return;
        }
        openModal(<ResponseModal successful={false} name={sender as string} />)
      }
      finally{
        setLoading(false); 
      }
    }
  };

  return (
    <>
    <div className="bg-[#EE076814] w-[calc(100%_-_32px)] sm:w-[calc(100%_-_64px)] md:w-[calc(100%_-_120px)] max-w-6xl mx-auto rounded-xl md:rounded-[2.5rem] py-11 px-4 sm:px-8 md:px-11 my-10">
      <h3 className="font-semibold text-lg md:text-4xl text-center text-[#101828] mx-4">
          {headingText}
        </h3>
        <p className="text-sm md:text-xl text-center text-[#475467] px-4 pt-3">
          {headingBody}
        </p>
      <form ref={formRef} onSubmit={sendEmail} className="mt-4 md:mt-10 gap-0 md:gap-4 w-full max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-4 w-full">
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor='name' className='cursor-pointer'>{nameLabel} <span className='text-primary'>*</span></label> 
            <Input type="text" name="name" id="name" placeholder={namePlaceholder} />
          </div>
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor='email' className='cursor-pointer'> {emailLabel} <span className='text-primary'>*</span> </label>
            <Input type="text" name="email" id="email" placeholder={emailPlaceholder} />
          </div>
        </div>
        <div className="flex flex-col mb-6 gap-1">
          <label htmlFor='message' className='cursor-pointer'> {messageLabel} <span className='text-primary'>*</span> </label>
          <textarea name='message' id='message' placeholder={messagePlaceholder} className='w-full h-40 rounded-lg bg-white shadow border border-primary outline-none ring-1 ring-transparent focus:ring-primary px-4 py-3' />
        </div>
        <div className="w-full max-w-sm mx-auto">
          <Button type="submit" disabled={loading} loading={loading} className="w-full">{send}</Button>
        </div>
      </form>
    </div>
    </>
  );
}
