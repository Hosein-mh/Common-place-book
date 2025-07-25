// src/Components/VoiceScriptReader.js - Complete Updated Implementation
import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Volume2,
  Upload,
  Download,
  ChevronLeft,
  PlayCircle,
  Settings as SettingsIcon,
} from "lucide-react";

// Enhanced voice streamer hook
import { useVoiceStreamer } from "../hooks/useVoiceStreamer";
// Import the new Recording Controls component
import RecordingControls from "./RecordingControls";

const VoiceScriptReader = () => {
  // Script state
  const [activeScript, setActiveScript] = useState(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [matchedWords, setMatchedWords] = useState(new Set());
  const [settings, setSettings] = useState({
    language: "fa-IR",
    autoResume: true,
    silenceThreshold: 3000,
    confidenceThreshold: 0.7,
    autoAdvance: true,
    autoAdvanceThreshold: 75,
  });

  // Voice and speech
  const [isPlaying, setIsPlaying] = useState(false);
  const speechRef = useRef(null);

  // Default script data (simplified version)
  const defaultScriptData = {
    scriptInfo: {
      title: "راز عمیق خودفریبی: چرا ذهن شما دشمن واقعیت است؟",
      author: "علی",
      duration: "5-6 دقیقه",
      language: "fa-IR",
      topic: "خودفریبی و آگاهی",
    },
    sections: [
      {
        id: 1,
        section: "Hook & Opening",
        timeRange: "0:00-0:30",
        duration: 30,
        topic: "آغاز قدرتمند و جذب مخاطب",
        text: "درود دوستان امروز می‌خوام حقیقتی رو باهاتون در میان بذارم که احتمالاً تمام زندگیتون رو زیر سؤال می‌بره آماده‌اید",
        notes: "نگاه عمیق به دوربین، جدی و راز‌آلود، سکوت 3 ثانیه",
        keyWords: ["درود", "دوستان", "حقیقت", "زندگی", "سؤال", "آماده"],
        emotion: "mysterious",
        energy: "medium",
      },
      {
        id: 2,
        section: "Mirror Question",
        timeRange: "0:30-1:00",
        duration: 30,
        topic: "سؤال آینه و معرفی مفهوم",
        text: "فکر می‌کنین این آینه منعکس‌کننده واقعیته حالا اگه بهتون بگم که شما هیچ وقت واقعیت رو ندیدین اگه بهتون بگم هر چیزی که تا الان فکر می‌کردین راسته دروغه",
        notes: "آینه رو نشان بده، حالت جدی، تعلیق ایجاد کن",
        keyWords: ["آینه", "منعکس", "واقعیت", "هیچوقت", "دروغ"],
        emotion: "suspenseful",
        energy: "medium-high",
      },
      {
        id: 3,
        section: "Main Premise",
        timeRange: "1:00-1:15",
        duration: 15,
        topic: "معرفی موضوع اصلی",
        text: "امروز قراره نشونتون بدم چطور ذهنتون بیست و چهار ساعت شبانه روز داره بهتون دروغ می‌گه و بدترین قسمتش اینه که شما عاشق این دروغاید",
        notes: "حالت جدی، تاکید روی کلمات کلیدی",
        keyWords: ["ذهن", "بیست", "چهار", "ساعت", "دروغ", "عاشق"],
        emotion: "serious",
        energy: "high",
      },
    ],
  };

  // Text processing function
  const processText = (recognizedText, targetText, keywords) => {
    if (!recognizedText || !targetText)
      return { progress: 0, matchedWords: [] };

    const recognizedWords = recognizedText.toLowerCase().split(/\s+/);
    const targetWords = targetText.toLowerCase().split(/\s+/);
    const keywordList = keywords.map((k) => k.toLowerCase());

    let matchCount = 0;
    const newMatchedWords = new Set();

    recognizedWords.forEach((word) => {
      const cleanWord = word.replace(
        /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g,
        ""
      );

      if (targetWords.includes(cleanWord) || keywordList.includes(cleanWord)) {
        matchCount++;
        newMatchedWords.add(cleanWord);
      }
    });

    const progressPercent = Math.min(
      (matchCount / Math.max(targetWords.length * 0.3, 1)) * 100,
      100
    );
    return {
      progress: progressPercent,
      matchedWords: Array.from(newMatchedWords),
    };
  };

  // Voice processing callback
  const handleTextProcessed = (
    recognizedText,
    confidence,
    sessionState = {}
  ) => {
    if (
      !recognizedText ||
      !activeScript ||
      confidence < settings.confidenceThreshold
    )
      return;

    const currentLine = activeScript.sections[currentLineIndex];
    const result = processText(
      recognizedText,
      currentLine.text,
      currentLine.keyWords || []
    );

    // Handle resume state
    let adjustedProgress = result.progress;
    if (sessionState.isResuming && sessionState.sectionProgress > 0) {
      adjustedProgress = Math.max(
        result.progress,
        sessionState.sectionProgress
      );
      console.log(
        `ادامه از پیشرفت قبلی: ${sessionState.sectionProgress}% -> ${adjustedProgress}%`
      );
    }

    setProgress(adjustedProgress);
    setMatchedWords(new Set(result.matchedWords));

    // Auto advance
    if (
      settings.autoAdvance &&
      adjustedProgress >= settings.autoAdvanceThreshold
    ) {
      setTimeout(() => {
        goToNextLine();
      }, 2000);
    }
  };

  // Enhanced voice streamer
  const {
    isRecording,
    transcript,
    sessionState,
    startRecording,
    stopRecording,
    resumeRecording,
    handleLanguageChange,
  } = useVoiceStreamer(settings, handleTextProcessed);

  // Initialize script
  useEffect(() => {
    setActiveScript(defaultScriptData);
  }, []);

  // Navigation functions
  const goToNextLine = () => {
    if (currentLineIndex < activeScript.sections.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
      setProgress(0);
      setMatchedWords(new Set());
    }
  };

  const goToPreviousLine = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(currentLineIndex - 1);
      setProgress(0);
      setMatchedWords(new Set());
    }
  };

  const jumpToSection = (index) => {
    setCurrentLineIndex(index);
    setProgress(0);
    setMatchedWords(new Set());
  };

  const resetAll = () => {
    setCurrentLineIndex(0);
    setProgress(0);
    setOverallProgress(0);
    setMatchedWords(new Set());
    stopRecording();
  };

  // Speech synthesis
  const speakCurrentLine = () => {
    if (!activeScript) return;

    const currentLine = activeScript.sections[currentLineIndex];
    if ("speechSynthesis" in window) {
      speechRef.current = new SpeechSynthesisUtterance(currentLine.text);
      speechRef.current.lang = "fa-IR";
      speechRef.current.rate = 0.8;
      speechRef.current.onstart = () => setIsPlaying(true);
      speechRef.current.onend = () => setIsPlaying(false);
      speechSynthesis.speak(speechRef.current);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  if (!activeScript) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری اسکریپت...</p>
        </div>
      </div>
    );
  }

  const currentLine = activeScript.sections[currentLineIndex];
  const scriptWords = activeScript.sections.flatMap((section) =>
    section.text
      .split(/\s+/)
      .map((word) =>
        word.replace(
          /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g,
          ""
        )
      )
      .filter((word) => word.length > 0)
  );

  // Calculate overall progress
  useEffect(() => {
    const sectionProgress =
      (currentLineIndex / activeScript.sections.length) * 100;
    const currentSectionProgress =
      (progress / 100) * (100 / activeScript.sections.length);
    setOverallProgress(sectionProgress + currentSectionProgress);
  }, [currentLineIndex, progress, activeScript.sections.length]);

  return (
    <div
      className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen"
      dir="rtl"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          خواننده اسکریپت صوتی هوشمند
        </h1>
        <p className="text-gray-600 text-lg">{activeScript.scriptInfo.title}</p>
      </div>

      {/* Enhanced Recording Status */}
      {!isRecording &&
        sessionState.pausedAt &&
        sessionState.sectionProgress > 0 && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">ضبط متوقف شده</h4>
                <p className="text-sm">
                  پیشرفت ذخیره شده: {Math.round(sessionState.sectionProgress)}%
                </p>
                <p className="text-xs">
                  متوقف شده در:{" "}
                  {new Date(sessionState.pausedAt).toLocaleTimeString("fa-IR")}
                </p>
              </div>
              <button
                onClick={resumeRecording}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                ادامه ضبط
              </button>
            </div>
          </div>
        )}

      {/* Main Recording Controls */}
      <RecordingControls
        isRecording={isRecording}
        sessionState={sessionState}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onResumeRecording={resumeRecording}
        onRestart={resetAll}
      />

      {/* Recording Indicator */}
      {isRecording && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-semibold">در حال ضبط...</span>
            {sessionState.isResuming && (
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                ادامه از موقعیت قبلی
              </span>
            )}
          </div>
          {transcript && (
            <div className="mt-2 p-2 bg-white rounded text-gray-700 text-sm">
              <strong>متن تشخیص داده شده:</strong> {transcript}
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-blue-600">
            {currentLineIndex + 1}
          </div>
          <div className="text-gray-600">بخش فعلی</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-green-600">
            {matchedWords.size}
          </div>
          <div className="text-gray-600">کلمات تطبیق</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-purple-600">
            {activeScript.sections.length}
          </div>
          <div className="text-gray-600">کل بخش‌ها</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-orange-600">
            {scriptWords.length}
          </div>
          <div className="text-gray-600">کلمات</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="p-6 space-y-4 bg-white rounded-lg shadow-md mb-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">پیشرفت بخش فعلی</span>
            <span className="text-sm font-bold text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">پیشرفت کل اسکریپت</span>
            <span className="text-sm font-bold text-purple-600">
              {Math.round(overallProgress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Script Navigation */}
      <div className="p-6 bg-white rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              بخش {currentLineIndex + 1} از {activeScript.sections.length}:{" "}
              {currentLine.section}
            </h2>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
              <span>⏰ {currentLine.timeRange}</span>
              <span>🎭 {currentLine.emotion}</span>
              <span>⚡ انرژی: {currentLine.energy}</span>
              <span>⏱️ {currentLine.duration} ثانیه</span>
            </div>
          </div>
          <button
            onClick={isPlaying ? stopSpeaking : speakCurrentLine}
            className={`p-3 rounded-full transition-colors ${
              isPlaying
                ? "text-red-600 hover:bg-red-100 bg-red-50"
                : "text-blue-600 hover:bg-blue-100 bg-blue-50"
            }`}
            title={isPlaying ? "توقف پخش" : "پخش صوتی متن"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>

        {/* Script Text */}
        <div className="mb-6 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            📝 متن اسکریپت:
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            {currentLine.text}
          </p>

          {currentLine.notes && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-blue-700">
                <strong>یادداشت اجرا:</strong> {currentLine.notes}
              </p>
            </div>
          )}

          {currentLine.keyWords && currentLine.keyWords.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                🔑 کلمات کلیدی:
              </p>
              <div className="flex flex-wrap gap-2">
                {currentLine.keyWords.map((keyword, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      matchedWords.has(keyword.toLowerCase())
                        ? "bg-green-200 text-green-800 border border-green-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {keyword}
                    {matchedWords.has(keyword.toLowerCase()) && " ✓"}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
              isRecording
                ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
            }`}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            {isRecording ? "توقف ضبط" : "شروع ضبط"}
          </button>

          <button
            onClick={goToPreviousLine}
            disabled={currentLineIndex === 0}
            className="flex items-center gap-2 px-4 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:transform-none"
          >
            <ChevronLeft size={20} />
            بخش قبلی
          </button>

          <select
            value={currentLineIndex}
            onChange={(e) => jumpToSection(parseInt(e.target.value))}
            className="px-3 py-3 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-0"
          >
            {activeScript.sections.map((section, index) => (
              <option key={section.id} value={index}>
                {index + 1}. {section.section} ({section.timeRange})
              </option>
            ))}
          </select>

          <button
            onClick={goToNextLine}
            disabled={currentLineIndex === activeScript.sections.length - 1}
            className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:transform-none"
          >
            بخش بعدی
            <ChevronRight size={20} />
          </button>

          <button
            onClick={resetAll}
            className="flex items-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
          >
            <RotateCcw size={20} />
            شروع مجدد
          </button>
        </div>

        {/* Quick Navigation */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">
            🔄 ناوبری سریع:
          </h3>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {activeScript.sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => jumpToSection(index)}
                className={`px-3 py-2 text-xs rounded-lg font-medium transition-all ${
                  index === currentLineIndex
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}. {section.section}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <SettingsIcon size={20} />
          <h3 className="font-semibold">تنظیمات سریع</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              آستانه سکوت (ثانیه)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={settings.silenceThreshold / 1000}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  silenceThreshold: parseFloat(e.target.value) * 1000,
                }))
              }
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              فعلی: {settings.silenceThreshold / 1000}s
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              آستانه اعتماد
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={settings.confidenceThreshold}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  confidenceThreshold: parseFloat(e.target.value),
                }))
              }
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              فعلی: {Math.round(settings.confidenceThreshold * 100)}%
            </div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.autoResume}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    autoResume: e.target.checked,
                  }))
                }
                className="rounded"
              />
              <span className="text-sm">شروع مجدد خودکار</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceScriptReader;
