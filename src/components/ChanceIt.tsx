import React, { useState } from 'react';
import { BookOpenIcon, AwardIcon, BarChart2Icon, ClipboardListIcon, UsersIcon, HomeIcon, StarIcon, TrendingUpIcon, PenToolIcon, BriefcaseIcon, MapPinIcon, SendIcon, XIcon, CheckIcon, AlertCircleIcon } from 'lucide-react';
export const ChanceIt = () => {
  // State for form inputs
  const [college, setCollege] = useState('');
  const [gpa, setGpa] = useState('');
  const [classRank, setClassRank] = useState('');
  const [satScore, setSatScore] = useState('');
  const [actScore, setActScore] = useState('');
  const [apCount, setApCount] = useState('');
  const [extracurriculars, setExtracurriculars] = useState('');
  const [awards, setAwards] = useState('');
  const [hooks, setHooks] = useState('');
  // State for results
  const [showResults, setShowResults] = useState(false);
  const [chancePercentage, setChancePercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tips, setTips] = useState<string[]>([]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate AI calculation with a delay
    setTimeout(() => {
      // Simple algorithm to calculate chances (in a real app, this would be more sophisticated)
      let baseChance = 0;
      // GPA factor (0-4.0 scale assumed)
      const gpaNum = parseFloat(gpa);
      if (gpaNum >= 3.9) baseChance += 25;else if (gpaNum >= 3.7) baseChance += 20;else if (gpaNum >= 3.5) baseChance += 15;else if (gpaNum >= 3.0) baseChance += 10;else baseChance += 5;
      // Test scores
      const satNum = parseInt(satScore);
      if (satNum >= 1500) baseChance += 20;else if (satNum >= 1400) baseChance += 15;else if (satNum >= 1300) baseChance += 10;else if (satNum >= 1200) baseChance += 5;
      // AP courses
      const apNum = parseInt(apCount);
      if (apNum >= 8) baseChance += 15;else if (apNum >= 5) baseChance += 10;else if (apNum >= 3) baseChance += 5;
      // Extracurriculars and awards factor
      if (extracurriculars.length > 100) baseChance += 15;else if (extracurriculars.length > 50) baseChance += 10;else baseChance += 5;
      if (awards.length > 50) baseChance += 10;else if (awards.length > 0) baseChance += 5;
      // Special hooks
      if (hooks.length > 50) baseChance += 10;else if (hooks.length > 0) baseChance += 5;
      // College selectivity adjustment (simplified)
      let collegeAdjustment = 0;
      const lowerCollege = college.toLowerCase();
      if (lowerCollege.includes('harvard') || lowerCollege.includes('stanford') || lowerCollege.includes('mit') || lowerCollege.includes('yale')) {
        collegeAdjustment = -40;
      } else if (lowerCollege.includes('berkeley') || lowerCollege.includes('michigan') || lowerCollege.includes('ucla')) {
        collegeAdjustment = -30;
      } else if (lowerCollege.includes('state')) {
        collegeAdjustment = 0;
      } else {
        collegeAdjustment = -20;
      }
      // Calculate final chance
      let finalChance = baseChance + collegeAdjustment;
      finalChance = Math.max(1, Math.min(99, finalChance)); // Clamp between 1-99%
      // Generate tips based on inputs
      const newTips = [];
      if (gpaNum < 3.7) {
        newTips.push('Focus on improving your GPA in your remaining courses.');
      }
      if (!satScore && !actScore) {
        newTips.push('Consider taking the SAT or ACT, even if schools are test-optional.');
      } else if (satNum < 1400 && satScore) {
        newTips.push('Study to improve your SAT score or consider taking the ACT instead.');
      }
      if (apNum < 5) {
        newTips.push('Take more challenging courses like AP or IB if available at your school.');
      }
      if (extracurriculars.length < 50) {
        newTips.push('Develop deeper involvement in 1-2 extracurricular activities with leadership roles.');
      }
      if (awards.length < 20) {
        newTips.push('Seek out competitions or opportunities to showcase your talents and win recognition.');
      }
      newTips.push('Write a compelling personal statement that showcases your unique voice and experiences.');
      newTips.push('Ask for recommendation letters from teachers who know you well and can speak to your strengths.');
      setChancePercentage(finalChance);
      setTips(newTips);
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };
  const resetForm = () => {
    setShowResults(false);
    setCollege('');
    setGpa('');
    setClassRank('');
    setSatScore('');
    setActScore('');
    setApCount('');
    setExtracurriculars('');
    setAwards('');
    setHooks('');
  };
  return <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Chance It</h1>
      <p className="text-gray-600">
        Use our AI tool to estimate your chances of admission and get
        personalized tips to strengthen your application.
      </p>
      {!showResults ? <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Enter Your Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  College/University Name *
                </label>
                <input type="text" value={college} onChange={e => setCollege(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Harvard University" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GPA (4.0 Scale) *
                </label>
                <input type="text" value={gpa} onChange={e => setGpa(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., 3.8" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Rank (if available)
                </label>
                <input type="text" value={classRank} onChange={e => setClassRank(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., 5 out of 300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of AP/IB Courses *
                </label>
                <input type="number" value={apCount} onChange={e => setApCount(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., 5" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SAT Score (if taken)
                </label>
                <input type="number" value={satScore} onChange={e => setSatScore(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., 1450" min="400" max="1600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ACT Score (if taken)
                </label>
                <input type="number" value={actScore} onChange={e => setActScore(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., 32" min="1" max="36" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Extracurricular Activities
              </label>
              <textarea value={extracurriculars} onChange={e => setExtracurriculars(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg h-20" placeholder="Describe your key extracurricular activities, leadership roles, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Honors & Awards
              </label>
              <textarea value={awards} onChange={e => setAwards(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg h-20" placeholder="List any significant honors or awards you've received" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Talents or Hooks
              </label>
              <textarea value={hooks} onChange={e => setHooks(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg h-20" placeholder="Legacy status, recruited athlete, unique talents, first-generation status, etc." />
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center">
                <SendIcon size={18} className="mr-2" />
                Calculate My Chances
              </button>
            </div>
          </form>
        </div> : <div className="space-y-6">
          {isLoading ? <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing your profile...</p>
            </div> : <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      Your Chances at {college}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Based on the information you provided
                    </p>
                  </div>
                  <button onClick={resetForm} className="text-sm text-indigo-600 hover:text-indigo-800">
                    Try Another College
                  </button>
                </div>
                <div className="flex items-center justify-center my-8">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-3xl font-bold text-indigo-600">
                        {chancePercentage}%
                      </div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke={chancePercentage >= 70 ? '#10b981' : chancePercentage >= 40 ? '#f59e0b' : '#ef4444'} strokeWidth="8" strokeDasharray={`${chancePercentage * 2.83} 283`} strokeDashoffset="0" transform="rotate(-90 50 50)" />
                    </svg>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${chancePercentage >= 70 ? 'bg-green-100 text-green-800' : chancePercentage >= 40 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {chancePercentage >= 70 ? 'Strong Chance' : chancePercentage >= 40 ? 'Possible' : 'Reach School'}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-700 mb-2">
                    What this means:
                  </h3>
                  <p className="text-gray-600">
                    {chancePercentage >= 70 ? 'You have a strong profile for this college. While admission is never guaranteed, your academic and extracurricular achievements align well with their typical admitted student profile.' : chancePercentage >= 40 ? 'This college is within your reach, but could be somewhat competitive for your profile. Focus on strengthening your application with our recommendations below.' : 'This is a reach school for your current profile. Consider applying, but also include more target and safety schools in your list.'}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Recommendations to Improve Your Application
                </h2>
                <ul className="space-y-3">
                  {tips.map((tip, index) => <li key={index} className="flex">
                      <CheckIcon size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>)}
                </ul>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex">
                  <AlertCircleIcon size={20} className="text-yellow-500 mr-2 flex-shrink-0" />
                  <p className="text-sm text-yellow-700">
                    Remember that college admissions are holistic and
                    unpredictable. This estimate is based on the limited
                    information provided and should be used as just one data
                    point in your college planning process.
                  </p>
                </div>
              </div>
            </>}
        </div>}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          What Colleges Consider
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <BarChart2Icon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  1. GPA (Grade Point Average)
                </h3>
                <p className="text-sm text-gray-500">
                  Your overall performance across all high school years.
                  Colleges look at trends and consider weighted vs. unweighted
                  GPAs.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <TrendingUpIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">2. Class Rank</h3>
                <p className="text-sm text-gray-500">
                  Where you stand compared to your classmates academically.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <BookOpenIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">3. Course Rigor</h3>
                <p className="text-sm text-gray-500">
                  Did you take challenging classes (Honors, AP, IB, dual
                  enrollment)? Colleges want to see that you challenged
                  yourself.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <ClipboardListIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  4. Standardized Test Scores
                </h3>
                <p className="text-sm text-gray-500">
                  SAT/ACT scores (if submitted — many colleges are test-optional
                  now).
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <PenToolIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  5. Personal Essay / Statement
                </h3>
                <p className="text-sm text-gray-500">
                  Shows your writing ability, personality, values, and
                  experiences.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <UsersIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  6. Letters of Recommendation
                </h3>
                <p className="text-sm text-gray-500">
                  Usually from teachers and counselors. They speak to your
                  character, academic potential, and personal qualities.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <BriefcaseIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  7. Extracurricular Activities
                </h3>
                <p className="text-sm text-gray-500">
                  What do you do outside class? Leadership, commitment, impact,
                  and passion matter more than quantity.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <AwardIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  8. Honors and Awards
                </h3>
                <p className="text-sm text-gray-500">
                  Any distinctions or recognitions — local, national, or
                  international.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <HomeIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">9. School Profile</h3>
                <p className="text-sm text-gray-500">
                  The context of your high school — course offerings, average
                  GPAs/test scores, graduation rates, etc.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <MapPinIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">10. Demographics</h3>
                <p className="text-sm text-gray-500">
                  Ethnicity, gender, geographic location, first-generation
                  status, etc.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <UsersIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  11. Family Responsibilities
                </h3>
                <p className="text-sm text-gray-500">
                  If you had significant responsibilities (e.g., caring for
                  siblings, working to support your family).
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3 flex-shrink-0">
                <StarIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">
                  12. Special Talents or Hooks
                </h3>
                <p className="text-sm text-gray-500">
                  Music, athletics, research, art, etc. Can help you stand out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};