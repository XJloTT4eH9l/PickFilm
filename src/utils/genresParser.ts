export function genresParser(genresArray: number[]): string[] {
    const genresParsed = genresArray.map(genre => {
        switch(genre) {
            case 12: return 'Adventure';
            case 18: return 'Drama';
            case 16: return 'Animation';
            case 28: return 'Action';
            case 35: return 'Comedy';
            case 80: return 'Crime';
            case 99: return 'Documentary';
            case 10751: return 'Family';
            case 10759: return 'Action & Adventure';
            case 10762: return 'Kids';
            case 10763: return 'News';
            case 10764: return 'Reality';
            case 10765: return 'Sci-Fy & Fantasy';
            case 10766: return 'Soap';
            case 10767: return 'Talk';
            case 10768: return 'War & Politics';
            case 14: return 'Fantasy';
            case 36: return 'History';
            case 27: return 'Horror';
            case 10402: return 'Music';
            case 9648: return 'Mystery';
            case 10749: return 'Romance';
            case 878: return 'Science Fiction';
            case 53: return 'Thriller';
            case 10752: return 'War';
            case 37: return 'Western';
            case 10770: return 'TV Movie';
            default: return 'genre';
        }
    })

    return genresParsed
}