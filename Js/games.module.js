const body = document.querySelector('body')
const loading = document.querySelector('.loading')
const row = document.querySelector('.row');
//close details
const detailsSection = document.querySelector('.details')
const detailsData = document.querySelector('.details-data')


export class DisplayGames {
    constructor(categoury){
        this.cate = categoury
    }
    async function () {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '07503fcbfamsh37a35ddc4c8756ep150287jsn12da846ae4f1',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        loading.classList.remove('d-none');
        const getGames = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.cate}`, options)
        const result = await getGames.json()
        
        let cartoona = ''
        for (let i = 0; i < result.length; i++) {
            cartoona += `<div class="col-md-6 col-lg-4 col-xl-3 cards">
            <div>
                <div class="card bg-transparent">
                    <div class="card-body mb-2">
                        <img src=${result[i].thumbnail} alt="" class="w-100">
                        <div class="card-content d-flex justify-content-between align-items-center my-2">
                            <p class="card-content-p mb-0">${result[i].title}</p>
                            <button type="button" class="btn btn-primary btn-sm">Free</button>
                        </div>
                        <p class="card-body-p text-center mb-4">${result[i].short_description.split(' ').splice(0,8)}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <p class="footer-p px-2 py-1 me-1 mb-0 rounded-2 text-center">${result[i].genre}</p>
                        <p class="footer-p px-2 py-1 mb-0 rounded-2 text-center">${result[i].platform}</p>
                    </div>
                </div>
            </div>
        </div>`
        }
        row.innerHTML = cartoona;
        loading.classList.add('d-none')
        //
        let cards = document.querySelectorAll('.cards')
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', function () {
                let id = result[i].id;
                (async function () {
                    const options = {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': '07503fcbfamsh37a35ddc4c8756ep150287jsn12da846ae4f1',
                            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                        }
                    };

                    loading.classList.remove('d-none');
                    const getDetails = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
                    const detResult = await getDetails.json()
                    detailsData.innerHTML = `
                    <div class="container">
                        <div class="details_header d-flex justify-content-between align-items-center my-3">
                            <h2 class="text-white">Details Game</h2>
                            <div class="closeButton align-middle"><i class="fa-solid fa-xmark fa-2x p-1"></i></div>
                        </div>
                        <div class="details-body row g-4">
                            <div class="col-md-4">
                                <div>
                                    <img src=${detResult.thumbnail} alt="" class="w-100">
                                </div>
                            </div>
                            <div class="col-md-8 text-white text-start">
                                <h4>Title : ${detResult.title}</h4>
                                <p>Category : <span class="d-category bg-info text-black p-1 rounded-3">${detResult.genre}</span></p>
                                <p>Platform : <span class="d-category bg-info text-black p-1 rounded-3">${detResult.platform}</span></p>
                                <p>Status : <span class="d-category bg-info text-black p-1 rounded-3">${detResult.status}</span></p>
                                <p class="gameDescription">${detResult.description}</p>
                                <a href=${detResult.game_url} target="_blank" class="btn btn-outline-warning rounded-3 text-white">show Game</a>    
                            </div>
                        </div>
                    </div>`
                    loading.classList.add('d-none');

                    detailsSection.classList.remove('d-none')
                    body.classList.add('overflow-hidden')

                    // close Button
                    const closeDetails = document.querySelector('.fa-xmark')
                    closeDetails.addEventListener('click', function () {
                        detailsSection.classList.add('d-none')
                        body.classList.remove('overflow-hidden')
                    });
                    
                })()
            })
    
    
        }
    }
}