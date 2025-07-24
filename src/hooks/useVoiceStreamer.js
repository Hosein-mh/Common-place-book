import { useState, useEffect, useRef, useCallback } from "react";

export const useVoiceStreamer = (settings, onTextProcessed) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      const recognition = recognitionRef.current;
      recognition.continuous = settings.continuousRecording;
      recognition.interimResults = true;
      recognition.lang = settings.language || "fa-IR";

      recognition.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);

        if (finalTranscript && onTextProcessed) {
          onTextProcessed(
            finalTranscript,
            event.results[event.results.length - 1][0].confidence
          );
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        if (isRecording && settings.continuousRecording) {
          recognition.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [settings, onTextProcessed, isRecording]);

  const startRecording = useCallback(() => {
    if (recognitionRef.current) {
      setTranscript("");
      setIsRecording(true);
      recognitionRef.current.start();
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      setIsRecording(false);
      recognitionRef.current.stop();
    }
  }, []);

  const handleLanguageChange = useCallback((newLanguage) => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = newLanguage;
    }
  }, []);

  return {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    handleLanguageChange,
  };
};
