
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAIResponse } from '../utils/aiUtils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  followUpQuestions?: string[];
}

const AiBuddyChat = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Try to get messages from localStorage
    const savedMessages = localStorage.getItem('aiBuddyChatMessages');
    if (savedMessages) {
      try {
        // Parse the saved messages and convert timestamp strings back to Date objects
        const parsed = JSON.parse(savedMessages);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
    
    // Default welcome message
    return [
      {
        id: '1',
        text: "Hi there! I'm your AI buddy, here to support you through your student journey. How are you feeling today?",
        sender: 'ai',
        timestamp: new Date(),
        followUpQuestions: [
          "Would you like some tips on studying effectively?",
          "Are you dealing with stress or anxiety?",
          "Do you need help with time management?"
        ]
      }
    ];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  // Save messages to localStorage when they change
  useEffect(() => {
    localStorage.setItem('aiBuddyChatMessages', JSON.stringify(messages));
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setSelectedQuestion(null);
    setIsLoading(true);
    
    // Get AI response with slight delay to simulate thinking
    setTimeout(() => {
      const aiResponseData = getAIResponse(userMessage.text);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseData.text,
        followUpQuestions: aiResponseData.followUpQuestions,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    setInputValue(question);
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
                    <p className="whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    
                    {/* Follow-up questions */}
                    {message.sender === 'ai' && message.followUpQuestions && message.followUpQuestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Suggested questions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.followUpQuestions.map((question, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className={`text-xs text-left ${
                                selectedQuestion === question 
                                  ? 'bg-purple-light/20 border-purple' 
                                  : 'border-purple-light/30'
                              }`}
                              onClick={() => handleQuestionClick(question)}
                            >
                              {question}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
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
