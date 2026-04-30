'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useDriverGetKnowledgeTestQuestionsQuery,
  useDriverSubmitKnowledgeTestMutation,
  useDriverGetProfileQuery,
} from '@/lib/api';
import type { KnowledgeTestQuestion, KnowledgeTestResult } from '@/lib/types';
import { toast, Toaster } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';

export default function KnowledgeTestPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<KnowledgeTestResult | null>(null);

  const {
    data: questions,
    isLoading: questionsLoading,
    error: questionsError,
  } = useDriverGetKnowledgeTestQuestionsQuery();

  const {
    data: profile,
    isLoading: profileLoading,
  } = useDriverGetProfileQuery();

  const [submitTest, { isLoading: submitting }] = useDriverSubmitKnowledgeTestMutation();

  useEffect(() => {
    if (profile?.knowledgeTestPassed) {
      router.push('/driver/dashboard');
    }
  }, [profile, router]);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const getOptionEntries = (options: KnowledgeTestQuestion['options']) => {
    if (Array.isArray(options)) {
      const letters = ['A', 'B', 'C', 'D'];
      return options.map((value, index) => [letters[index], value] as [string, string]);
    }
    return Object.entries(options);
  };

  const handleNext = () => {
    if (questions && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (!questions) return;

    // Check if all questions are answered
    const unanswered = questions.filter(q => !answers[q.id]);
    if (unanswered.length > 0) {
      toast.error(`Please answer all questions. ${unanswered.length} remaining.`);
      return;
    }

    try {
      const result = await submitTest({ answers }).unwrap();
      setResults(result);
      setShowResults(true);

      if (result.passed) {
        toast.success('Congratulations! You passed the knowledge test.');
      } else {
        toast.error('Test failed. You need at least 5 correct answers.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data?.error || 'Failed to submit test');
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setResults(null);
  };

  if (profileLoading || questionsLoading) {
    return (
      <div className='min-h-screen bg-[#090a3f] flex items-center justify-center'>
        <div className='text-white text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4'></div>
          <p>Loading knowledge test...</p>
        </div>
      </div>
    );
  }

  if (questionsError) {
    return (
      <div className='min-h-screen bg-[#090a3f] flex items-center justify-center'>
        <div className='text-white text-center'>
          <p>Failed to load test questions. Please try again.</p>
          <Link
            href='/driver/dashboard'
            className='mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700'
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (profile?.knowledgeTestPassed) {
    return (
      <div className='min-h-screen bg-[#090a3f] flex items-center justify-center'>
        <div className='text-white text-center'>
          <p>You have already passed the knowledge test.</p>
          <Link
            href='/driver/dashboard'
            className='mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700'
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (showResults && results) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <Toaster position='top-center' richColors toastOptions={{ className: '!text-base' }} />
        <div className='max-w-4xl mx-auto px-4'>
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <h1 className='text-3xl font-bold text-center mb-8'>Test Results</h1>

            <div className='text-center mb-8'>
              <div className={`text-2xl font-bold mb-4 ${results.passed ? 'text-green-600' : 'text-red-600'}`}>
                {results.passed ? 'PASSED' : 'FAILED'}
              </div>
              <p className='text-lg'>
                Score: {results.correctCount} / {results.totalQuestions}
              </p>
              <p className='text-sm text-gray-600 mt-2'>
                {results.passed
                  ? 'Congratulations! You can now create an application.'
                  : 'You need at least 5 correct answers to pass. You can retake the test.'
                }
              </p>
            </div>

            <div className='space-y-4 mb-8'>
              {results.results.map((result, index) => (
                <div key={result.questionId} className='border rounded-lg p-4'>
                  <div className='flex items-start gap-4'>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      result.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {index + 1}
                    </span>
                    <div className='flex-1'>
                      <p className='font-medium mb-2'>
                        Question {result.questionId}
                      </p>
                      <p className='text-sm text-gray-600 mb-2'>
                        Your answer: <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {result.userAnswer}
                        </span>
                        {!result.isCorrect && (
                          <span className='text-green-600 ml-2'>
                            (Correct: {result.correctAnswer})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex justify-center gap-4'>
              {!results.passed && (
                <button
                  onClick={handleRetake}
                  className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700'
                >
                  Retake Test
                </button>
              )}
              <Link
                href='/driver/dashboard'
                className='bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700'
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!questions) return null;

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <Toaster position='top-center' richColors toastOptions={{ className: '!text-base' }} />
      <div className='max-w-4xl mx-auto px-4'>
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <div className='mb-8'>
            <div className='flex justify-between items-center mb-4'>
              <h1 className='text-2xl font-bold'>Driver Knowledge Test</h1>
              <span className='text-sm text-gray-600'>
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className='mb-8'>
            <h2 className='text-xl font-semibold mb-6'>{currentQ.question}</h2>
            <div className='space-y-3'>
              {getOptionEntries(currentQ.options).map(([key, value]) => (
                <label key={key} className='flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50'>
                  <input
                    type='radio'
                    name={`question-${currentQ.id}`}
                    value={key}
                    checked={answers[currentQ.id] === key}
                    onChange={() => handleAnswerSelect(currentQ.id, key)}
                    className='w-4 h-4 text-blue-600'
                  />
                  <span className='font-medium text-blue-600 mr-2'>{key}.</span>
                  <span className='flex-1'>{value}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='flex justify-between'>
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className='px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400'
              >
                {submitting ? 'Submitting...' : 'Submit Test'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}