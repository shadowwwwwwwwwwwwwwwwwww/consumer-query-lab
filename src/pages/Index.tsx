
import React, { useState, useEffect } from 'react';
import { FlaskConical, Skull, ChevronRight, RotateCcw, Droplets } from 'lucide-react';
import ThreeDAnimation from '../components/ThreeDAnimation';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image?: string;
}

interface Answer {
  questionId: number;
  selectedAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which AI technique is most commonly used in credit risk assessment?",
    options: ["Neural Networks", "Decision Trees", "Simple Linear Regression", "Random Number Generation"],
    correctAnswer: 0,
    explanation: "Neural Networks are particularly effective in credit risk assessment as they can process multiple variables simultaneously and identify complex patterns in financial data that might indicate credit risk.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    question: "What is the primary advantage of using AI in fraud detection?",
    options: ["Real-time monitoring", "Lower costs", "Fewer staff needed", "Simpler processes"],
    correctAnswer: 0,
    explanation: "Real-time monitoring through AI allows financial institutions to detect and prevent fraudulent transactions as they happen, rather than discovering fraud after the fact, significantly reducing financial losses.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    question: "Which of these is NOT a common application of AI in customer support?",
    options: ["Physical branch replacement", "Chatbots", "Sentiment analysis", "Query routing"],
    correctAnswer: 0,
    explanation: "While AI enhances customer support through various channels, it's not typically used to replace physical branches. Instead, it complements existing services through chatbots, sentiment analysis, and intelligent routing of customer queries."
  },
  {
    id: 4,
    question: "What type of data is most crucial for training AI fraud detection systems?",
    options: ["Historical transaction data", "Customer demographics", "Social media data", "Market trends"],
    correctAnswer: 0,
    explanation: "Historical transaction data is essential for training AI fraud detection systems as it contains patterns of both legitimate and fraudulent transactions, allowing the AI to learn and identify suspicious activities.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    question: "Which machine learning approach is best suited for anomaly detection in financial transactions?",
    options: ["Unsupervised learning", "Supervised learning", "Reinforcement learning", "Transfer learning"],
    correctAnswer: 0,
    explanation: "Unsupervised learning is ideal for anomaly detection as it can identify unusual patterns without requiring labeled training data, making it effective at detecting new, previously unseen types of fraud."
  },
  {
    id: 6,
    question: "What is a key challenge in implementing AI-based customer support?",
    options: ["Understanding context", "Server costs", "Visual recognition", "Data storage"],
    correctAnswer: 0,
    explanation: "Understanding context is a major challenge in AI-based customer support as financial queries often require comprehending complex situations and previous interactions to provide accurate assistance."
  },
  {
    id: 7,
    question: "Which factor is most important in AI risk assessment models?",
    options: ["Data quality", "Processing speed", "Visual interface", "Cloud storage"],
    correctAnswer: 0,
    explanation: "Data quality is crucial for AI risk assessment models as poor or biased data can lead to incorrect risk evaluations and potentially costly financial decisions.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    question: "What is the main benefit of AI in regulatory compliance?",
    options: ["Automated monitoring", "Reduced paperwork", "Lower costs", "Faster reporting"],
    correctAnswer: 0,
    explanation: "Automated monitoring through AI enables continuous compliance checking, helping financial institutions identify and address regulatory violations in real-time before they become serious issues."
  },
  {
    id: 9,
    question: "Which AI technology is most effective for customer sentiment analysis?",
    options: ["Natural Language Processing", "Computer Vision", "Robotics", "Blockchain"],
    correctAnswer: 0,
    explanation: "Natural Language Processing (NLP) is most effective for sentiment analysis as it can understand and analyze human language, including tone, context, and emotions in customer communications."
  },
  {
    id: 10,
    question: "What is a key advantage of machine learning in credit scoring?",
    options: ["Dynamic adaptation", "Fixed rules", "Manual review", "Standard reporting"],
    correctAnswer: 0,
    explanation: "Dynamic adaptation allows machine learning models to continuously learn from new data and adjust credit scoring criteria, making them more accurate and responsive to changing financial patterns and behaviors."
  }
];

