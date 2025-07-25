// src/hooks/useVoiceStreamer.js - Complete Fixed Implementation
import { useState, useEffect, useRef, useCallback } from "react";

export const useVoiceStreamer = (settings, onTextProcessed) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [silenceTimer, setSilenceTimer] = useState(null);
  const [sessionState, setSessionState] = useState({
    lastPosition: 0,
    sectionProgress: 0,
    isResuming: false,
    pausedAt: null,
  });

  const recognitionRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const lastTranscriptRef = useRef("");

  // تنظیمات سکوت
  const SILENCE_THRESHOLD = settings?.silenceThreshold || 3000; // 3 ثانیه
  const RESUME_DELAY = 1000; // 1 ثانیه تاخیر برای شروع مجدد
  const MAX_RESUME_ATTEMPTS = 3;

  // ذخیره وضعیت فعلی قبل از توقف
  const saveCurrentState = useCallback(() => {
    const currentState = {
      progress: sessionState.sectionProgress,
      timestamp: Date.now(),
      lastTranscript: transcript,
      pausedAt: Date.now(),
    };

    setSessionState((prev) => ({
      ...prev,
      lastPosition: currentState.progress,
      pausedAt: currentState.pausedAt,
    }));

    console.log("وضعیت ذخیره شد:", currentState);
    return currentState;
  }, [sessionState.sectionProgress, transcript]);

  // شروع تایمر سکوت
  const startSilenceTimer = useCallback(() => {
    clearTimeout(silenceTimeoutRef.current);

    silenceTimeoutRef.current = setTimeout(() => {
      handleSilenceTimeout();
    }, SILENCE_THRESHOLD);
  }, [SILENCE_THRESHOLD]);

  // مدیریت سکوت 3 ثانیه‌ای
  const handleSilenceTimeout = useCallback(() => {
    console.log("سکوت 3 ثانیه‌ای تشخیص داده شد - توقف موقت ضبط");

    // ذخیره وضعیت فعلی
    saveCurrentState();

    // توقف ضبط بدون ری‌ست کردن پیشرفت
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsRecording(false);

    // امکان شروع مجدد خودکار (اختیاری)
    if (settings?.autoResume) {
      setTimeout(() => {
        resumeRecording();
      }, RESUME_DELAY);
    }
  }, [saveCurrentState, settings?.autoResume, RESUME_DELAY]);

  // تنظیم Recognition
  const setupRecognition = useCallback(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      console.error("مرورگر شما از تشخیص صوت پشتیبانی نمی‌کند");
      return false;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    // تنظیمات پیشرفته
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = settings?.language || "fa-IR";
    recognitionRef.current.maxAlternatives = 1;

    // مدیریت نتایج
    recognitionRef.current.onresult = (event) => {
      clearTimeout(silenceTimeoutRef.current);

      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const currentTranscript = finalTranscript || interimTranscript;
      setTranscript(currentTranscript);

      // اگر متن جدیدی وجود دارد، پردازش کن
      if (
        finalTranscript.trim() &&
        finalTranscript !== lastTranscriptRef.current
      ) {
        lastTranscriptRef.current = finalTranscript;

        // ارسال متن به تابع پردازش با اطلاعات session
        const confidence =
          event.results[event.results.length - 1][0].confidence || 0.8;
        onTextProcessed(finalTranscript, confidence, {
          ...sessionState,
          isResuming: sessionState.isResuming,
        });

        // بروزرسانی پیشرفت session
        setSessionState((prev) => ({
          ...prev,
          sectionProgress: prev.sectionProgress + 5, // افزایش پیشرفت
          isResuming: false,
        }));
      }

      // شروع تایمر سکوت
      startSilenceTimer();
    };

    // مدیریت خطاها
    recognitionRef.current.onerror = (event) => {
      console.error("خطا در تشخیص صوت:", event.error);

      if (event.error === "no-speech" || event.error === "audio-capture") {
        handleSilenceTimeout();
      } else if (event.error === "not-allowed") {
        console.error("دسترسی به میکروفون رد شد");
        setIsRecording(false);
      }
    };

    // پایان ضبط
    recognitionRef.current.onend = () => {
      if (isRecording) {
        // شروع مجدد خودکار با حفظ وضعیت
        setTimeout(() => {
          if (isRecording) {
            resumeRecording();
          }
        }, RESUME_DELAY);
      }
    };

    return true;
  }, [
    settings,
    sessionState,
    onTextProcessed,
    isRecording,
    startSilenceTimer,
    handleSilenceTimeout,
    RESUME_DELAY,
  ]);

  // شروع ضبط
  const startRecording = useCallback(() => {
    clearTimeout(resumeTimeoutRef.current);
    clearTimeout(silenceTimeoutRef.current);

    if (!setupRecognition()) return;

    try {
      recognitionRef.current.start();
      setIsRecording(true);
      console.log("ضبط شروع شد");
    } catch (error) {
      console.error("خطا در شروع ضبط:", error);
    }
  }, [setupRecognition]);

  // ادامه ضبط با حفظ پیشرفت
  const resumeRecording = useCallback(() => {
    console.log("شروع مجدد ضبط با حفظ پیشرفت...");

    setSessionState((prev) => ({
      ...prev,
      isResuming: true,
    }));

    // شروع مجدد ضبط
    if (!setupRecognition()) return;

    try {
      recognitionRef.current.start();
      setIsRecording(true);
      console.log(`پیشرفت بازگردانی شد: ${sessionState.sectionProgress}%`);
    } catch (error) {
      console.error("خطا در ادامه ضبط:", error);
    }
  }, [setupRecognition, sessionState.sectionProgress]);

  // توقف کامل ضبط
  const stopRecording = useCallback(() => {
    clearTimeout(silenceTimeoutRef.current);
    clearTimeout(resumeTimeoutRef.current);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsRecording(false);
    setTranscript("");
    lastTranscriptRef.current = "";
    console.log("ضبط متوقف شد");
  }, []);

  // تغییر زبان
  const handleLanguageChange = useCallback((newLanguage) => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = newLanguage;
    }
  }, []);

  // پاکسازی منابع
  useEffect(() => {
    return () => {
      clearTimeout(silenceTimeoutRef.current);
      clearTimeout(resumeTimeoutRef.current);

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // بروزرسانی تنظیمات
  useEffect(() => {
    if (recognitionRef.current && settings) {
      recognitionRef.current.lang = settings.language || "fa-IR";
    }
  }, [settings]);

  return {
    isRecording,
    transcript,
    sessionState,
    startRecording,
    stopRecording,
    resumeRecording,
    handleLanguageChange,
    saveCurrentState,
  };
};
