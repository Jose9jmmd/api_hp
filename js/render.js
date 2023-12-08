'use strict'

const container = document.querySelector("#container");
const pagination = document.querySelector(".pagination");
container.innerHTML = "";

const nCard_per_page = 20;
let total_pages = 0;
let currentPage = 1;

const render_pagination = (data, currentPage = 1) => {
    let render_html = "";
    let total_data_cards = data.length;
    total_pages = Math.ceil(total_data_cards / nCard_per_page);

    if (total_pages == 0) return false;

    render_html += `
        <li class="page-item"><a class="page-link" href="#" id="prev">Previous</a></li>
    `;

    for (let i = 1; i <= total_pages; i++) {
        render_html += `<li class="page-item"><a class="page-link pagination_btn" href="#" id="${i}">${i}</a></li>`
    }

    render_html += `
        <li class="page-item"><a class="page-link" href="#" id="next">Next</a></li>
    `;

    pagination.innerHTML = "";
    pagination.insertAdjacentHTML('afterbegin', render_html);


    // Evento Botones
    const pagination_btn = document.querySelectorAll('.pagination_btn');
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');

    render_data(data, currentPage);
    pagination_btn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = e.target.id;
            btn_prev_next_disbled(currentPage);
            render_data(data, currentPage);
        });
    })

    prev.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage--;
        btn_prev_next_disbled(currentPage);
        render_data(data, currentPage);
    });
    next.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage++;
        btn_prev_next_disbled(currentPage);
        render_data(data, currentPage);
    });

    const btn_prev_next_disbled = (currentPage) => {
        if (currentPage != 1 && currentPage != total_pages) {
            prev.classList.remove("disabled");
            next.classList.remove("disabled");
        }
        if (currentPage != 1 && currentPage == total_pages) {
            prev.classList.remove("disabled");
            next.classList.add("disabled");
        }
        if (currentPage == 1 && currentPage != total_pages) {
            prev.classList.add("disabled");
            next.classList.remove("disabled");
        }
        if (currentPage == 1 && currentPage == total_pages) {
            prev.classList.add("disabled");
            next.classList.add("disabled");
        }

    };
    btn_prev_next_disbled(currentPage);


}

const render_data = (data, currentPage) => {
    let i = 0;
    let min = (currentPage * 20) - 20;
    let max = (currentPage * 20);
    let data_arr = [];

    data.forEach(element => {
        i++;
        if (i > min && i <= max) {
            data_arr.push(element)
        }
    });
    render_all_card(data_arr)
}

const render_all_card = (data) => {
    let render_html = ""
    const image = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hogwarts-Crest.png/600px-Hogwarts-Crest.png?20210328175300"
    let i = 0;

    data.forEach(element => {
        i++;
        if (element.description) {
            render_html += `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>
                </div>
            </div>
        `
        } else {
            render_html += `
            <div class="card" style="width: 18rem;">
            <img src="${element.image ? element.image : image}" class="card-img-top" alt="Imagen de ${element.name}">
            <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <button data-id="${element.id}" class="btn btn-outline-light btn_more">View More</button>
            </div>
            </div>
            `
        }
    });

    container.innerHTML = "";
    container.insertAdjacentHTML('afterbegin', render_html);
    let btn_more = document.querySelectorAll('.btn_more');

    btn_more.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            getJson('character', e.target.dataset.id)
                .then(response => {
                    render_character_id(response)
                })
        })
    })


}

const render_character_id = (data) => {

    let render_html = ""
    const image = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hogwarts-Crest.png/600px-Hogwarts-Crest.png?20210328175300"
    data.forEach(element => {
        title_page.innerHTML = element.name;
        render_html += `
            <div class="d-flex flex-wrap gap-5">
                <div class="border-end pe-5">
                    <img src="${element.image ? element.image : image}" style="width:380px;" class="card-img-top rounded" alt="Imagen de ${element.name}">
                </div>
                
                <div class="">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item fs-5" title="Date Of Birth">
                            <div class="d-flex justify-content-between">
                                <span>Date Of Birth 
                                    <i class="bi bi-calendar"></i>: 
                                </span>
                                <span>${element.dateOfBirth ? element.dateOfBirth : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Gender">
                            <div class="d-flex justify-content-between">
                                <span>Gender: </span>
                                <span>${element.gender ? element.gender : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Eyes Colour">
                            <div class="d-flex justify-content-between">
                                <span>Eyes Colour 
                                    <i class="bi bi-eye"></i>: 
                                </span>
                                <span>${element.eyeColour ? element.eyeColour : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Hair Colour">
                            <div class="d-flex justify-content-between">
                                <span>Hair Colour: </span>
                                <span>${element.hairColour ? element.hairColour : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Species">
                            <div class="d-flex justify-content-between">
                                <span>Species:</span>
                                <span>${element.species ? element.species : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Wizard">
                            <div class="d-flex justify-content-between">
                                <span>Wizard</span>
                                <span>${element.wizard ? element.wizard : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Ancestry">
                            <div class="d-flex justify-content-between">
                                <span>Ancestry
                                    <i class="bi bi-person-up"></i>: 
                                </span>
                                <span>${element.ancestry ? element.ancestry : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="House">
                            <div class="d-flex justify-content-between">
                                <span>House 
                                    <i class="bi bi-house"></i>:
                                </span>
                                <span>${element.house ? element.house : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Patronus">
                            <div class="d-flex justify-content-between">
                                <span>Patronus: </span>
                                <span>${element.patronus ? element.patronus : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Wand">
                            <div class="text-center">
                                <span>Wand</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Wand - Wood">
                            <div class="d-flex justify-content-between">
                                <span>Wood:</span>
                                <span>${element.wand.wood ? element.wand.wood : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Wand - Core">
                            <div class="d-flex justify-content-between">
                                <span>Core: </span>
                                <span>${element.wand.core ? element.wand.core : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Wand - Length">
                            <div class="d-flex justify-content-between">
                                <span>Length:</span>
                                <span>${element.wand.length ? element.wand.length : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Other Names">
                            <div class="d-flex justify-content-between">
                                <span class="me-5">Other Names: </span>
                                <span>${element.alternate_names.length > 0 ? element.alternate_names : " - "}</span>
                                
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Actor">
                            <div class="d-flex justify-content-between">
                                <span>Actor
                                    <i class="bi bi-person"></i>: 
                                </span>
                                <span>${element.actor ? element.actor : " - "}</span>
                            </div>
                        </li>
                        <li class="list-group-item fs-5" title="Other Actors / Actresses">
                            <div class="d-flex justify-content-between">
                                <span>Other Actors / Actresses: </span>
                                <span>${element.alternate_actors.length > 0 ? element.alternate_actors : " - "}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        `
    });
    pagination.innerHTML = "";
    container.innerHTML = "";
    container.insertAdjacentHTML('afterbegin', render_html);
}
