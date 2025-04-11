
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Check, Github, Code, Brain, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  topics: {
    id: string;
    title: string;
    completed: boolean;
    resources: { title: string; url: string }[];
  }[];
  icon: React.ReactNode;
}

const LearningZone = () => {
  const navigate = useNavigate();
  
  // Learning paths data
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: 'webdev',
      title: 'Web Development',
      description: 'Learn HTML, CSS, and JavaScript to build websites',
      icon: <Code className="h-6 w-6 text-purple" />,
      topics: [
        {
          id: 'html-basics',
          title: 'HTML Basics',
          completed: false,
          resources: [
            { title: 'HTML Introduction - W3Schools', url: 'https://www.w3schools.com/html/html_intro.asp' },
            { title: 'Learn HTML - MDN', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML' }
          ]
        },
        {
          id: 'css-basics',
          title: 'CSS Fundamentals',
          completed: false,
          resources: [
            { title: 'CSS Introduction - W3Schools', url: 'https://www.w3schools.com/css/css_intro.asp' },
            { title: 'Learn CSS - MDN', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps' }
          ]
        },
        {
          id: 'js-basics',
          title: 'JavaScript Basics',
          completed: false,
          resources: [
            { title: 'JavaScript Introduction - W3Schools', url: 'https://www.w3schools.com/js/js_intro.asp' },
            { title: 'JavaScript Guide - MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' }
          ]
        }
      ]
    },
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      description: 'Learn fundamental algorithms and data structures',
      icon: <Brain className="h-6 w-6 text-purple" />,
      topics: [
        {
          id: 'arrays',
          title: 'Arrays & Strings',
          completed: false,
          resources: [
            { title: 'Arrays in DSA - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/array-data-structure/' },
            { title: 'Arrays Practice Problems - LeetCode', url: 'https://leetcode.com/tag/array/' }
          ]
        },
        {
          id: 'linked-lists',
          title: 'Linked Lists',
          completed: false,
          resources: [
            { title: 'Linked List Introduction - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-structures/linked-list/' },
            { title: 'Linked List Problems - LeetCode', url: 'https://leetcode.com/tag/linked-list/' }
          ]
        },
        {
          id: 'sorting',
          title: 'Sorting Algorithms',
          completed: false,
          resources: [
            { title: 'Sorting Algorithms - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sorting-algorithms/' },
            { title: 'Visualizing Sorting Algorithms', url: 'https://visualgo.net/en/sorting' }
          ]
        }
      ]
    },
    {
      id: 'github',
      title: 'GitHub & Version Control',
      description: 'Learn how to use Git and GitHub for your projects',
      icon: <Github className="h-6 w-6 text-purple" />,
      topics: [
        {
          id: 'git-basics',
          title: 'Git Basics',
          completed: false,
          resources: [
            { title: 'Git Introduction - GitHub Docs', url: 'https://docs.github.com/en/get-started/using-git/about-git' },
            { title: 'Git Tutorial - Atlassian', url: 'https://www.atlassian.com/git/tutorials/what-is-git' }
          ]
        },
        {
          id: 'github-projects',
          title: 'GitHub Projects',
          completed: false,
          resources: [
            { title: 'GitHub Hello World', url: 'https://docs.github.com/en/get-started/quickstart/hello-world' },
            { title: 'Creating a Repo - GitHub Docs', url: 'https://docs.github.com/en/get-started/quickstart/create-a-repo' }
          ]
        },
        {
          id: 'collaboration',
          title: 'Collaboration with Git',
          completed: false,
          resources: [
            { title: 'Pull Requests - GitHub Docs', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests' },
            { title: 'Contributing to Projects', url: 'https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project' }
          ]
        }
      ]
    },
    {
      id: 'ai',
      title: 'AI & Machine Learning',
      description: 'Learn about artificial intelligence and machine learning basics',
      icon: <Server className="h-6 w-6 text-purple" />,
      topics: [
        {
          id: 'ai-intro',
          title: 'Introduction to AI',
          completed: false,
          resources: [
            { title: 'AI for Everyone - Coursera', url: 'https://www.coursera.org/learn/ai-for-everyone' },
            { title: 'Introduction to AI - Elements of AI', url: 'https://www.elementsofai.com/' }
          ]
        },
        {
          id: 'ml-basics',
          title: 'Machine Learning Basics',
          completed: false,
          resources: [
            { title: 'Introduction to Machine Learning', url: 'https://www.kaggle.com/learn/intro-to-machine-learning' },
            { title: 'Machine Learning Crash Course - Google', url: 'https://developers.google.com/machine-learning/crash-course' }
          ]
        },
        {
          id: 'ai-tools',
          title: 'AI Tools for Students',
          completed: false,
          resources: [
            { title: 'Using ChatGPT for Learning', url: 'https://www.classcentral.com/report/chatgpt-for-education/' },
            { title: 'AI Tools for Students', url: 'https://www.notion.so/blog/ai-tools-for-students' }
          ]
        }
      ]
    }
  ]);

  // Toggle completion status of a topic
  const toggleTopicCompletion = (pathId: string, topicId: string) => {
    setLearningPaths(prevPaths => 
      prevPaths.map(path => {
        if (path.id === pathId) {
          return {
            ...path,
            topics: path.topics.map(topic => {
              if (topic.id === topicId) {
                return { ...topic, completed: !topic.completed };
              }
              return topic;
            })
          };
        }
        return path;
      })
    );
  };

  // Calculate progress for a learning path
  const calculateProgress = (pathId: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) return 0;
    
    const totalTopics = path.topics.length;
    const completedTopics = path.topics.filter(topic => topic.completed).length;
    
    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-light/30 to-blue-light/30 pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-purple-dark">Learning Zone</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-purple-dark mb-6">Choose Your Learning Path</h2>
        
        <Tabs defaultValue="webdev" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {learningPaths.map(path => (
              <TabsTrigger key={path.id} value={path.id} className="flex items-center gap-2">
                {path.icon}
                <span className="hidden md:inline">{path.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {learningPaths.map(path => (
            <TabsContent key={path.id} value={path.id} className="space-y-4">
              <Card className="gradient-card border-purple-light/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {path.icon}
                    {path.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{path.description}</p>
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{calculateProgress(path.id)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-purple h-2.5 rounded-full" 
                        style={{ width: `${calculateProgress(path.id)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {path.topics.map(topic => (
                      <div key={topic.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{topic.title}</h3>
                          <Button
                            variant={topic.completed ? "default" : "outline"}
                            size="sm"
                            className={topic.completed ? "btn-gradient" : "border-purple text-purple"}
                            onClick={() => toggleTopicCompletion(path.id, topic.id)}
                          >
                            {topic.completed ? (
                              <><Check className="h-4 w-4 mr-1" /> Completed</>
                            ) : (
                              "Mark as Complete"
                            )}
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm text-muted-foreground">Learning Resources:</h4>
                          <ul className="space-y-1">
                            {topic.resources.map((resource, index) => (
                              <li key={index} className="text-sm">
                                <a 
                                  href={resource.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-purple hover:underline flex items-center"
                                >
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  {resource.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default LearningZone;
