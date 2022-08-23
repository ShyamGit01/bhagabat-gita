
export const allChapter = () => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8bd9e0f421msh9b8b97b66244dc3p194ee6jsn87a53b80087f',
                'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
            }
        };

        fetch('https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?limit=18', options)
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(err => console.error(err));
    })
}

export const chapterWiseVerces = (chapterId) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8bd9e0f421msh9b8b97b66244dc3p194ee6jsn87a53b80087f',
                'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
            }
        };

        fetch(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterId}/verses/`, options)
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(err => console.error(err));
    })
}


export const perticulalVerces = (chapterId, verseId) => {
    return new Promise((resolve, reject) => {


        const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterId}/verses/${verseId}/`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8bd9e0f421msh9b8b97b66244dc3p194ee6jsn87a53b80087f',
                'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(response => {console.log("response=>", response);resolve(response)})
            .catch(err => console.error('error:' + err));

    })
}