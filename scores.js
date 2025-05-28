class ScoreManager {
    constructor() {
        this.highscores = JSON.parse(localStorage.getItem('galagaHighscores')) || [];
        this.maxScores = 10;
        this.maxNameLength = 5;
    }

    addScore(name, score) {
        const validName = name.substring(0, this.maxNameLength).toUpperCase().replace(/[^A-Z]/g, '');
        
        if (!validName || score <= 0) return false;

        this.highscores.push({
            name: validName,
            score: score,
            date: new Date().toLocaleDateString()
        });

        this.highscores.sort((a, b) => b.score - a.score);
        this.highscores = this.highscores.slice(0, this.maxScores);

        localStorage.setItem('galagaHighscores', JSON.stringify(this.highscores));
        return true;
    }

    getHighscores() {
        return [...this.highscores];
    }

    // Método para verificar si una puntuación es un highscore
    isHighscore(newScore) {
        if (this.highscores.length < this.maxScores) {
            return true; // Si hay menos de 10 puntuaciones, cualquier puntuación es un highscore
        }
        // Comprueba si la nueva puntuación es mayor que la puntuación más baja en la lista
        return newScore > this.highscores[this.highscores.length - 1].score;
    }
}