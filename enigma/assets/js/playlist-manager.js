// Gerencia a playlist de músicas do Enigma
class PlaylistManager {
    constructor() {
        // Arquivos de áudio na pasta raiz /assets/audio/
        this.playlist = [
            "/assets/audio/musica4.mp3",
            "/assets/audio/musica5.mp3",
            "/assets/audio/musica6.mp3",
            "/assets/audio/musica3.mp3",
            "/assets/audio/musica2.mp3",
            "/assets/audio/musica1.mp3"
        ];

        this.current = 0;
        this.audio = new Audio(this.playlist[this.current]);
        this.audio.volume = 0.7;
        this.audio.loop = true;
        this.isPlaying = false;
    }

    toggle() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(err => {
                console.error("Erro ao tentar tocar áudio:", err);
            });
        }
        this.isPlaying = !this.isPlaying;
    }
}
