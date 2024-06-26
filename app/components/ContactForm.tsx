'use client';

import { FormEvent, useState } from 'react';

export const ContactForm = ({ preFilledDate }: { preFilledDate?: Date }) => {
  const [submissionWasSuccessful, setSubmissionWasSuccessful] = useState(false);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch('https://getform.io/f/zbxdlqqb', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setSubmissionWasSuccessful(true);
        }
      })
      .catch((error) => console.log(error));

    return response;
  }
  return (
    <>
      <form
        className="border border-white p-8 rounded-lg relative"
        id="contact-form"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col sm:flex-row sm:gap-12">
          <div className="basis-1/2">
            <TextInput
              name="first-name"
              label="First name *"
              type="text"
              required
            />
            <TextInput name="email" label="Email *" type="email" required />

            <label className="text-xs" htmlFor="startDate">
              Desired start date
            </label>
            <input
              className="input"
              type="date"
              name="startDate"
              id="startDate"
              defaultValue={
                preFilledDate
                  ? new Date(preFilledDate).toISOString().split('T')[0]
                  : ''
              }
            />
          </div>
          <div className="basis-1/2">
            <TextInput name="last-name" label="Last name" type="text" />
            <TextInput name="phone" label="Phone" type="tel" />
            <label className="text-xs" htmlFor="weeks">
              Number of weeks
            </label>
            <input
              className="input"
              min={1}
              type="number"
              name="weeks"
              id="weeks"
            />
          </div>
        </div>
        <TextInput name="message" label="Message" type="text" />

        {submissionWasSuccessful ? (
          <div className="text-green-400">
            {"Submitted! We'll be in touch shortly to discuss your booking."}
          </div>
        ) : (
          <button
            className="btn-main mt-6 py-1 px-4 border rounded-md border-grey-site"
            type="submit"
          >
            Send
          </button>
        )}
      </form>
    </>
  );
};

const TextInput = ({
  name,
  label,
  type,
  required = false,
}: {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel';
  required?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-y-2 input-text">
      <label className="text-xs" htmlFor={name}>
        {label}
      </label>
      <input
        className="input"
        type={type}
        name={name}
        id={name}
        required={required}
      />
    </div>
  );
};
