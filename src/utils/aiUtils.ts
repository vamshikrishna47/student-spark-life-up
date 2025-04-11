
import { getAuth } from "firebase/auth";

interface AiResponse {
  text: string;
  followUpQuestions?: string[];
}

// Student-focused AI response patterns with more context-aware replies
export const getAIResponse = (message: string): AiResponse => {
  const lowerMessage = message.toLowerCase();
  
  // Process the user's message and provide a relevant response
  // First check for specific topics/keywords
  
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
  
  // Study techniques
  if (
    lowerMessage.includes('study') || 
    lowerMessage.includes('exam') || 
    lowerMessage.includes('test') ||
    lowerMessage.includes('assignment') ||
    lowerMessage.includes('homework') ||
    lowerMessage.includes('learning') ||
    lowerMessage.includes('memorize') ||
    lowerMessage.includes('remember')
  ) {
    return {
      text: "Effective studying starts with understanding your learning style. Try these evidence-based techniques: 1) Spaced repetition - review material at increasing intervals, 2) Active recall - test yourself instead of rereading, 3) The Pomodoro Technique - 25 minutes of focused work followed by a 5-minute break, 4) Explain concepts in your own words. What subject are you currently studying?",
      followUpQuestions: [
        "Have you tried any particular study methods before?",
        "Do you prefer studying alone or in groups?",
        "What's your biggest challenge when trying to study?"
      ]
    };
  }

  // Technology learning
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
  
  // English improvement
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

  // For other inputs, provide a general but thoughtful response that encourages further conversation
  return {
    text: `I see you mentioned "${message}". Tell me more about what's on your mind. I'm here to help with any challenges you're facing as a student - whether it's academic pressure, social concerns, or personal growth. The more specific you can be, the better I can tailor my support to your needs.`,
    followUpQuestions: [
      "What specific aspect of this would you like help with?",
      "How has this been affecting your studies or well-being?",
      "What have you tried so far to address this?"
    ]
  };
};

// Note: To integrate with Gemini API in the future, we would implement a function like this:
/*
export const getGeminiResponse = async (message: string): Promise<AiResponse> => {
  try {
    const apiKey = "AIzaSyCmZQUFSE7rDHMCKD7yNvYIBwc8QUsD3IE"; // API key from user
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a supportive AI buddy for a college student. 
                       Respond to this message in a helpful, empathetic way: "${message}"
                       Provide 3 follow-up questions at the end of your response.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        }
      }),
    });
    
    const data = await response.json();
    
    // Parse response and format it
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content) {
      const text = data.candidates[0].content.parts[0].text;
      
      // Extract follow-up questions (this is a simplistic approach)
      const lines = text.split('\n');
      const followUpQuestions = lines
        .filter(line => line.includes('?') && line.length < 100)
        .slice(-3);
      
      return {
        text: text.split('Follow-up questions:')[0].trim(),
        followUpQuestions: followUpQuestions.length > 0 ? followUpQuestions : undefined
      };
    }
    
    throw new Error('Invalid response format from Gemini API');
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return getAIResponse(message); // Fallback to local responses
  }
};
*/
