import * as Joi from 'joi';



export const additionalInfo = Joi.array().items({
  fieldName: Joi.string().optional().allow(null, ''),
  value: Joi.string().optional().allow(null, ''),
  inputType: Joi.string().optional().allow(null, ''),
});


export const _validateFlatDetailsRequesthema = Joi.object().keys({
        property_id: Joi.number().optional().allow(null, ''),
        category_id: Joi.number().optional().allow(null, ''),
        flat_type: Joi.string().optional().allow(null, ''),
        dimension: Joi.string().optional().allow(null, ''),
        floor_number: Joi.number().optional().allow(null, ''),
        total_rooms: Joi.number().optional().allow(null, ''),
        flat_facilities: Joi.string().optional().allow(null, ''),
        images: Joi.array().optional().allow(null, ''),
        videos: Joi.array().optional().allow(null, ''),
        flat_number: Joi.string().optional().allow(null, ''),
        imoccupancy_typeages: Joi.string().optional().allow(null, ''),
    });

    


export const _validateBasicPropertyRequest = (input)=>{
    const schema = Joi.object().keys({
        property_id: Joi.number().optional().allow(null, ''),
        property_name: Joi.string().optional().allow(null, ''),
        area_id: Joi.number().optional().allow(null, ''),
        phone_number: Joi.string().optional().allow(null, ''),
        email: Joi.string().optional().allow(null, ''),
        address: Joi.string().optional().allow(null, ''),
        user_id: Joi.number().optional().allow(null, ''),

    });

    return schema.validate(input, {abortEarly: false});
}
export const _validateAdvancedPropertyRequest = (input)=>{
    const schema = Joi.object().keys({
        property_id: Joi.number().optional().allow(null, ''),
        property_Details: Joi.string().optional().allow(null, ''),
        Images: Joi.array().optional().allow(null, ''),
        videos: Joi.array().optional().allow(null, ''),
        facilities: Joi.string().optional().allow(null, ''),
        categories: Joi.string().optional().allow(null, ''),
        status: Joi.number().optional().allow(null, ''),
        user_id: Joi.number().optional().allow(null, ''),

    });

    return schema.validate(input, {abortEarly: false});
}