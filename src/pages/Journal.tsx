
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, BookOpen, PenSquare, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  createdAt: Date;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const handleSaveEntry = () => {
    if (!currentEntry.trim()) {
      toast({
        variant: 'destructive',
        title: 'Cannot save empty entry',
        description: 'Please write something before saving.',
      });
      return;
    }

    const now = new Date();
    
    if (selectedEntry) {
      // Update existing entry
      const updatedEntries = entries.map(entry => 
        entry.id === selectedEntry.id 
          ? { ...entry, content: currentEntry, date: formatDate(now) } 
          : entry
      );
      setEntries(updatedEntries);
      toast({
        title: 'Entry updated',
        description: 'Your journal entry has been updated.',
      });
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: formatDate(now),
        content: currentEntry,
        createdAt: now
      };
      setEntries([newEntry, ...entries]);
      toast({
        title: 'Entry saved',
        description: 'Your journal entry has been saved.',
      });
    }
    
    // Reset form
    setCurrentEntry('');
    setSelectedEntry(null);
    setIsEditing(false);
  };

  const handleSelectEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setCurrentEntry(entry.content);
    setIsEditing(false);
  };

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
      setCurrentEntry('');
    }
    
    toast({
      title: 'Entry deleted',
      description: 'Your journal entry has been deleted.',
    });
  };

  const startNewEntry = () => {
    setSelectedEntry(null);
    setCurrentEntry('');
    setIsEditing(true);
  };

  // Journal prompts for inspiration
  const journalPrompts = [
    "What made you smile today?",
    "What's one challenge you're facing right now, and what resources might help?",
    "Describe a small win you had today, no matter how tiny.",
    "What's something you learned recently that surprised you?",
    "If you could give advice to yourself from last week, what would it be?",
    "What are you grateful for today?",
    "What's one thing you'd like to accomplish tomorrow?",
    "How did you practice self-care today?",
    "What's a skill you're working on improving? How's your progress?",
    "Describe a conversation that impacted you recently."
  ];
  
  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length);
    return journalPrompts[randomIndex];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-light/30 to-blue-light/30 pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-purple-dark">Journal</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Entry List */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-purple-dark">Your Entries</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-purple" 
                  onClick={startNewEntry}
                >
                  <PenSquare className="h-4 w-4 mr-1" />
                  New
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto">
                {entries.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No entries yet. Start writing!
                  </p>
                ) : (
                  entries.map((entry) => (
                    <div 
                      key={entry.id} 
                      className={`p-3 rounded-md cursor-pointer hover:bg-purple-light/20 transition-colors ${
                        selectedEntry?.id === entry.id ? 'bg-purple-light/30 border border-purple/20' : ''
                      }`}
                      onClick={() => handleSelectEntry(entry)}
                    >
                      <h3 className="font-medium mb-1 text-purple-dark">{entry.date}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {entry.content}
                      </p>
                      <div className="flex justify-end mt-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEntry(entry.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Journal Editor */}
          <div className="md:col-span-2">
            <Card className="gradient-card border-purple-light/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg text-purple-dark">
                  {isEditing 
                    ? 'Write a New Entry' 
                    : selectedEntry 
                      ? selectedEntry.date 
                      : 'Select or create an entry'}
                </CardTitle>
                <div className="flex space-x-2">
                  {!isEditing && selectedEntry && (
                    <Button 
                      variant="outline" 
                      className="text-purple"
                      onClick={() => setIsEditing(true)}
                    >
                      <PenSquare className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                  {(isEditing || selectedEntry) && (
                    <Button 
                      className="btn-gradient"
                      onClick={handleSaveEntry}
                      disabled={!isEditing}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!selectedEntry && !isEditing ? (
                  <div className="text-center py-12 space-y-4">
                    <BookOpen className="h-16 w-16 mx-auto text-purple-light" />
                    <h3 className="text-xl font-medium text-purple-dark">Your Journal Awaits</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Select an entry from the list or create a new one to start writing.
                    </p>
                    <Button 
                      className="btn-gradient mt-4"
                      onClick={startNewEntry}
                    >
                      <PenSquare className="h-4 w-4 mr-2" />
                      Start Writing
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isEditing && (
                      <div className="bg-purple-light/20 p-4 rounded-md">
                        <h4 className="font-medium text-purple-dark mb-2">Need inspiration?</h4>
                        <p className="text-muted-foreground italic">
                          "{getRandomPrompt()}"
                        </p>
                      </div>
                    )}
                    <Textarea 
                      value={currentEntry}
                      onChange={(e) => setCurrentEntry(e.target.value)}
                      placeholder="What's on your mind today?"
                      className="min-h-[300px]"
                      disabled={!isEditing}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;
