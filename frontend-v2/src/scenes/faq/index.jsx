import React from 'react';

// FAQItem component to represent each FAQ question and answer
const FAQItem = ({ question, answer }) => (
  <div className="faq-item">
    <h3 className="faq-question">{question}</h3>
    <p className="faq-answer">{answer}</p>
  </div>
);

// FAQPage component to display all FAQ items
const FAQPage = () => {
  // Sample FAQ data
  const faqData = [
    {
      question: 'Q: What is the "Asset Manager"?',
      answer: 'A: The "Asset Manager" is a tracking tool that keeps track of the local assets in a given space.',
    },
    {
      question: 'Q: What is the "Dashboard"?',
      answer: 'A: The "Dashboard is the main page of the tracking tool. It displays the recent activity, assests, accessories, users, and locations. It also shows a graph and chart of all the assets that are checked in and out.',
    },
    {
      question: 'Q: How can I see the list of all the assests?',
      answer: 'A: To see a list of all of the assets, just go to the sidebar labelled "Assets" under the "Data" section.',
    },
    {
        question: 'Q: How do I check out an asset?',
        answer: 'A: In the "Assets" page, click on the "CHECKOUT" button on the row of the asset that you want to checkout. Then, enter your name and location you are checking out the asset at.'
    },
    {
        question: 'Q: How can I see the details of an asset or person?',
        answer: 'A: To see the details of an asset, just click onto the "Asset ID" of the desired asset and it will show the details of the asset. It would be the same process to see the details of a person but click onto the "ID" instead',
    }
  ];

  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
