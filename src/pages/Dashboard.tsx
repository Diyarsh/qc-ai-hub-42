import { useState } from "react";
import { QazCloudLogo } from "@/components/ui/qazcloud-logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatHistory } from "@/hooks/useChatHistory";
import { 
  Activity, 
  TrendingUp, 
  Zap,
  ArrowRight,
  User,
  Bot,
  Send
} from "lucide-react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const { 
    chatSessions, 
    currentSessionId, 
    getCurrentSession, 
    createNewChat, 
    addMessage 
  } = useChatHistory();

  // Sample questions
  const sampleQuestions = [
    "Как настроить корпоративную модель ИИ для анализа договоров?",
    "Какие модели лучше подходят для обработки технической документации?", 
    "Как обеспечить безопасность данных при работе с ИИ-моделями?",
    "Какие возможности есть для автоматизации бизнес-процессов через ИИ?"
  ];


  const handleSendMessage = async (message: string) => {
    let sessionId = currentSessionId;
    
    // Создаем новый чат если его нет
    if (!sessionId) {
      sessionId = createNewChat(message);
    }
    
    // Добавляем сообщение пользователя
    if (sessionId) {
      addMessage(sessionId, message, true);
      setIsLoading(true);
      
      // Симуляция ответа AI
      setTimeout(() => {
        const aiResponses = [
          "Понятно! Я помогу вам с этим вопросом. Какую именно информацию вы хотели бы получить?",
          "Отличный вопрос! Позвольте мне проанализировать это и предоставить подробный ответ.",
          "Я обработал ваш запрос. Вот что я могу предложить по этому поводу...",
          "Интересная задача! Давайте разберем это пошагово.",
          "Основываясь на вашем запросе, я рекомендую следующий подход к решению этой задачи."
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        addMessage(sessionId!, randomResponse, false);
        setIsLoading(false);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleSampleQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSendMessage(message.trim());
        setMessage("");
      }
    }
  };

  const recentProjects = [
    {
      name: "Клиенттердің деректерін талдау",
      status: "Орындалуда",
      type: "Классификация"
    },
    {
      name: "Ұсыныстар жүйесі",
      status: "Аяқталды", 
      type: "ML Pipeline"
    },
    {
      name: "Құжаттарды өңдеу",
      status: "Жоспарлау",
      type: "NLP"
    }
  ];


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Панель управления</h1>
          <p className="text-muted-foreground">Обзор активности AI-платформы</p>
        </div>
        <Button>
          <Zap className="h-4 w-4 mr-2" />
          Создать проект
        </Button>
      </div>

      {/* AI Assistant Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* AI Assistant Card */}
        <div className="w-full">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Мультиагентный Ассистент</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Онлайн
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Добро пожаловать Роман</h3>
                <p className="text-muted-foreground mb-4">
                  Задайте любой вопрос о работе с AI-платформой или попросите помощь в решении задач
                </p>
              </div>

              {/* Chat Input */}
              <div className="flex items-center space-x-2 p-3 bg-background border border-border rounded-lg">
                <Input
                  placeholder="Задайте свой вопрос..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (message.trim()) {
                      handleSendMessage(message.trim());
                      setMessage("");
                    }
                  }}
                  disabled={!message.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Sample Questions */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Популярные вопросы:</p>
                <div className="space-y-2">
                  {sampleQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSampleQuestion(question)}
                      className="w-full h-auto p-3 text-left justify-start text-xs hover:bg-primary/5 hover:border-primary/30 whitespace-normal leading-relaxed"
                    >
                      <span className="text-left break-words">{question}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chat History */}
              {getCurrentSession() && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">История чата:</p>
                  <div className="space-y-3 max-h-60 overflow-y-auto p-3 bg-background/50 border border-border rounded-lg">
                    {getCurrentSession()?.messages.map((msg) => (
                      <div key={msg.id} className={`p-3 rounded-lg ${msg.isUser ? 'bg-primary/10 ml-4' : 'bg-muted mr-4'}`}>
                        <div className="flex items-start gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${msg.isUser ? 'bg-primary text-primary-foreground' : 'bg-primary/20'}`}>
                            {msg.isUser ? 'Р' : <Bot className="h-3 w-3" />}
                          </div>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Bot className="h-4 w-4 animate-pulse" />
                        <span>Обрабатывается...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>



      {/* Model Catalog Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <QazCloudLogo className="h-5 w-5" />
                    Популярные модели
                  </CardTitle>
                  <CardDescription>
                    Рекомендуемые ИИ-модели для ваших задач
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => window.location.href = '/models'}>
                  Смотреть все
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: "QazLLM-Ultra",
                    description: "Суверенная языковая модель для корпоративного сектора",
                    provider: "QazCloud AI-HUB",
                    category: "Текст",
                    rating: 4.9,
                    uses: 156000,
                    functional: true
                  },
                  {
                    name: "GPT-4 Turbo",
                    description: "Продвинутая языковая модель для генерации текста",
                    provider: "OpenAI",
                    category: "Текст",
                    rating: 4.9,
                    uses: 2543000
                  },
                  {
                    name: "Claude 3.5 Sonnet",
                    description: "Мощная модель для анализа и создания контента",
                    provider: "Anthropic",
                    category: "Текст",
                    rating: 4.8,
                    uses: 1876000
                  },
                  {
                    name: "DocAnalyzer AI",
                    description: "ИИ-модель для анализа документов",
                    provider: "QazCloud AI-HUB",
                    category: "Документы",
                    rating: 4.7,
                    uses: 67800
                  }
                ].map((model, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-primary rounded cursor-pointer" onClick={() => window.location.href = '/'}>
                      <QazCloudLogo className="h-3 w-3" />
                    </div>
                    <span className="font-medium text-sm">{model.name}</span>
                  </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{model.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{model.provider}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          if (model.name === "QazLLM-Ultra") {
                            // Make QazLLM functional - navigate to chat
                            window.location.href = '/dashboard';
                          }
                        }}
                      >
                        {model.name === "QazLLM-Ultra" ? "Использовать" : "Использовать"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="lg:col-span-1">
          <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Недавние проекты
            </CardTitle>
            <CardDescription>
              Активные ML-проекты и их статус
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-foreground">{project.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {project.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
