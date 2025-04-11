
import { getAuth } from "firebase/auth";

interface AiResponse {
  text: string;
  followUpQuestions?: string[];
}

// Student-focused AI response patterns with more context-aware replies
export const getAIResponse = (message: string): AiResponse => {
  const lowerMessage = message.toLowerCase();
  
  // Anxiety and stress responses
  if (
    lowerMessage.includes('anxious') || 
    lowerMessage.includes('anxiety') || 
    lowerMessage.includes('stressed') || 
    lowerMessage.includes('stress') ||
    lowerMessage.includes('worried') ||
    lowerMessage.includes('overthinking')
  ) {
    return {
      text: "I understand feeling anxious can be overwhelming. Try this 4-7-8 breathing technique: inhale for 4 counts, hold for 7, and exhale for 8. Anxiety is often triggered by uncertainty about the future. Could you share what specific situation is causing you stress right now?",
      followUpQuestions: [
        "What triggers your anxiety the most?",
        "Have you tried any relaxation techniques before?",
        "Would it help to break down what's worrying you into smaller, manageable parts?"
      ]
    };
  }
  
  // Social media addiction
  if (
    lowerMessage.includes('social media') || 
    lowerMessage.includes('addicted') || 
    lowerMessage.includes('distracted') ||
    lowerMessage.includes('instagram') ||
    lowerMessage.includes('facebook') ||
    lowerMessage.includes('tiktok') ||
    lowerMessage.includes('youtube') ||
    lowerMessage.includes('snapchat') ||
    lowerMessage.includes('twitter') ||
    lowerMessage.includes('can\'t focus')
  ) {
    return {
      text: "Social media is designed to be addictive through dopamine-triggering notifications and infinite scrolling. I recommend trying these strategies: 1) Use app blockers during study time, 2) Set specific 'check-in' times for social apps, 3) Turn off notifications, and 4) Try the Pomodoro technique in our Focus section. Which app do you find most difficult to stay away from?",
      followUpQuestions: [
        "Have you noticed what triggers your social media usage?",
        "Would you be willing to try a 24-hour digital detox this weekend?",
        "What meaningful activities could replace some of your scrolling time?"
      ]
    };
  }
  
  // Motivation and procrastination
  if (
    lowerMessage.includes('motivation') || 
    lowerMessage.includes('lazy') || 
    lowerMessage.includes('procrastinate') ||
    lowerMessage.includes('procrastination') ||
    lowerMessage.includes('can\'t start') ||
    lowerMessage.includes('don\'t feel like') ||
    lowerMessage.includes('putting off')
  ) {
    return {
      text: "Procrastination is often more about emotion management than time management. When we avoid tasks, we're avoiding negative emotions like boredom, anxiety, or self-doubt. Try the '5-Minute Rule': commit to just 5 minutes of work on your task. Once started, you'll likely continue. Remember that motivation often follows action, not the other way around. What specific task are you avoiding right now?",
      followUpQuestions: [
        "What would make this task more enjoyable or meaningful to you?",
        "Have you tried breaking it down into smaller steps?",
        "Would working alongside someone else (virtually or in-person) help you stay accountable?"
      ]
    };
  }
  
  // Greetings
  if (
    lowerMessage.includes('hello') || 
    lowerMessage.includes('hi') || 
    lowerMessage.includes('hey') ||
    lowerMessage.includes('namaste') ||
    lowerMessage.includes('good morning') ||
    lowerMessage.includes('good afternoon') ||
    lowerMessage.includes('good evening')
  ) {
    const auth = getAuth();
    const user = auth.currentUser;
    const name = user?.displayName || user?.email?.split('@')[0] || 'there';
    
    return {
      text: `Hello ${name}! I'm your AI buddy, here to support you through your student journey. How are you feeling today? Is there something specific you'd like to talk about or get help with?`,
      followUpQuestions: [
        "Would you like some tips on studying effectively?",
        "Do you need help managing stress or anxiety?",
        "Are you looking for motivation or focus techniques?"
      ]
    };
  }
  
  // English communication
  if (
    lowerMessage.includes('english') || 
    lowerMessage.includes('speak') || 
    lowerMessage.includes('communication') ||
    lowerMessage.includes('language') ||
    lowerMessage.includes('accent') ||
    lowerMessage.includes('pronunciation') ||
    lowerMessage.includes('grammar')
  ) {
    return {
      text: "Improving English communication is a journey that requires consistent practice. Here are effective strategies: 1) Practice speaking daily, even if just to yourself, 2) Watch English content with subtitles, then without, 3) Read articles aloud, 4) Record yourself speaking and listen back, 5) Find a language exchange partner online. Which aspect of English communication challenges you most - speaking, listening, reading, or writing?",
      followUpQuestions: [
        "Would you like to practice some conversation with me?",
        "Have you tried joining any English speaking clubs?",
        "What English content (shows, podcasts, books) do you enjoy?"
      ]
    };
  }
  
  // Loneliness and social challenges
  if (
    lowerMessage.includes('lonely') || 
    lowerMessage.includes('alone') || 
    lowerMessage.includes('no friends') ||
    lowerMessage.includes('make friends') ||
    lowerMessage.includes('shy') ||
    lowerMessage.includes('introvert') ||
    lowerMessage.includes('isolated')
  ) {
    return {
      text: "Feeling lonely is common, especially in college where social circles are constantly changing. Remember that most meaningful friendships start with shared interests or regular interaction. Consider joining a club related to your interests, volunteering, or participating in study groups. Even small interactions, like asking someone about an assignment, can be the first step toward connection. What's one social situation where you feel most comfortable?",
      followUpQuestions: [
        "What interests or hobbies could connect you with like-minded people?",
        "Have you tried any campus clubs or online communities?",
        "Would you be comfortable reaching out to a classmate to study together?"
      ]
    };
  }
  
  // Learning technology
  if (
    lowerMessage.includes('coding') || 
    lowerMessage.includes('programming') || 
    lowerMessage.includes('developer') ||
    lowerMessage.includes('software') ||
    lowerMessage.includes('web development') ||
    lowerMessage.includes('app development') ||
    lowerMessage.includes('computer science') ||
    lowerMessage.includes('html') ||
    lowerMessage.includes('css') ||
    lowerMessage.includes('javascript') ||
    lowerMessage.includes('python') ||
    lowerMessage.includes('java') ||
    lowerMessage.includes('c++') ||
    lowerMessage.includes('github')
  ) {
    return {
      text: "Learning to code can feel overwhelming at first! The key is consistent practice and building projects you care about. I recommend starting with one language/technology and mastering its basics before expanding. Our Learning Zone has structured paths for Web Development, Data Structures & Algorithms, and GitHub. What specific technology are you interested in learning, and what's your current skill level?",
      followUpQuestions: [
        "Have you built any projects yet?",
        "Do you prefer visual learning or text-based tutorials?",
        "What's your main goal with learning to code?"
      ]
    };
  }
  
  // Health and wellness
  if (
    lowerMessage.includes('health') || 
    lowerMessage.includes('tired') || 
    lowerMessage.includes('sleep') ||
    lowerMessage.includes('exercise') ||
    lowerMessage.includes('diet') ||
    lowerMessage.includes('nutrition') ||
    lowerMessage.includes('eating') ||
    lowerMessage.includes('workout')
  ) {
    return {
      text: "Your physical wellbeing directly impacts your academic performance. As a student, prioritize these basics: 1) Aim for 7-9 hours of consistent sleep, 2) Stay hydrated throughout the day, 3) Include protein and vegetables in your meals, 4) Find exercise you enjoy, even if it's just a 20-minute walk, 5) Take study breaks every 50-90 minutes. Our Self-Care section can help you set reminders for these habits. Which area of health would you like to improve first?",
      followUpQuestions: [
        "How's your sleep quality been lately?",
        "Do you have any physical activity you enjoy?",
        "What's your biggest challenge in maintaining healthy habits?"
      ]
    };
  }
  
  // Default responses that encourage further conversation
  const defaultResponses = [
    {
      text: "I'm here to support you. Could you tell me more specifically what's on your mind? I can help with study techniques, managing stress, improving focus, or just be someone to talk to.",
      followUpQuestions: ["Are you feeling stressed about academics?", "Would you like some productivity tips?", "How's your overall wellbeing right now?"]
    },
    {
      text: "I understand college life can be challenging in many ways. What particular aspect are you finding difficult right now? The more specific you can be, the better I can tailor my support.",
      followUpQuestions: ["Is there a particular course that's challenging you?", "Are you dealing with time management issues?", "Would you like suggestions for balancing your responsibilities?"]
    },
    {
      text: "I'm your AI buddy, here to help with both academic and personal growth. What's something specific you'd like guidance on today? I can provide tips, resources, or just listen.",
      followUpQuestions: ["How are your classes going this semester?", "Are you taking care of your wellbeing?", "Is there a skill you're trying to develop?"]
    },
    {
      text: "Thanks for reaching out! As your student companion, I'm here to support your journey. To help you best, could you share more about what's currently on your mind or what you're hoping to achieve?",
      followUpQuestions: ["What's your biggest challenge right now?", "Are you looking for study strategies?", "Would you like to talk about career planning?"]
    },
    {
      text: "I'm here to be your supportive AI buddy throughout your student journey. To help you meaningfully, could you share what specific area you'd like support with today?",
      followUpQuestions: ["How are you feeling about your academic progress?", "Are you dealing with any stress or anxiety?", "Would you like to discuss effective learning strategies?"]
    }
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
