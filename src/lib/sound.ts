import { MASTER_VOLUME, NOISE_FILTER_Q } from '@/constants/sound';
import type { AudioSessionNavigator, Voice } from '@/types/sound';

const ATTACK_SECONDS = 0.005;
const SILENCE = 0.0001;
const NOISE_SECONDS = 1;
const PLAYBACK_SESSION = 'playback';

let context: AudioContext | null = null;
let noise: AudioBuffer | null = null;

function preferPlayback() {
  const { audioSession } = navigator as AudioSessionNavigator;
  if (audioSession && audioSession.type !== PLAYBACK_SESSION) {
    audioSession.type = PLAYBACK_SESSION;
  }
}

function audioContext() {
  if (typeof window === 'undefined' || !('AudioContext' in window)) return null;
  preferPlayback();
  context ??= new AudioContext();
  if (context.state !== 'running') void context.resume();
  return context;
}

function noiseBuffer(audio: AudioContext) {
  if (noise) return noise;
  const length = audio.sampleRate * NOISE_SECONDS;
  noise = audio.createBuffer(1, length, audio.sampleRate);
  const samples = noise.getChannelData(0);
  for (let index = 0; index < length; index += 1) {
    samples[index] = Math.random() * 2 - 1;
  }
  return noise;
}

function glide(param: AudioParam, voice: Voice, start: number, end: number) {
  param.setValueAtTime(voice.frequency, start);
  if (voice.glideTo) param.exponentialRampToValueAtTime(voice.glideTo, end);
}

function createSource(audio: AudioContext, voice: Voice, start: number) {
  const end = start + voice.duration;
  if (voice.wave !== 'noise') {
    const oscillator = audio.createOscillator();
    oscillator.type = voice.wave;
    glide(oscillator.frequency, voice, start, end);
    return { source: oscillator, output: oscillator };
  }
  const source = audio.createBufferSource();
  source.buffer = noiseBuffer(audio);
  const filter = audio.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = NOISE_FILTER_Q;
  glide(filter.frequency, voice, start, end);
  source.connect(filter);
  return { source, output: filter };
}

function scheduleVoice(audio: AudioContext, voice: Voice, origin: number) {
  const start = origin + (voice.at ?? 0);
  const end = start + voice.duration;
  const peak = MASTER_VOLUME * (voice.volume ?? 1);
  const gain = audio.createGain();
  gain.gain.setValueAtTime(SILENCE, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + ATTACK_SECONDS);
  gain.gain.setValueAtTime(peak, start + ATTACK_SECONDS + (voice.hold ?? 0));
  gain.gain.exponentialRampToValueAtTime(SILENCE, end);
  const { source, output } = createSource(audio, voice, start);
  output.connect(gain).connect(audio.destination);
  source.start(start);
  source.stop(end + ATTACK_SECONDS);
}

export function unlockAudio() {
  audioContext();
}

export function playVoices(voices: readonly Voice[]) {
  const audio = audioContext();
  if (!audio) return;
  const origin = audio.currentTime;
  voices.forEach((voice) => scheduleVoice(audio, voice, origin));
}
