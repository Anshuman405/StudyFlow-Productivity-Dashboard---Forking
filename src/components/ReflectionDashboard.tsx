import React, { useState } from 'react';
import { TrendingUpIcon, BarChart2Icon, PieChartIcon, SmileIcon, MehIcon, FrownIcon, CalendarIcon, ClockIcon, CheckCircleIcon, BookOpenIcon } from 'lucide-react';
export const ReflectionDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [currentMood, setCurrentMood] = useState('neutral');
  // Mock data for charts and stats
  const studyStats = {
    totalHours: 14.5,
    completedTasks: 12,
    totalTasks: 15,
    streak: 7,
    averageHoursPerDay: 2.1
  };
  const subjectBreakdown = [{
    subject: 'Mathematics',
    hours: 4.5,
    color: 'bg-blue-500'
  }, {
    subject: 'Physics',
    hours: 3.2,
    color: 'bg-indigo-500'
  }, {
    subject: 'Chemistry',
    hours: 2.8,
    color: 'bg-green-500'
  }, {
    subject: 'Biology',
    hours: 2.0,
    color: 'bg-yellow-500'
  }, {
    subject: 'History',
    hours: 1.5,
    color: 'bg-red-500'
  }, {
    subject: 'English',
    hours: 0.5,
    color: 'bg-purple-500'
  }];
  const moodHistory = [{
    day: 'Mon',
    mood: 'happy'
  }, {
    day: 'Tue',
    mood: 'happy'
  }, {
    day: 'Wed',
    mood: 'neutral'
  }, {
    day: 'Thu',
    mood: 'sad'
  }, {
    day: 'Fri',
    mood: 'neutral'
  }, {
    day: 'Sat',
    mood: 'happy'
  }, {
    day: 'Sun',
    mood: 'happy'
  }];
  const getMoodIcon = (mood, size = 24) => {
    switch (mood) {
      case 'happy':
        return <SmileIcon size={size} className="text-green-500" />;
      case 'neutral':
        return <MehIcon size={size} className="text-yellow-500" />;
      case 'sad':
        return <FrownIcon size={size} className="text-red-500" />;
      default:
        return <MehIcon size={size} className="text-gray-500" />;
    }
  };
  const totalHours = subjectBreakdown.reduce((sum, item) => sum + item.hours, 0);
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Reflection Dashboard
        </h1>
        <select className="bg-white p-2 rounded-lg border border-gray-200 text-sm" value={timeRange} onChange={e => setTimeRange(e.target.value)}>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="semester">This Semester</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Study Time</h2>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              This Week
            </span>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ClockIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">{studyStats.totalHours} hrs</p>
              <p className="text-xs text-gray-500">
                Avg: {studyStats.averageHoursPerDay} hrs/day
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Tasks Completed</h2>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              This Week
            </span>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">
                {studyStats.completedTasks}/{studyStats.totalTasks}
              </p>
              <p className="text-xs text-gray-500">
                {Math.round(studyStats.completedTasks / studyStats.totalTasks * 100)}
                % completion rate
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Study Streak</h2>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              Current
            </span>
          </div>
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUpIcon className="h-6 w-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">{studyStats.streak} days</p>
              <p className="text-xs text-gray-500">Keep it up!</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Today's Mood</h2>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              Track
            </span>
          </div>
          <div className="flex items-center justify-around">
            <button className={`p-2 rounded-full ${currentMood === 'sad' ? 'bg-red-100' : 'hover:bg-gray-100'}`} onClick={() => setCurrentMood('sad')}>
              <FrownIcon className={`h-8 w-8 ${currentMood === 'sad' ? 'text-red-500' : 'text-gray-300'}`} />
            </button>
            <button className={`p-2 rounded-full ${currentMood === 'neutral' ? 'bg-yellow-100' : 'hover:bg-gray-100'}`} onClick={() => setCurrentMood('neutral')}>
              <MehIcon className={`h-8 w-8 ${currentMood === 'neutral' ? 'text-yellow-500' : 'text-gray-300'}`} />
            </button>
            <button className={`p-2 rounded-full ${currentMood === 'happy' ? 'bg-green-100' : 'hover:bg-gray-100'}`} onClick={() => setCurrentMood('happy')}>
              <SmileIcon className={`h-8 w-8 ${currentMood === 'happy' ? 'text-green-500' : 'text-gray-300'}`} />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-700">
              Study Time by Subject
            </h2>
            <div className="flex items-center">
              <PieChartIcon size={18} className="text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">
                Total: {totalHours} hrs
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {subjectBreakdown.map(item => <div key={item.subject}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{item.subject}</span>
                  <span className="text-sm font-medium">
                    {item.hours} hrs (
                    {Math.round(item.hours / totalHours * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className={`${item.color} h-2.5 rounded-full`} style={{
                width: `${item.hours / totalHours * 100}%`
              }}></div>
                </div>
              </div>)}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-700">Weekly Mood Tracker</h2>
            <div className="flex items-center">
              <BarChart2Icon size={18} className="text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">Last 7 days</span>
            </div>
          </div>
          <div className="flex items-end justify-between h-48">
            {moodHistory.map((day, index) => <div key={index} className="flex flex-col items-center">
                <div className="flex-1 flex items-center justify-center">
                  {getMoodIcon(day.mood)}
                </div>
                <div className="mt-2 text-xs text-gray-500">{day.day}</div>
              </div>)}
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700">Study Insights</h2>
          <div className="flex items-center">
            <BookOpenIcon size={18} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">AI Generated</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <h3 className="font-medium text-indigo-800 mb-2">Weekly Summary</h3>
            <p className="text-sm text-gray-700">
              Great job maintaining your 7-day study streak! You've focused most
              on Mathematics and Physics this week. Consider allocating more
              time to English as it's currently your least studied subject.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="font-medium text-green-800 mb-2">
              Productivity Tips
            </h3>
            <p className="text-sm text-gray-700">
              Your productivity seems highest in the afternoon based on task
              completion rates. Consider scheduling more challenging subjects
              during this time window for optimal results.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">
              Upcoming Focus Areas
            </h3>
            <p className="text-sm text-gray-700">
              With your Economics exam approaching on May 15, consider
              increasing your study time for this subject. Based on your current
              progress, you might want to focus on reviewing key concepts and
              practice problems.
            </p>
          </div>
        </div>
      </div>
    </div>;
};