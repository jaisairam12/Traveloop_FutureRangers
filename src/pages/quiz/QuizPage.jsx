import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { quizQuestions } from '../../data/mockData';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';

export default function QuizPage() {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);
  const total = quizQuestions.length;
  const isComplete = step >= total;

  const select = (optionId) => {
    setAnswers({ ...answers, [step]: optionId });
  };

  const next = () => {
    setDirection(1);
    setStep(s => s + 1);
  };

  const prev = () => {
    setDirection(-1);
    setStep(s => s - 1);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className={`min-h-screen flex flex-col ${dark ? 'bg-dark-bg' : 'bg-light-bg'} relative overflow-hidden`}>
      {/* Background mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />

      {/* Header */}
      <div className="relative z-10 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Globe className="text-white" size={16} />
              </div>
              <span className="font-outfit font-bold">Traveloop Quiz</span>
            </div>
            <span className={`text-sm font-medium ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
              {isComplete ? 'Complete!' : `${step + 1} of ${total}`}
            </span>
          </div>
          <ProgressBar value={isComplete ? total : step} max={total} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 w-full">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            {!isComplete ? (
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-full text-center flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-full"
                >
                  <h2 className="font-outfit text-2xl sm:text-4xl font-bold mb-2">
                    {quizQuestions[step].question}
                  </h2>
                  <p className={`text-sm sm:text-base mb-8 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                    {quizQuestions[step].subtitle}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {quizQuestions[step].options.map((opt, i) => {
                    const selected = answers[step] === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.08 }}
                        onClick={() => select(opt.id)}
                        className={`relative p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 cursor-pointer group min-h-[200px] justify-center
                          ${selected
                            ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                            : ''
                          }
                          ${dark
                            ? 'bg-dark-card border border-dark-border hover:border-primary/50'
                            : 'bg-white border border-light-border hover:border-primary/50 shadow-sm'
                          }
                        `}
                      >
                        {selected && (
                          <motion.div
                            layoutId="quiz-check"
                            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                          >
                            <Check size={14} className="text-white" />
                          </motion.div>
                        )}

                        <span className="text-4xl mb-4 block">{opt.icon}</span>
                        <h3 className="font-outfit font-bold text-lg mb-2">{opt.label}</h3>
                        <p className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{opt.desc}</p>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Navigation inside content for better placement */}
                <div className="w-full flex justify-between mt-12">
                  <Button
                    variant="ghost"
                    onClick={prev}
                    disabled={step === 0}
                    icon={<ArrowLeft size={18} />}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={next}
                    disabled={!answers[step]}
                    iconRight={<ArrowRight size={18} />}
                  >
                    {step === total - 1 ? 'See Results' : 'Next'}
                  </Button>
                </div>
              </motion.div>
            ) : (
              /* Summary */
              <motion.div
                key="summary"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full text-center flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6"
                >
                  <Sparkles size={40} className="text-white" />
                </motion.div>
                <h2 className="font-outfit text-3xl font-bold mb-3">You're All Set! 🎉</h2>
                <p className={`text-lg mb-8 max-w-md mx-auto ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                  Based on your preferences, we'll match you with the perfect trip planner and recommend personalized destinations.
                </p>

                <div className={`w-full rounded-2xl p-6 mb-8 ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-light-border'}`}>
                  <h3 className="font-outfit font-bold mb-4">Your Travel Profile</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {Object.entries(answers).map(([qIdx, optId]) => {
                      const q = quizQuestions[parseInt(qIdx)];
                      const opt = q.options.find(o => o.id === optId);
                      return opt ? (
                        <span key={optId} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {opt.icon} {opt.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button onClick={() => navigate('/dashboard/user')} size="lg" icon={<Sparkles size={18} />}>
                    View Matches
                  </Button>
                  <Button onClick={() => navigate('/explore')} variant="outline" size="lg">
                    Explore Trips
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
