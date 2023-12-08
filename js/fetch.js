'use strict'

const url_base = "https://hp-api.onrender.com/api/";
const characters_url = "characters";
const character_id_url = "character/";
const students_url = "characters/students";
const staff_url = "characters/staff";
const spells_url = "spells";


const getJson = (type = "character", id = null) => {
    let url = ""
    try {
        switch (type) {
            case "character":
                if (id != null) {
                    url = url_base + character_id_url + `${id}`;
                } else {
                    url = url_base + characters_url;
                }
                break;
            case "students":
                url = url_base + students_url;
                break;
            case "staff":
                url = url_base + staff_url;
                break;
            case "spells":
                url = url_base + spells_url;
                break;
            default:
                break;
        }

        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se ha obtenido resultado.');
                }
                return response.json();
            })
        // .then(response => {
        //     return response;
        // })
    } catch (error) {
        console.error('El error causado al obtener datos es:', error);
    }
}

const getJsonSearch = (value) => {
    let data = [];
    try {
        return fetch(url_base + characters_url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se ha obtenido resultado.');
                }
                return response.json();
            }).then(response => {
                response.forEach(element => {
                    if(element.name.toLowerCase().includes(value.toLowerCase())){
                        console.log(element);
                        data.push(element);
                    }
                });
                return fetch(url_base + spells_url)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('No se ha obtenido resultado.');
                        }
                        return response.json();
                    }).then(response => {
                        response.forEach(element => {
                            if(element.name.toLowerCase().includes(value.toLowerCase())){
                                data.push(element);
                            }
                        });
                        
                        return data
                    })
            })
    } catch (error) {
        console.error('El error causado al obtener datos es:', error);
    }
}