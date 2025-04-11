
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Placeholder AI responses based on keywords or patterns
const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('stressed')) {
    return "I understand feeling anxious can be overwhelming. Try taking a few deep breaths - inhale for 4 counts, hold for 4, and exhale for 6. Remember that these feelings are temporary, and you have overcome challenges before. Would you like to talk more about what's causing your anxiety?";
  }
  
  if (lowerMessage.includes('social media') || lowerMessage.includes('addicted') || lowerMessage.includes('distracted')) {
    return "Social media addiction is common among students. Consider setting specific time blocks for checking apps, and use focus apps to block distractions during study time. What specific apps do you find most distracting?";
  }
  
  if (lowerMessage.includes('motivation') || lowerMessage.includes('lazy') || lowerMessage.includes('procrastinate')) {
    return "Finding motivation can be challenging! Try breaking your tasks into smaller, manageable chunks and reward yourself after completing each one. The Pomodoro technique in our Focus section might help too. What's one small task you could start with today?";
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm your AI buddy, here to support your student journey. How are you feeling today? Is there something specific you'd like to talk about?";
  }
  
  if (lowerMessage.includes('english') || lowerMessage.includes('speak') || lowerMessage.includes('communication')) {
    return "Improving English communication takes practice and patience. Try reading articles aloud, watching English shows with subtitles, or finding a conversation partner. Our English Practice section has more structured exercises too. What aspect of English communication challenges you most?";
  }
  
  if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('no friends')) {
    return "Feeling lonely is a common experience, especially in college. Consider joining a club related to your interests, attending campus events, or volunteering. Sometimes small interactions, like asking a classmate about an assignment, can be the first step to meaningful connections. What's one social situation where you feel most comfortable?";
  }
  
  // Default responses for when no pattern is matched
  const defaultResponses = [
    "I'm here to support you. Could you tell me more about that?",
    "That's interesting! How does that make you feel?",
    "I understand. What do you think would help in this situation?",
    "Thank you for sharing that with me. Would you like some suggestions or just someone to listen?",
    "I'm here to help you navigate this. What would be a small step forward for you?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

const AiBuddyChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your AI buddy, here to support you through your student journey. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(userMessage.text),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-light/30 to-blue-light/30">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-purple-dark">AI Buddy Chat</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <Card className="gradient-card border-purple-light/30 min-h-[70vh] flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-purple text-white' 
                        : 'bg-white border border-purple-light/50 text-foreground'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-white border border-purple-light/50">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple" />
                      <p className="text-sm text-muted-foreground">AI is thinking...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <div className="p-4 border-t border-border">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex space-x-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1"
              />
              <Button type="submit" className="btn-gradient">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AiBuddyChat;
