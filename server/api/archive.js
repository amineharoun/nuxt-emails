export default defineEventHandler(() => {
  return {
    mails: [
      {
        id: 31,
        title: "Take a class at local community center that interests you",
        read: false,
        userId: 33,
      },
      {
        id: 32,
        title: "Research a topic interested in",
        read: false,
        userId: 4,
      },
      {
        id: 33,
        title: "Plan a trip to another country",
        read: true,
        userId: 37,
      },
      { id: 34, title: "Improve touch typing", read: false, userId: 45 },
      { id: 35, title: "Learn Express.js", read: false, userId: 49 },
      { id: 36, title: "Learn calligraphy", read: false, userId: 50 },
      {
        id: 37,
        title: "Have a photo session with some friends",
        read: false,
        userId: 14,
      },
      { id: 38, title: "Go to the gym", read: false, userId: 15 },
      { id: 39, title: "Make own LEGO creation", read: false, userId: 30 },
      { id: 40, title: "Take cat on a walk", read: false, userId: 15 },
    ],
  };
});
