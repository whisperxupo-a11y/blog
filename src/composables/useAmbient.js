import { ref, reactive } from 'vue'

let audioCtx = null
const trackNodes = new Map()

function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function noiseBuffer(duration = 2) {
  const ctx = getContext()
  const len = ctx.sampleRate * duration
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < len; i++) {
    data[i] = Math.random() * 2 - 1
  }
  return buf
}

function pinkNoiseBuffer(duration = 2) {
  const ctx = getContext()
  const len = ctx.sampleRate * duration
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const data = buf.getChannelData(0)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + white * 0.0555179
    b1 = 0.99332 * b1 + white * 0.0750759
    b2 = 0.969 * b2 + white * 0.153852
    b3 = 0.8665 * b3 + white * 0.3104856
    b4 = 0.55 * b4 + white * 0.5329522
    b5 = -0.7616 * b5 - white * 0.016898
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
    b6 = white * 0.115926
  }
  return buf
}

function createRain(ctx, gainNode) {
  const nodes = []
  const buf = noiseBuffer(2)
  const src = ctx.createBufferSource()
  src.buffer = buf
  src.loop = true

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 900
  filter.Q.value = 0.5

  const modGain = ctx.createGain()
  modGain.gain.value = 0.35

  src.connect(filter)
  filter.connect(modGain)
  modGain.connect(gainNode)
  src.start()

  nodes.push(src, filter, modGain)

  const modInterval = setInterval(() => {
    const t = ctx.currentTime
    modGain.gain.setTargetAtTime(0.2 + Math.random() * 0.3, t, 0.15)
  }, 300)

  return {
    stop() {
      clearInterval(modInterval)
      nodes.forEach(n => { try { n.disconnect() } catch (_) { /* ok */ } })
      try { src.stop() } catch (_) { /* ok */ }
    }
  }
}

function createForest(ctx, gainNode) {
  const nodes = []
  const crickets = []

  const cricketFreqs = [4200, 5100, 6300, 4700, 5600]
  cricketFreqs.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    const cricketGain = ctx.createGain()
    cricketGain.gain.value = 0.03

    const lfo = ctx.createOscillator()
    lfo.frequency.value = 3 + i * 1.7
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.02
    lfo.connect(lfoGain)
    lfoGain.connect(cricketGain.gain)
    lfo.start()

    osc.connect(cricketGain)
    cricketGain.connect(gainNode)
    osc.start()

    nodes.push(osc, cricketGain, lfo, lfoGain)

    const pulseInterval = setInterval(() => {
      cricketGain.gain.setTargetAtTime(Math.random() > 0.3 ? 0.03 : 0, ctx.currentTime, 0.05)
    }, 200 + i * 50)

    crickets.push({ osc, gain: cricketGain, interval: pulseInterval })
  })

  const windBuf = pinkNoiseBuffer(3)
  const windSrc = ctx.createBufferSource()
  windSrc.buffer = windBuf
  windSrc.loop = true

  const windFilter = ctx.createBiquadFilter()
  windFilter.type = 'lowpass'
  windFilter.frequency.value = 400

  const windGain = ctx.createGain()
  windGain.gain.value = 0.06

  const windLfo = ctx.createOscillator()
  windLfo.frequency.value = 0.15
  const windLfoGain = ctx.createGain()
  windLfoGain.gain.value = 0.04
  windLfo.connect(windLfoGain)
  windLfoGain.connect(windGain.gain)
  windLfo.start()

  windSrc.connect(windFilter)
  windFilter.connect(windGain)
  windGain.connect(gainNode)
  windSrc.start()

  nodes.push(windSrc, windFilter, windGain, windLfo, windLfoGain)

  return {
    stop() {
      crickets.forEach(c => clearInterval(c.interval))
      nodes.forEach(n => { try { n.disconnect() } catch (_) { /* ok */ } })
      try { windSrc.stop() } catch (_) { /* ok */ }
    }
  }
}

function createStream(ctx, gainNode) {
  const nodes = []
  const buf = pinkNoiseBuffer(2)
  const src = ctx.createBufferSource()
  src.buffer = buf
  src.loop = true

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 800
  filter.Q.value = 0.6

  const modGain = ctx.createGain()
  modGain.gain.value = 0.28

  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.4
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 0.15
  lfo.connect(lfoGain)
  lfoGain.connect(modGain.gain)
  lfo.start()

  const fastLfo = ctx.createOscillator()
  fastLfo.frequency.value = 2.5
  const fastLfoGain = ctx.createGain()
  fastLfoGain.gain.value = 0.06
  fastLfo.connect(fastLfoGain)
  fastLfoGain.connect(modGain.gain)
  fastLfo.start()

  src.connect(filter)
  filter.connect(modGain)
  modGain.connect(gainNode)
  src.start()

  nodes.push(src, filter, modGain, lfo, lfoGain, fastLfo, fastLfoGain)

  return {
    stop() {
      nodes.forEach(n => { try { n.disconnect() } catch (_) { /* ok */ } })
      try { src.stop() } catch (_) { /* ok */ }
    }
  }
}

