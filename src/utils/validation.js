export const validateAudioSupport = () => {
  const issues = [];

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    issues.push("دسترسی به میکروفون پشتیبانی نمی‌شود");
  }

  if (
    !("webkitSpeechRecognition" in window) &&
    !("SpeechRecognition" in window)
  ) {
    issues.push("تشخیص صوت پشتیبانی نمی‌شود");
  }

  if (!("speechSynthesis" in window)) {
    issues.push("پخش صوتی متن پشتیبانی نمی‌شود");
  }

  return issues;
};

export const checkBrowserCompatibility = () => {
  const userAgent = navigator.userAgent;
  const isChrome = userAgent.includes("Chrome");
  const isFirefox = userAgent.includes("Firefox");
  const isSafari = userAgent.includes("Safari") && !isChrome;
  const isEdge = userAgent.includes("Edge");

  if (!isChrome && !isFirefox && !isEdge) {
    return {
      compatible: false,
      message: "برای بهترین تجربه از Chrome، Firefox یا Edge استفاده کنید",
    };
  }

  return { compatible: true };
};
