export const formatTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const calculateAccuracy = (matchedWords, totalWords) => {
  if (totalWords === 0) return 0;
  return Math.round((matchedWords / totalWords) * 100);
};

export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const validateScriptData = (data) => {
  const errors = [];

  if (!data.title) errors.push("عنوان اسکریپت الزامی است");
  if (!data.sections || !Array.isArray(data.sections)) {
    errors.push("بخش‌های اسکریپت باید آرایه‌ای از اشیاء باشد");
  } else {
    data.sections.forEach((section, index) => {
      if (!section.id) errors.push(`بخش ${index + 1}: شناسه الزامی است`);
      if (!section.title) errors.push(`بخش ${index + 1}: عنوان الزامی است`);
      if (!section.text) errors.push(`بخش ${index + 1}: متن الزامی است`);
    });
  }

  return errors;
};