function createCampfire(ctx, gainNode) {
  const nodes = []

  const rumbleBuf = pinkNoiseBuffer(2)
  const rumbleSrc = ctx.createBufferSource()
  rumbleSrc.buffer = rumbleBuf
  rumbleSrc.loop = true

  const rumbleFilter = ctx.createBiquadFilter()
  rumbleFilter.type = 'lowpass'
  rumbleFilter.frequency.value = 90

  const rumbleGain = ctx.createGain()
  rumbleGain.gain.value = 0.2

  rumbleSrc.connect(rumbleFilter)
  rumbleFilter.connect(rumbleGain)
  rumbleGain.connect(gainNode)
  rumbleSrc.start()

  nodes.push(rumbleSrc, rumbleFilter, rumbleGain)

  const crackleBuf = noiseBuffer(1)
  const crackleSrc = ctx.createBufferSource()
  crackleSrc.buffer = crackleBuf
  crackleSrc.loop = true

  const crackleFilter = ctx.createBiquadFilter()
  crackleFilter.type = 'bandpass'
  crackleFilter.frequency.value = 3000
  crackleFilter.Q.value = 1.5

  const crackleGain = ctx.createGain()
  crackleGain.gain.value = 0.08

  crackleSrc.connect(crackleFilter)
  crackleFilter.connect(crackleGain)
  crackleGain.connect(gainNode)
  crackleSrc.start()

  nodes.push(crackleSrc, crackleFilter, crackleGain)

  const crackleInterval = setInterval(() => {
    const t = ctx.currentTime
    const val = Math.random() > 0.7 ? 0.08 + Math.random() * 0.25 : 0.02 + Math.random() * 0.05
    crackleGain.gain.setTargetAtTime(val, t, 0.02)
  }, 80)

  return {
    stop() {
      clearInterval(crackleInterval)
      nodes.forEach(n => { try { n.disconnect() } catch (_) { /* ok */ } })
      try { rumbleSrc.stop() } catch (_) { /* ok */ }
      try { crackleSrc.stop() } catch (_) { /* ok */ }
    }
  }
}

const generators = {
  rain: createRain,
  forest: createForest,
  stream: createStream,
  campfire: createCampfire
}

export function useAmbient() {
  const tracks = reactive([
    { id: 'rain', name: '雨声', icon: '~', playing: false, volume: 0.5 },
    { id: 'forest', name: '林间', icon: '~', playing: false, volume: 0.5 },
    { id: 'stream', name: '溪流', icon: '~', playing: false, volume: 0.5 },
    { id: 'campfire', name: '篝火', icon: '~', playing: false, volume: 0.5 }
  ])

  const expanded = ref(false)
  const activeCount = ref(0)

  function ensureContext() {
    const ctx = getContext()
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
  }

  function toggle(id) {
    const track = tracks.find(t => t.id === id)
    if (!track) return

    if (track.playing) {
      stopTrack(id)
      track.playing = false
    } else {
      startTrack(id)
      track.playing = true
    }

    activeCount.value = tracks.filter(t => t.playing).length
  }

  function startTrack(id) {
    const ctx = ensureContext()
    const track = tracks.find(t => t.id === id)

    if (trackNodes.has(id)) return

    const masterGain = ctx.createGain()
    masterGain.gain.value = track.volume * 0.5
    masterGain.connect(ctx.destination)

    const cleanup = generators[id](ctx, masterGain)

    trackNodes.set(id, { masterGain, cleanup })
  }

  function stopTrack(id) {
    const entry = trackNodes.get(id)
    if (!entry) return
    entry.cleanup.stop()
    entry.masterGain.disconnect()
    trackNodes.delete(id)
  }

  function setVolume(id, value) {
    const track = tracks.find(t => t.id === id)
    if (track) track.volume = value

    const entry = trackNodes.get(id)
    if (entry) {
      entry.masterGain.gain.setTargetAtTime(value * 0.5, getContext().currentTime, 0.1)
    }
  }

  function togglePanel() {
    expanded.value = !expanded.value
    if (expanded.value) ensureContext()
  }

  return { tracks, expanded, activeCount, toggle, setVolume, togglePanel }
}
