import React from 'react';

interface FAQItem {
  question: string;
  answer: string | string [];
}

interface FAQComponentProps {
  faqs: FAQItem[];
}

const FAQComponent: React.FC<FAQComponentProps> = ({ faqs }) => {
  return (
    <div className='my-3'>
      {faqs.map((faq, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h5 className='font-medium'>{faq.question}</h5>
          {typeof faq.answer === 'string' ? (
            <p className='text-lg' style={{ whiteSpace: 'pre-line' }}>{faq.answer}</p>
          ) : (
            <ul>
              {faq.answer.map((point, i) => (
                <li className='text-lg' key={i}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQComponent;