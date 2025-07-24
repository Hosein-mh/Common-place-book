export class AudioUtils {
  static async getAudioDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(device => device.kind === 'audioinput');
    } catch (error) {
      console.error('Error getting audio devices:', error);
      return [];
    }
  }

  static async checkMicrophonePermission() {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' });
      return result.state;
    } catch (error) {
      console.error('Error checking microphone permission:', error);
      return 'prompt';
    }
  }

  static async requestMicrophoneAccess() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Error requesting microphone access:', error);
      return false;
    }
  }

  static createAudioVisualizer(audioContext, source) {
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    return {
      analyser,
      dataArray,
      getFrequencyData: () => {
        analyser.getByteFrequencyData(dataArray);
        return dataArray;
      },
      getAverageVolume: () => {
        analyser.getByteFrequencyData(dataArray);
        return dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      }
    };
  }

  static playNotificationSound(type = 'success') {
    if (!('AudioContext' in window) && !('webkitAudioContext' in window)) {
      return;
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const frequencies = {
      success: [523.25, 659.25, 783.99], // C5, E5, G5
      error: [349.23, 293.66], // F4, D4
      warning: [440, 554.37], // A4, C#5
      info: [523.25, 783.99] // C5, G5
    };

    const freq = frequencies[type] || frequencies.info;
    
    oscillator.frequency.setValueAtTime(freq[0], audioContext.currentTime);
    if (freq[1]) {
      oscillator.frequency.setValueAtTime(freq[1], audioContext.currentTime + 0.1);
    }
    if (freq[2]) {
      oscillator.frequency.setValueAtTime(freq[2], audioContext.currentTime + 0.2);
    }

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }
}