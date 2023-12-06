import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

export const infoSeeds = [
    {
        name: "Valentina Natalia",
        lastname: "Hormazabal Bahamondes",
        email: "valentina.hormazabal@alumnos.ucn.cl",
        city: "Antofagasta",
        country: "Chile",
        summary: "Tengo 22 años y soy estudiante de Ingeniería Civil en Computación e Informática",
        frameworks: [
            {
                name: "Svelte",
                level: "Medio",
                year: 2023
            },
            {
                name: "React",
                level: "Bajo",
                year: 2023
            },
            {
                name: "React Native",
                level: "Medio",
                year: 2023
            },
            {
                name: "Express",
                level: "Bajo",
                year: 2023
            }
        ],
        hobbies: [
            {
                name: "Crochet",
                description: "Tejer a crochet"
            },
            {
                name: "Manicure",
                description: "Pintar las uñas"
            },
            {
                name: "Ver peliculas",
                description: "Ver películas en el cine o en casa"
            }
        ]
    }
];