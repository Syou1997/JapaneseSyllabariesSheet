document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.kana-card');
    const synth = window.speechSynthesis;

    // 取得日文語音包
    let voices = [];
    const getVoices = () => {
        voices = synth.getVoices();
    };
    getVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = getVoices;
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const kana = card.getAttribute('data-kana');
            if (kana) {
                speak(kana);
            }
        });
    });

    function speak(text) {
        synth.cancel(); // 停止目前發音
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        
        // 尋找最佳日文語音
        const jpVoice = voices.find(v => v.lang === 'ja-JP' || v.lang.includes('ja'));
        if (jpVoice) utterance.voice = jpVoice;
        
        utterance.rate = 0.9; // 稍微放慢一點點聽得更清楚
        synth.speak(utterance);
    }
});