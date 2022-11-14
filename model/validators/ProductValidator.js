import Joi from "joi";

class ProductValidator {
    
    static validate(product) {

        const productSchema = Joi.object({
            image: Joi.string(),
            name: Joi.string(),
            brand: Joi.string(),
            category: Joi.string(),
            shortdescription: Joi.string(),
            longdescription: Joi.string(),
            agetype: Joi.string(),
            freeshipping: Joi.string(),
            minage: Joi.number(),
            maxage: Joi.number(),
            price: Joi.number(),
            stock: Joi.number(),
            quantity: Joi.number(),
        });

        const { error } = productSchema.validate(product);

        return error;
    }
}

export default ProductValidator;
