export class VoiceStreamer {
  constructor(onResult, onError, language = "fa-IR") {
    this.recognition = null;
    this.isRecording = false;
    this.onResult = onResult;
    this.onError = onError;
    this.language = language;
    this.audioContext = null;
    this.mediaStream = null;
    this.continuousBuffer = "";

    this.initializeRecognition();
  }

  async initializeRecognition() {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      this.onError("Speech recognition not supported");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = this.language;
    this.recognition.maxAlternatives = 3;

    this.setupRecognitionEvents();
    this.setupAudioContext();
  }

  setupRecognitionEvents() {
    let finalTranscript = "";

    this.recognition.onstart = () => {
      this.isRecording = true;
      finalTranscript = "";
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const confidence = event.results[i][0].confidence;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
          this.continuousBuffer = finalTranscript;

          this.onResult({
            text: finalTranscript.trim(),
            interim: false,
            confidence: confidence || 0.8,
            timestamp: Date.now(),
          });
        } else {
          interimTranscript += transcript;
        }
      }

      if (interimTranscript) {
        this.onResult({
          text: (finalTranscript + interimTranscript).trim(),
          interim: true,
          confidence: 0.5,
          timestamp: Date.now(),
        });
      }
    };

    this.recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      if (event.error === "not-allowed") {
        this.onError("Microphone access denied");
      } else if (event.error === "no-speech") {
        if (this.isRecording) this.restart();
      } else {
        this.onError(`Recognition error: ${event.error}`);
      }
    };

    this.recognition.onend = () => {
      if (this.isRecording) {
        setTimeout(() => {
          if (this.isRecording) this.restart();
        }, 100);
      }
    };
  }

  async setupAudioContext() {
    try {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    } catch (error) {
      console.warn("AudioContext not available:", error);
    }
  }

  async start() {
    if (!this.recognition) {
      this.onError("Recognition not initialized");
      return;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        },
      });

      this.isRecording = true;
      this.recognition.start();

      if (this.audioContext && this.mediaStream) {
        this.setupAudioVisualization();
      }
    } catch (error) {
      this.onError("Failed to start recording: " + error.message);
    }
  }

  stop() {
    this.isRecording = false;

    if (this.recognition) this.recognition.stop();
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
  }

  restart() {
    if (this.recognition && this.isRecording) {
      try {
        this.recognition.stop();
        setTimeout(() => {
          if (this.isRecording) this.recognition.start();
        }, 100);
      } catch (error) {
        console.error("Restart failed:", error);
      }
    }
  }

  setupAudioVisualization() {
    if (!this.audioContext || !this.mediaStream) return;

    try {
      const source = this.audioContext.createMediaStreamSource(
        this.mediaStream
      );
      const analyser = this.audioContext.createAnalyser();

      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVisualization = () => {
        if (!this.isRecording) return;

        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

        this.onResult({
          audioLevel: average,
          type: "audio-level",
        });

        requestAnimationFrame(updateVisualization);
      };

      updateVisualization();
    } catch (error) {
      console.warn("Audio visualization setup failed:", error);
    }
  }

  setLanguage(language) {
    this.language = language;
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }
}
