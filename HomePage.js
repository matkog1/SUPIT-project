window.addEventListener('DOMContentLoaded', async () => {
    const first = document.querySelector('#first');
    const second = document.querySelector('#second');
    const third = document.querySelector('#third');
    const fourth = document.querySelector('#fourth');

    await Typing('Budi izvrstan u onom što ', first);
    await Typing('vidiš!', second);
    await Typing('voliš.', second);
    await Typing('ZAISKRI', third);
    await Typing('.', fourth);
});

async function Typing(txt, element) {
    for (let i = 0; i <= txt.length; i++) {
        const newText = txt.substring(0, i) + '<span aria-hidden="true"></span>';
        element.innerHTML = newText;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (txt !== '.') {
        element.removeChild(element.querySelector('span'));
    }
}
