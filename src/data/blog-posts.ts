export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "welcome-to-repeter",
    title: "Welcome to Répéter",
    date: "October 8, 2025",
    excerpt:
      "We're excited to introduce Répéter, a new way to practice French pronunciation using advanced speech recognition technology.",
    content: `We're excited to introduce Répéter, a new way to practice French pronunciation. Using advanced speech recognition technology, we provide instant feedback to help you improve your French speaking skills.

Whether you're a beginner or advanced learner, Répéter adapts to your level and helps you build confidence in speaking French.

## Why Pronunciation Matters

Good pronunciation is essential for effective communication. It's not just about being understood—it's about building confidence and connecting with native speakers on a deeper level.

## How Répéter Helps

Our app uses cutting-edge speech recognition to analyze your pronunciation in real-time. You'll get immediate feedback on your speaking, allowing you to make corrections and improve faster than traditional methods.

## Get Started Today

Ready to improve your French pronunciation? Start practicing today and see the difference that instant feedback can make in your language learning journey.`,
    author: "Répéter Team",
  },
  {
    slug: "importance-of-pronunciation",
    title: "The Importance of Pronunciation Practice",
    date: "October 1, 2025",
    excerpt:
      "Good pronunciation is crucial for effective communication in any language. French requires regular practice to master its unique sounds.",
    content: `Good pronunciation is crucial for effective communication in any language. French, with its unique sounds and intonation patterns, requires regular practice to master.

## The Challenge of French Pronunciation

French has several sounds that don't exist in English, such as the uvular "R" and various nasal vowels. These sounds can be challenging for learners, but with consistent practice, they become second nature.

## Benefits of Good Pronunciation

- **Better comprehension:** When you pronounce words correctly, native speakers understand you more easily
- **Increased confidence:** Knowing you sound natural boosts your confidence in conversations
- **Improved listening:** Practicing pronunciation helps you recognize sounds better when listening
- **Cultural connection:** Good pronunciation shows respect for the language and culture

## Practice Makes Perfect

Studies show that regular pronunciation practice can significantly improve your speaking confidence and comprehension. With Répéter, you can practice anytime, anywhere, making it easier to integrate practice into your daily routine.

Don't let pronunciation anxiety hold you back. Start practicing today and watch your French skills soar!`,
    author: "Répéter Team",
  },
  {
    slug: "effective-language-learning-tips",
    title: "Tips for Effective Language Learning",
    date: "September 24, 2025",
    excerpt:
      "Learning a new language takes time and dedication, but with the right approach, you can make steady progress.",
    content: `Learning a new language takes time and dedication, but with the right approach, you can make steady progress. Here are our top tips for effective language learning:

## 1. Practice Daily

Consistency is more important than duration. Even 10-15 minutes of daily practice is better than a 2-hour session once a week. Your brain needs regular exposure to reinforce neural pathways.

## 2. Focus on Pronunciation Early

Many learners wait until they're "ready" to work on pronunciation. Don't make this mistake! Starting with good pronunciation habits from day one makes everything easier down the line.

## 3. Immerse Yourself

Surround yourself with the language through:

- French music and podcasts
- Movies and TV shows with subtitles
- French YouTube channels
- Language exchange partners

## 4. Embrace Mistakes

Mistakes are not failures—they're learning opportunities. Every mistake you make and correct is a step forward. Don't let fear of embarrassment stop you from speaking.

## 5. Use Technology Wisely

Modern language learning tools like Répéter can accelerate your progress by providing instant feedback and personalized practice. Technology can't replace human interaction, but it's an excellent supplement to traditional learning methods.

## 6. Set Realistic Goals

Break your language learning journey into achievable milestones. Instead of "become fluent," try "have a 5-minute conversation" or "order food in French at a restaurant."

## Final Thoughts

Remember, language learning is a marathon, not a sprint. Celebrate your progress, stay consistent, and most importantly—enjoy the journey!`,
    author: "Répéter Team",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
