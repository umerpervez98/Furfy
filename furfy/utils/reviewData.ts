// Define a type for individual review entries
type Review = {
    name: string;
    title: string;
    review: string;
    reply: string;
    date: string;
  };
  
  // Define a type for review statistics
  type ReviewData = {
    rating: number;
    frequency: number;
    percentage: number;
  };
  
  // Array of customer reviews
  export const reviews: Review[] = [
    {
      name: 'M.D.',
      title: 'Happy hound days.',
      review:
        'This is a great find, it gets rid of the 2 hounds hair really easily, the couches look almost new! Love it so much have bought another 2 and given them as gifts to other dog lovers.',
      reply:
        "Thank you so much for your wonderful review! We're thrilled to hear how much you love it—and that it's made such a difference with the hair! Your couches must look fantastic. 😊 It’s so kind of you to share the love by gifting it to other dog lovers—what a thoughtful idea!",
      date: '01/26/2025',
    },
    {
      name: 'Clayton Childs',
      title: '',
      review: 'It really works well',
      reply: 'Thank you so much for 5 stars Clayton! ✨',
      date: '01/06/2025',
    },
    {
      name: 'Lenore Thomas',
      title: 'Love it',
      review:
        'At last, one that actually works and not just another gimmick! I have 4 cats so this is a Godsend. Thank you!! ❤️',
      reply:
        'Thank you for the review!! We are so glad to hear you are enjoying the Furfy, we love how easy it is to use and that it works so well. Definitely a must for 4 cats Thanks for the support!',
      date: '12/13/2024',
    },
    {
      name: 'Linsay Henry',
      title: '',
      review: 'It was much the same as another product I have',
      reply:
        'Thank you for taking the time to leave a review for Furfy—we really appreciate your feedback! I’m sorry to hear that you found it similar to another product. To help, I’ve emailed you a how-to video to ensure you’re getting the most out of it.\n\nIf you have any questions at all, please don’t hesitate to reach out—we’re always here to help. Thanks again!',
      date: '12/12/2024',
    },
    {
      name: 'Jeff Ryland',
      title: '',
      review:
        'Excellent product really does a great job. I have 3 cats and they leave hair all over and the Furfy works so good on collecting it all better than vacuuming etc. This is my third Furfy, I just wear them out and much better quality than other comparable brands.',
      reply:
        'Hi there, thank you so much for leaving such a positive review for Furfy! We are thrilled to hear that our product is doing an excellent job of collecting pet hair for you. We understand how frustrating it can be to constantly battle pet hair, and we are glad that Furfy has been able to make your life easier. Thank you for choosing Furfy.',
      date: '12/11/2024',
    },
  ];
  
  // Array of review statistics
  export const reviewsData: ReviewData[] = [
    { rating: 5, frequency: 32, percentage: 89 },
    { rating: 4, frequency: 1, percentage: 3 },
    { rating: 3, frequency: 3, percentage: 8 },
    { rating: 2, frequency: 0, percentage: 0 },
    { rating: 1, frequency: 0, percentage: 0 },
  ];
  
  