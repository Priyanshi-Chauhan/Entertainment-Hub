// custom hook, for converting genre string to some code

const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
    const GenreIds = selectedGenres.map((g) => g.id);
    return GenreIds.reduce((acc, curr) => acc + ',' + curr);
}

export default useGenre;
// earlier
// 1 
// 2
// 3
// 4 
// after
// 1,2,3,4