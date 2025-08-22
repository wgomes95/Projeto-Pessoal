// Classe principal da biblioteca de músicas
class MusicLibrary {
    constructor() {
        this.songs = [];
        this.currentFilter = 'all';
        this.init();
    }

    // Inicialização da aplicação
    init() {
        this.loadSongsFromStorage();
        this.setupEventListeners();
        this.renderSongs();
        this.updateStats();
    }

    // Configuração dos event listeners
    setupEventListeners() {
        // Formulário de adição de música
        const addSongForm = document.getElementById('addSongForm');
        addSongForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addSong();
        });

        // Filtros
        const showAllBtn = document.getElementById('showAll');
        const showFavoritesBtn = document.getElementById('showFavorites');

        showAllBtn.addEventListener('click', () => {
            this.setFilter('all');
        });

        showFavoritesBtn.addEventListener('click', () => {
            this.setFilter('favorites');
        });
    }

    // Adicionar nova música (RF001)
    addSong() {
        const title = document.getElementById('songTitle').value.trim();
        const artist = document.getElementById('songArtist').value.trim();
        const album = document.getElementById('songAlbum').value.trim();
        const year = document.getElementById('songYear').value;

        if (!title || !artist) {
            alert('Título e artista são obrigatórios!');
            return;
        }

        const newSong = {
            id: Date.now(),
            title: title,
            artist: artist,
            album: album || 'Sem álbum',
            year: year || 'Ano desconhecido',
            isFavorite: false,
            quantity: 1, // Quantidade inicial igual a 1 (RF001)
            dateAdded: new Date().toLocaleDateString('pt-BR')
        };

        this.songs.push(newSong);
        this.saveSongsToStorage();
        this.renderSongs();
        this.updateStats();
        this.resetForm();

        // Feedback visual
        this.showNotification('Música adicionada com sucesso!', 'success');
    }

    // Remover música da biblioteca (RF002)
    removeSong(songId) {
        if (confirm('Tem certeza que deseja remover esta música?')) {
            this.songs = this.songs.filter(song => song.id !== songId);
            this.saveSongsToStorage();
            this.renderSongs();
            this.updateStats();
            this.showNotification('Música removida com sucesso!', 'info');
        }
    }

    // Favoritar/desfavoritar música (RF003)
    toggleFavorite(songId) {
        const song = this.songs.find(s => s.id === songId);
        if (song) {
            song.isFavorite = !song.isFavorite;
            this.saveSongsToStorage();
            this.renderSongs();
            this.updateStats();
            
            const message = song.isFavorite ? 'Música adicionada aos favoritos!' : 'Música removida dos favoritos!';
            this.showNotification(message, 'success');
        }
    }

    // Definir filtro atual
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Atualizar botões de filtro
        document.getElementById('showAll').classList.toggle('active', filter === 'all');
        document.getElementById('showFavorites').classList.toggle('active', filter === 'favorites');
        
        this.renderSongs();
    }

    // Renderizar lista de músicas (RF005)
    renderSongs() {
        const songsList = document.getElementById('songsList');
        let songsToShow = this.songs;

        // Aplicar filtro
        if (this.currentFilter === 'favorites') {
            songsToShow = this.songs.filter(song => song.isFavorite);
        }

        if (songsToShow.length === 0) {
            songsList.innerHTML = this.getEmptyStateHTML();
            return;
        }

        songsList.innerHTML = songsToShow.map(song => this.getSongCardHTML(song)).join('');
    }

    // Gerar HTML do card de música
    getSongCardHTML(song) {
        return `
            <div class="song-card ${song.isFavorite ? 'favorite' : ''}" data-id="${song.id}">
                <div class="song-header">
                    <div class="song-info">
                        <h3>${this.escapeHtml(song.title)}</h3>
                        <p><strong>Artista:</strong> ${this.escapeHtml(song.artist)}</p>
                        <p><strong>Álbum:</strong> ${this.escapeHtml(song.album)}</p>
                        <p><strong>Ano:</strong> ${song.year}</p>
                        <p><strong>Quantidade:</strong> ${song.quantity}</p>
                        <p><strong>Adicionada em:</strong> ${song.dateAdded}</p>
                    </div>
                    <div class="song-actions">
                        <button class="action-btn favorite-btn ${song.isFavorite ? 'favorited' : ''}" 
                                onclick="musicLibrary.toggleFavorite(${song.id})" 
                                title="${song.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn delete-btn" 
                                onclick="musicLibrary.removeSong(${song.id})" 
                                title="Remover música">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // HTML para estado vazio
    getEmptyStateHTML() {
        if (this.currentFilter === 'favorites') {
            return `
                <div class="empty-state">
                    <i class="fas fa-heart-broken"></i>
                    <h3>Nenhuma música favorita</h3>
                    <p>Adicione músicas aos favoritos para vê-las aqui!</p>
                </div>
            `;
        } else {
            return `
                <div class="empty-state">
                    <i class="fas fa-music"></i>
                    <h3>Sua biblioteca está vazia</h3>
                    <p>Adicione sua primeira música usando o formulário ao lado!</p>
                </div>
            `;
        }
    }

    // Atualizar estatísticas (RF004)
    updateStats() {
        const totalSongs = this.songs.length;
        const totalFavorites = this.songs.filter(song => song.isFavorite).length;

        document.getElementById('totalSongs').textContent = totalSongs;
        document.getElementById('totalFavorites').textContent = totalFavorites;
    }

    // Resetar formulário
    resetForm() {
        document.getElementById('addSongForm').reset();
    }

    // Salvar músicas no localStorage
    saveSongsToStorage() {
        localStorage.setItem('musicLibrary', JSON.stringify(this.songs));
    }

    // Carregar músicas do localStorage
    loadSongsFromStorage() {
        const stored = localStorage.getItem('musicLibrary');
        if (stored) {
            this.songs = JSON.parse(stored);
        }
    }

    // Mostrar notificação
    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : '#4299e1'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Escapar HTML para segurança
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar a biblioteca quando a página carregar
let musicLibrary;
document.addEventListener('DOMContentLoaded', () => {
    musicLibrary = new MusicLibrary();
});

// Adicionar algumas músicas de exemplo para demonstração
function addSampleSongs() {
    const sampleSongs = [
        {
            title: "Bohemian Rhapsody",
            artist: "Queen",
            album: "A Night at the Opera",
            year: "1975"
        },
        {
            title: "Imagine",
            artist: "John Lennon",
            album: "Imagine",
            year: "1971"
        },
        {
            title: "Hotel California",
            artist: "Eagles",
            album: "Hotel California",
            year: "1976"
        }
    ];

    sampleSongs.forEach(song => {
        const newSong = {
            id: Date.now() + Math.random(),
            title: song.title,
            artist: song.artist,
            album: song.album,
            year: song.year,
            isFavorite: Math.random() > 0.5, // Algumas favoritas aleatoriamente
            quantity: 1,
            dateAdded: new Date().toLocaleDateString('pt-BR')
        };
        musicLibrary.songs.push(newSong);
    });

    musicLibrary.saveSongsToStorage();
    musicLibrary.renderSongs();
    musicLibrary.updateStats();
}

// Função para limpar todas as músicas (útil para testes)
function clearAllSongs() {
    if (confirm('Tem certeza que deseja remover TODAS as músicas? Esta ação não pode ser desfeita!')) {
        musicLibrary.songs = [];
        musicLibrary.saveSongsToStorage();
        musicLibrary.renderSongs();
        musicLibrary.updateStats();
        musicLibrary.showNotification('Todas as músicas foram removidas!', 'info');
    }
}

// Adicionar botões de exemplo no console para facilitar testes
console.log(`
🎵 Biblioteca de Músicas - Comandos úteis:

Para adicionar músicas de exemplo:
addSampleSongs()

Para limpar todas as músicas:
clearAllSongs()

Para ver a biblioteca atual:
musicLibrary.songs
`); 