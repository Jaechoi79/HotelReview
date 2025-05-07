import type { Feedback } from "@/types/feedback"

export const sampleFeedbacks: Feedback[] = [
  {
    id: "1",
    title: "Great Platform for Hotel Reviews",
    content:
      "I've been using this platform for several months now, and I'm impressed with the accuracy of the reviews and ratings. It has helped me find some amazing hotels for my trips. Keep up the good work!",
    type: "praise",
    userId: "user1",
    userName: "John Smith",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: "2",
    title: "Suggestion for Filtering Options",
    content:
      "It would be great if we could filter hotels by specific amenities like 'pool', 'gym', or 'free breakfast'. This would make it easier to find hotels that match our specific needs.",
    type: "suggestion",
    userId: "user2",
    userName: "Emily Johnson",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: "3",
    title: "Issue with Rating System",
    content:
      "I've noticed that sometimes the overall ratings don't seem to match the individual category ratings. It would be helpful to understand how the final rating is calculated.",
    type: "complaint",
    userId: "user3",
    userName: "Michael Brown",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
  },
  {
    id: "4",
    title: "How to Delete My Review?",
    content:
      "I accidentally submitted a review for the wrong hotel. How can I delete or edit my review? I couldn't find this option in my account settings.",
    type: "question",
    userId: "user4",
    userName: "Sarah Wilson",
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
  },
  {
    id: "5",
    title: "Mobile App Suggestion",
    content:
      "Would love to see a mobile app for this platform. It would make it much easier to check reviews and ratings while traveling.",
    type: "suggestion",
    userId: "user5",
    userName: "David Lee",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
  },
  {
    id: "6",
    title: "Thank You for the Recent Updates",
    content:
      "The recent updates to the user interface have made the site much more user-friendly. I especially like the new hotel comparison feature. Thank you for continuously improving the platform!",
    type: "praise",
    userId: "user6",
    userName: "Jessica Martinez",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
  },
  {
    id: "7",
    title: "Inaccurate Hotel Information",
    content:
      "I recently stayed at a hotel that was listed as having free WiFi, but they actually charged for it. It would be good to have more verification of the amenities listed.",
    type: "complaint",
    userId: "user7",
    userName: "Robert Taylor",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
  },
  {
    id: "8",
    title: "Can We Add Photos to Reviews?",
    content:
      "Is it possible to add photos to our hotel reviews? I think this would be a valuable addition as it would give other users a more realistic view of the accommodations.",
    type: "question",
    userId: "user8",
    userName: "Amanda Clark",
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(), // 75 days ago
  },
  {
    id: "9",
    title: "Suggestion for Reward System",
    content:
      "It would be nice to have a reward system for active reviewers. Perhaps points that can be redeemed for discounts on hotel bookings or other travel-related perks.",
    type: "suggestion",
    userId: "user9",
    userName: "Thomas Anderson",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
  },
  {
    id: "10",
    title: "Excellent Customer Support",
    content:
      "I had an issue with my account and contacted customer support. They responded quickly and resolved my problem efficiently. I'm very impressed with the level of service!",
    type: "praise",
    userId: "user10",
    userName: "Lisa Rodriguez",
    createdAt: new Date(Date.now() - 105 * 24 * 60 * 60 * 1000).toISOString(), // 105 days ago
  },
]
