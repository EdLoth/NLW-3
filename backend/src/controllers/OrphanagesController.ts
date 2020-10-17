import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_views';
import * as Yup from 'yup';
import Orphanage from '../models/Orphanage';

export default {
    async index(reques: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.status(202).json(orphanageView.renderMany(orphanages));

    },
    async show(request: Request, response: Response){
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations : [ ]
        });

        return response.json(orphanageView.render(orphanage));

    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body
    
        const orphanagesRepository = getRepository(Orphanage);
    
        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome Obrigatorio'),
            latitude: Yup.number().required('Latitude Obrigatoria'),
            longitude: Yup.number().required('Longitude Obrigatoria'),
            about: Yup.string().required('Infome a descrição').max(300),
            instructions: Yup.string().required('Informe as Instruções'),
            opening_hours: Yup.string().required('Campo Obrigatorio'),
            open_on_weekends: Yup.boolean().required('Campo Obrigatorio'),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage)
    
        return response.status(201).json(orphanage);
    }
};