const Index = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    if (isUserInfoSubmitted && !showAnimation && !showQuestions && !showResults) {
      setShowAnimation(true);
    }
  }, [isUserInfoSubmitted, showAnimation, showQuestions, showResults]);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    setShowQuestions(true);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === questions[currentQuestion].id);
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex].selectedAnswer = optionIndex;
    } else {
      newAnswers.push({ questionId: questions[currentQuestion].id, selectedAnswer: optionIndex });
    }
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = answers.filter(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      return question?.correctAnswer === answer.selectedAnswer;
    }).length;
    setScore(correctAnswers);
    setShowResults(true);
    setShowQuestions(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setScore(0);
    setIsUserInfoSubmitted(false);
    setShowQuestions(false);
    setUserName('');
    setEmail('');
  };

  const getSelectedAnswer = (questionId: number) => {
    return answers.find(a => a.questionId === questionId)?.selectedAnswer;
  };

  // User info submission screen
  if (!isUserInfoSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 text-green-400 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <FlaskConical className="w-6 h-6 text-green-400" />
            <h1 className="text-2xl font-bold">AI Insight Vault</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={() => {
              if (userName && email) {
                setIsUserInfoSubmitted(true);
              } else {
                alert("Please enter both username and email.");
              }
            }}
            className="w-full bg-green-500 text-gray-900 px-6 py-3 rounded-lg hover:bg-green-400 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // 3D animation screen
  if (showAnimation) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <ThreeDAnimation onComplete={handleAnimationComplete} />
      </div>
    );
  }

  // Results screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-900 text-green-400 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-gray-800 rounded-xl shadow-2xl p-8 relative animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="w-6 h-6 text-green-400" />
            <h1 className="text-3xl font-bold">Quiz Results</h1>
          </div>

          <div className="text-center py-8 mb-6">
            <h2 className="text-2xl font-medium mb-2">Hello, {userName}!</h2>
            <div className="flex items-center justify-center gap-2 text-3xl font-bold mb-4">
              <span>Your Score:</span>
              <div className="px-4 py-2 bg-gray-700 rounded-lg">{score} / {questions.length}</div>
            </div>
            <div className="inline-block px-4 py-2 rounded-full border-2 border-green-500 mt-2">
              {score >= 7 ? (
                <span className="flex items-center gap-2 text-lg font-medium text-green-400">
                  <FlaskConical className="w-5 h-5" />Expert Analyst
                </span>
              ) : score >= 4 ? (
                <span className="flex items-center gap-2 text-lg font-medium text-yellow-400">
                  <Droplets className="w-5 h-5" />Informed Observer
                </span>
              ) : (
                <span className="flex items-center gap-2 text-lg font-medium text-red-400">
                  <Skull className="w-5 h-5" />Needs Practice
                </span>
              )}
            </div>
          </div>

          <div className="bg-gray-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Review Your Answers</h3>
            
            {questions.map((q, index) => {
              const selectedAnswer = getSelectedAnswer(q.id);
              const isCorrect = selectedAnswer === q.correctAnswer;
              
              return (
                <div key={q.id} className={`mb-6 p-4 rounded-lg ${isCorrect ? 'bg-green-900/20' : 'bg-red-900/20'}`}>
                  <p className="font-medium mb-2">
                    {index + 1}. {q.question}
                  </p>
                  
                  <div className="flex flex-col gap-2 mt-3 mb-3">
                    {q.options.map((option, i) => (
                      <div
                        key={i}
                        className={`px-3 py-2 rounded-md text-sm flex items-center ${
                          i === q.correctAnswer
                            ? 'bg-green-700/30 border border-green-500'
                            : i === selectedAnswer
                            ? 'bg-red-700/30 border border-red-500'
                            : 'bg-gray-700'
                        }`}
                      >
                        <div className="mr-2">
                          {i === q.correctAnswer ? (
                            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                              ✓
                            </div>
                          ) : i === selectedAnswer ? (
                            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                              ✗
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-500"></div>
                          )}
                        </div>
                        {option}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-300 mt-2 p-3 bg-gray-800 rounded-md">
                    <span className="font-medium text-green-400">Explanation:</span> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
          
          <button
            onClick={resetQuiz}
            className="flex items-center justify-center gap-2 mx-auto bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" /> Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  // Questions screen
  if (showQuestions) {
    const question = questions[currentQuestion];
    const hasAnsweredCurrent = answers.some(a => a.questionId === question.id);
    const isLastQuestion = currentQuestion === questions.length - 1;
    const hasAnsweredAll = answers.length === questions.length;

    return (
      <div className="min-h-screen bg-gray-900 text-green-400 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-gray-800 rounded-xl shadow-2xl p-8 relative animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <FlaskConical className="w-5 h-5 text-green-400" />
            <h1 className="text-2xl font-bold">Study of Consumer Behavior</h1>
          </div>
          <p className="text-sm text-gray-400 mb-6 ml-8">Understanding consumer perspectives and decision-making patterns in modern markets</p>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-gray-700 text-sm px-3 py-1 rounded-full">
                Question {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-gray-700 h-1.5 rounded-full w-32">
                <div
                  className="bg-green-500 h-full rounded-full"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{question.question}</h2>

            {question.image && (
              <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
                <img
                  src={question.image}
                  alt="Question illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-3 mt-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`flex items-center gap-3 p-4 rounded-lg text-left transition-colors ${
                    getSelectedAnswer(question.id) === index
                      ? 'bg-green-700/50 border border-green-500'
                      : 'bg-gray-800 hover:bg-gray-700 border border-gray-600'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      getSelectedAnswer(question.id) === index
                        ? 'border-green-500 bg-green-500 text-gray-900'
                        : 'border-gray-500'
                    }`}
                  >
                    {getSelectedAnswer(question.id) === index ? '✓' : ''}
                  </div>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                currentQuestion === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              Previous
            </button>

            {isLastQuestion && hasAnsweredCurrent ? (
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-gray-900 px-6 py-2 rounded-lg hover:bg-green-400 transition-colors flex items-center gap-2"
              >
                Finish Quiz <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (hasAnsweredCurrent) {
                    setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1));
                  }
                }}
                disabled={!hasAnsweredCurrent}
                className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                  !hasAnsweredCurrent
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-gray-900 hover:bg-green-400'
                }`}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {hasAnsweredAll && !isLastQuestion && (
            <div className="mt-4 text-center">
              <button
                onClick={handleSubmit}
                className="text-green-400 hover:text-green-300 underline text-sm"
              >
                Skip to results
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
