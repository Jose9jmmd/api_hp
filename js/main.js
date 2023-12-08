'use strict'

const title_page = document.querySelector("#title_page");
const characters = document.querySelector('#characters');
const students = document.querySelector('#students');
const staff = document.querySelector('#staff');
const spells = document.querySelector('#spells');
const search_btn = document.querySelector('#search_btn');
const search_input = document.querySelector('#search_input');


window.addEventListener('load', () => {
    title_page.innerHTML = 'All the characters';
    const data = getJson()
        .then(response => {
            // console.log(response);
            // render_all_card(response);
            render_pagination(response);
        })
});

characters.addEventListener('click', (e) => {
    e.preventDefault();
    title_page.innerHTML = 'All the characters';
    const data = getJson()
        .then(response => {
            // console.log(response);
            // render_all_card(response)
            render_pagination(response);
        });
});


students.addEventListener('click', (e) => {
    e.preventDefault();
    title_page.innerHTML = 'All Students';
    const data = getJson('students')
    .then(response => {
        // console.log(response);
        // render_all_card(response)
        render_pagination(response);
    });
});

staff.addEventListener('click', (e) => {
    e.preventDefault();
    title_page.innerHTML = 'All Teachers and Staff';
    const data = getJson('staff')
    .then(response => {
        // console.log(response);
        // render_all_card(response)
        render_pagination(response);
    });
});

spells.addEventListener('click', (e) => {
    e.preventDefault();
    title_page.innerHTML = 'All Spells';
    const data = getJson('spells')
    .then(response => {
        // console.log(response);
        // render_all_spells_card(response)
        render_pagination(response);
    });
});


search_btn.addEventListener('click', (e) => {
    e.preventDefault();
    title_page.innerHTML =`All Results of: ${search_input.value} `;
    const data = getJsonSearch(search_input.value)
    .then(response => {
        console.log(response);
        // render_all_spells_card(response)
        render_pagination(response);
    });
});