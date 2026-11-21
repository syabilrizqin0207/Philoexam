"""Record the natural-voice narration track for the Land Lah! video lessons.

Renders every narrated line (and every quick-check feedback line) with the open Kokoro-82M neural voice,
joins them into one MP3 per lot and writes landlah/js/content/voice.js with the start/end of each line,
so the player can sync the animation to the audio.

  node scripts/export-narration.mjs > narration.json
  python3 scripts/record-voice.py narration.json MODEL_DIR [--voice am_fenrir] [--speed 0.92] [--lots 1,2]

MODEL_DIR holds kokoro-v1.0.onnx and voices-v1.0.bin (github.com/thewh1teagle/kokoro-onnx releases,
model-files-v1.0). Needs: pip install kokoro-onnx soundfile; ffmpeg on PATH.
"""
import argparse, json, os, re, subprocess, sys, tempfile
import numpy as np, soundfile as sf

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
AUDIO = os.path.join(ROOT, 'landlah', 'audio')
TIMING = os.path.join(ROOT, 'landlah', 'js', 'content', 'voice.js')

# Said as letters. Anything else in capitals is read as a word.
KEEP_WORDS = {'TRUE', 'FALSE', 'HELD', 'NOT', 'TRAP', 'OK', 'NUS', 'IRAS'}
SAY = {  # spellings that help the voice with names and terms (checked by transcribing the recording back)
    'Punggol': 'Pung-gol',
    'Selamat datang': 'Selamat dahtahng',
    'mortgagor': 'mortgager',  # otherwise read with a hard g
    'Mortgagor': 'Mortgager',
    'mortgagee': 'mortgage-ee',  # stress on the last syllable
    'Mortgagee': 'Mortgage-ee',
}


def fnv(s):
    """Same 32-bit FNV-1a as LL.voiceHash in video.js, in base 36."""
    x = 0x811c9dc5
    for c in s:
        x ^= ord(c)
        x = (x * 0x01000193) & 0xffffffff
    digits = '0123456789abcdefghijklmnopqrstuvwxyz'
    out = ''
    while True:
        x, r = divmod(x, 36)
        out = digits[r] + out
        if not x:
            return out


def speechify(t):
    t = t.replace('“', '').replace('”', '').replace('"', '')
    t = re.sub(r'\bss (\d)', r'sections \1', t)
    t = re.sub(r'\bs (\d)', r'section \1', t)
    t = re.sub(r'\s+v\s+', ' versus ', t)
    # 46(2)(a) -> 46 2 a
    t = re.sub(r'(\d+)((?:\([0-9a-z]+\))+)', lambda m: m.group(1) + ' ' + ' '.join(re.findall(r'\(([0-9a-z]+)\)', m.group(2))), t)
    t = re.sub(r'\s*\(([^)]*)\)', r', \1,', t)
    t = re.sub(r',\s*([.,;:?!])', r'\1', t)
    for k, v in SAY.items():
        t = t.replace(k, v)
    t = re.sub(r'\b([A-Z]{2,5})\b', lambda m: m.group(1) if m.group(1) in KEEP_WORDS else ' '.join(m.group(1)), t)
    return re.sub(r'\s+', ' ', t).strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('narration')
    ap.add_argument('models')
    ap.add_argument('--voice', default='am_fenrir')
    ap.add_argument('--speed', type=float, default=0.92)
    ap.add_argument('--lots', default='')
    ap.add_argument('--kbps', default='48k')
    a = ap.parse_args()
    from kokoro_onnx import Kokoro
    k = Kokoro(os.path.join(a.models, 'kokoro-v1.0.onnx'), os.path.join(a.models, 'voices-v1.0.bin'))
    data = json.load(open(a.narration))
    want = set(a.lots.split(',')) if a.lots else set(data)
    os.makedirs(AUDIO, exist_ok=True)
    track = {}
    if os.path.exists(TIMING):
        m = re.search(r'LL\.voiceTrack = (\{.*\});', open(TIMING).read(), re.S)
        if m:
            track = json.loads(m.group(1)).get('lots', {})
    for n in sorted(data, key=int):
        if n not in want:
            continue
        lot = data[n]
        sr = 24000
        gap_line, gap_scene, lead = int(0.28 * sr), int(0.65 * sr), int(0.15 * sr)
        chunks, pos, lines, fb = [np.zeros(lead, 'float32')], lead, [], {}
        prev_si = None

        def say(text):
            audio, rate = k.create(speechify(text), voice=a.voice, speed=a.speed, lang='en-us')
            assert rate == sr
            audio = audio.astype('float32')
            nz = np.nonzero(np.abs(audio) > 0.004)[0]  # trim the model's own leading/trailing silence
            return audio[max(0, nz[0] - 240):nz[-1] + 480] if len(nz) else audio

        for l in lot['lines']:
            if prev_si is not None:
                g = gap_scene if l['si'] != prev_si else gap_line
                chunks.append(np.zeros(g, 'float32')); pos += g
            prev_si = l['si']
            w = say(l['text'])
            lines.append([round(pos / sr * 1000), round((pos + len(w)) / sr * 1000), fnv(l['text'])])
            chunks.append(w); pos += len(w)
            print(f'lot {n} line {l["g"]:3d} {len(w) / sr:5.1f}s  {l["text"][:60]}', flush=True)
        for text in lot['fb']:
            chunks.append(np.zeros(gap_scene, 'float32')); pos += gap_scene
            w = say(text)
            fb[fnv(text)] = [round(pos / sr * 1000), round((pos + len(w)) / sr * 1000)]
            chunks.append(w); pos += len(w)
        chunks.append(np.zeros(int(0.5 * sr), 'float32'))
        wav = np.concatenate(chunks)
        name = f'lot{int(n):02d}.mp3'
        with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
            sf.write(tmp.name, wav, sr)
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp.name, '-ac', '1', '-ar', str(sr), '-codec:a', 'libmp3lame', '-b:a', a.kbps,
                            '-metadata', f'title=Land Lah! Lot {n} lesson', os.path.join(AUDIO, name)], check=True)
        track[n] = {'src': 'audio/' + name, 'ms': round(len(wav) / sr * 1000), 'lines': lines, 'fb': fb}
        print(f'lot {n}: {len(wav) / sr / 60:.1f} min -> {name}', flush=True)
    body = json.dumps({'voice': a.voice, 'speed': a.speed, 'lots': {n: track[n] for n in sorted(track, key=int)}}, separators=(',', ':'))
    with open(TIMING, 'w') as f:
        f.write('/* Generated by scripts/record-voice.py: where each narrated line sits in landlah/audio/lotNN.mp3 (ms). */\n')
        f.write('(function (LL) { LL.voiceTrack = ' + body + '; })(window.LL);\n')
    print('wrote', TIMING)


if __name__ == '__main__':
    sys.exit(main())
