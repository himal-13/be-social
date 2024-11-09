type Post = {
    id: number;
    accountName: string;
    content: string;
    likes: number;
    shares: number;
    commentsCount: number;
    postedDate: Date;
  };
  
  const posts: Post[] = [
    {
      id: 1,
      accountName: "john_doe",
      content: "Exploring the beauty of nature with my camera 📸 #wanderlust",
      likes: 125,
      shares: 20,
      commentsCount: 18,
      postedDate: new Date("2024-11-01T14:30:00"),
    },
    {
      id: 2,
      accountName: "jane_smith",
      content: "Happy to announce my new blog post about productivity tips! Check it out 👇",
      likes: 87,
      shares: 15,
      commentsCount: 22,
      postedDate: new Date("2024-10-30T09:00:00"),
    },
    {
      id: 3,
      accountName: "travel_guru",
      content: "Just returned from an amazing trip to the Swiss Alps 🏔️. Can’t wait to share the stories!",
      likes: 300,
      shares: 45,
      commentsCount: 60,
      postedDate: new Date("2024-11-03T18:15:00"),
    },
    {
      id: 4,
      accountName: "fitness_fanatic",
      content: "Early morning workout done! Feeling strong and ready to take on the day 💪",
      likes: 145,
      shares: 30,
      commentsCount: 12,
      postedDate: new Date("2024-11-05T06:00:00"),
    },
    {
      id: 5,
      accountName: "foodie_heaven",
      content: "Just made the best homemade pizza 🍕 Check out my recipe!",
      likes: 500,
      shares: 70,
      commentsCount: 85,
      postedDate: new Date("2024-11-07T20:45:00"),
    },
  ];
  
  export default posts;
  